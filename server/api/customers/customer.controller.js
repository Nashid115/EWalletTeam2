import CustomerService from './customer.service.js';
let CustomerController = {
    getCustomerData(req, res, next) {
        CustomerService.getCustomer()
            .then(customers => { res.send({ customers }) })
            .catch(next);
    },

    postCustomerData(req, res, next) { //post data for sign up
        let customer_data;
        CustomerService.postCustomer(req.body)
            .then(customer => {
                return CustomerService.postWallet(customer);
            })
            .then(wallet => {
                res.status(200);
                res.json("user added successfully");
            })
            .catch((err) => {
                if (err) {
                    res.status(400);
                    res.send(err, res.json("user already exists!!"));
                }
            });
    },
    checkCustomerData(req, res, next) { //check data for login
        let userData;
        CustomerService.checkCustomer(req.body).then(resp => {

            userData = resp[0];
            return CustomerService.sendUserData(userData.customer_id);

        }).then(walletData => {
            userData.wallet_amount = walletData;
            res.status(200);
            res.send(userData);
        })
            .catch((err) => {
                if (err) {
                    res.status(404);
                    res.send(err);
                }

            });
    },
    addMoneyData(req, res, next) {//add money
        let flag = 10000;
        let wallet_data;
        CustomerService.checkTransactionLimit(req.body, 1).then(response => {
            let limit = response.todays_wallet_limit;
            let sum = req.body.wallet_amount + limit;
            if (sum > flag) {
                res.status(400)
                res.send({ "limit": 10000 });
            } else {

                CustomerService.transaction(req.body)
                    .then(resp => {
                        wallet_data = resp;
                        return CustomerService.addMoney(resp[0].sender_id, resp[0].amount, resp[0].amount)

                    }).then(wallet => {
                        res.status(200);
                        res.send(wallet)
                    })
                    .catch(err => {
                        if (err) {
                            res.status(400)
                            res.send(err);
                        }
                    });
            }
        })

    },
    sendMoneyData(req, res, next) {//send money
        const max = 25000;
        let checkBalance;
        let walletAmount;
        let checkWallet;//checking
        let reciever_name;
        let sender_name;
        let flag = 10000;
        CustomerService.checkTransactionLimit(req.body, 0).then(response => {
            let limit = response.send_limit;
            let sum = req.body.amount + limit;
            if (sum > flag) {
                res.status(400)
                res.send({ "send_limit": 10000 });
            } else {
                CustomerService.getRecieverId(req.body)
                    .then(recieverDetail => {
                        reciever_name = recieverDetail.customer_name;
                        return CustomerService.getBalance(recieverDetail.customer_id)
                    })
                    .then(walletCheck => {
                        walletAmount = walletCheck.wallet_amount;
                        checkBalance = walletAmount + req.body.amount;
                        if (checkBalance > max) {
                            res.status(400);
                            let response = {};
                            response.error = "amount cannot be sent as the reciever has exceeded his wallet amount";
                            res.send(response);

                        }
                        else {
                            let data = walletCheck;
                            return CustomerService.sendMoney(data.customer_id, req.body.customer_name, req.body.amount, req.body.customer_id, reciever_name)
                                .then(transactionData => {
                                    var updateSender = CustomerService.updateWallet(transactionData.sender_id, transactionData.amount)
                                    var updateReciever = CustomerService.updateReciverWallet(transactionData.reciever_id, transactionData.amount);
                                    Promise.all([updateSender, updateReciever])
                                        .then(values => {
                                            res.status(201);
                                            res.send(values[0]);
                                        })
                                        .catch((err) => {
                                            if (err) {
                                                res.status(400);
                                                res.send("amount cannot be sent as the reciever has exceeded his wallet amount ");
                                            }
                                        });
                                })

                        }
                    })

            }
        })

    },
    requestMoneyData(req, res, next) {//request money
        CustomerService.requestTrans(req.body)
            .then(resp => {
                return CustomerService.saveTransRequest(resp, req.body.customer_id, req.body.customer_name, req.body.amount, resp.customer_name, );
            }).then(transData => {
                res.send(transData)
            })
            .catch((err) => {
                if (err) {
                    res.send(err);
                }
            });
    },
    notification(req, res, next) {
        let notification;
        CustomerService.getNotification(req.params.id)

            .then(resp => {
                notification = resp;
                CustomerService.getUserDetails(resp.reciever_id)
                    .then(data => {
                        notification.userData = data;
                        res.send({ notification });
                    })
            })

            .catch(next);
    },
    balance(req, res, next) {
        CustomerService.getBalance(req.params.id)
            .then(resp => {
                res.status(200);
                res.send(resp);
            }).catch(err => {
                if (err) {
                    res.status(404);
                    res.send(err);
                }
            });
    },
    addLimit(req, res, next) {
        CustomerService.AddTransactionLimit(req.params.id, ).then(resp => {
            res.status(200);
            res.send(resp);
        }).catch(err => {
            if (err) {
                res.status(400);
                res.send(err);
            }
        })
    },
    sendLimit(req, res, next) {
        CustomerService.sendTransactionLimit(req.params.id, ).then(resp => {
            res.status(200);
            res.send(resp);
        }).catch(err => {
            if (err) {
                res.status(400);
                res.send(err);
            }
        })
    }

};

export default CustomerController;