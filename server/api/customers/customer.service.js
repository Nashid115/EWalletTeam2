import connection from '../../db/db-pg-connection.js';

let CustomerService = {

    getCustomer() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM public.customer', (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows);

            });
        });
    },

    postCustomer(obj) {
        return new Promise((resolve, reject) => {
            const text = 'INSERT INTO customer(customer_name, customer_email, customer_phone_no, customer_password) VALUES($1, $2,$3,$4) RETURNING *'
            const values = [obj.customer_name, obj.customer_email, obj.customer_phone_no, obj.customer_password]
            connection.query(text, values, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);



            });
        });
    },
    postWallet(obj) {
        return new Promise((resolve, reject) => {
            const text = 'INSERT INTO wallet(customer_id, wallet_amount) VALUES($1, $2) RETURNING *'
            const values = [obj.customer_id, 0]
            connection.query(text, values, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);



            });
        });
    },
    checkCustomer(obj) {
        return new Promise((resolve, reject) => {
            const tableQuery = {
                // give the query a unique name
                text: 'SELECT customer_id,customer_name,customer_email,customer_phone_no FROM customer WHERE (customer_email = $1 OR customer_phone_no = $1)  AND customer_password=$2 ',
                // text: '',
                values: [obj.customer_detail, obj.customer_password]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows);
            });

        });
    },
    sendUserData(data) {
        return new Promise((resolve, reject) => {
            const tableQuery = {
                // give the query a unique name
                text: 'SELECT wallet_amount,todays_wallet_limit,send_limit FROM wallet WHERE customer_id=$1',
                // text: '',
                values: [data]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
            });

        });
    },
    transaction(obj) {
        return new Promise((resolve, reject) => {
            let timeData = new Date();
            const tableQuery = {
                // give the query a unique name
                name: 'fetch-user',
                text: 'INSERT INTO transaction(transaction_type,sender_id,reciever_id,amount,transacted_at,status,reciever_name)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING sender_id,reciever_id,amount',
                values: [1, obj.customer_id, obj.customer_id, obj.wallet_amount, timeData, 1, obj.reciever_name]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows);
            });

        });
    },
    addMoney(sender_id, amount, limit) {
        console.log("yotaaa", sender_id, typeof (amount), limit)
        return new Promise((resolve, reject) => {

            const tableQuery = {
                // give the query a unique name

                text: 'UPDATE wallet SET wallet_amount =wallet_amount+ $1, todays_wallet_limit=$3 +todays_wallet_limit WHERE customer_id = $2 RETURNING wallet_amount,send_limit,todays_wallet_limit',
                values: [amount, sender_id, limit]
            }
            connection.query(tableQuery, (err, res) => {
                console.log("wakllet", res)
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
            });

        });
    },
    getRecieverId(obj) {
        return new Promise((resolve, reject) => {
            const tableQuery = {
                // give the query a unique name
                name: 'fetch-user',
                text: 'SELECT customer_id,customer_name FROM customer WHERE customer_phone_no=$1 OR customer_email= $1',
                values: [obj.reciever]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else {
                    resolve(res.rows[0]);
                }


            });

        });
    },
    sendMoney(reciever_id, sender_name, amount, sender_id, name) {
        // console.log("asassa",reciever_id,sender_name,amount,sender_id,name)
        return new Promise((resolve, reject) => {
            let timeData = new Date();
            const tableQuery = {
                // give the query a unique name
                name: 'insert-into-transaction',
                text: 'INSERT INTO public.transaction(transaction_type,sender_id,sender_name,reciever_id,amount,transacted_at,status,reciever_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
                values: [2, sender_id, sender_name, reciever_id, amount, timeData, 1, name]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else {
                    resolve(res.rows[0]);
                }

            });

        });
    },
    updateWallet(sender_id, amount) {
        return new Promise((resolve, reject) => {
            // console.log("sasas",sender_id,amount)
            const tableQuery = {
                // give the query a unique name
                name: 'wallet update for sender',
                text: 'UPDATE wallet SET wallet_amount = wallet_amount - $1,send_limit=$1 + send_limit   WHERE customer_id = $2 RETURNING *',
                values: [amount, sender_id]
            }
            connection.query(tableQuery, (err, res) => {
                // console.log("update",err,res)
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
            });

        });

    },
    updateReciverWallet(reciever_id, amount) {
        return new Promise((resolve, reject) => {
            const tableQuery = {
                // give the query a unique name
                name: 'wallet update for sender',
                text: 'UPDATE wallet SET wallet_amount = wallet_amount + $1 WHERE customer_id = $2 RETURNING *',
                values: [amount, reciever_id]
            }
            connection.query(tableQuery, (err, res) => {
                console.log("update", err, res)

                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
            });

        });
    },

    requestTrans(user) {
        return new Promise((resolve, reject) => {
            let timeData = new Date();

            const tableQuery = {
                // give the query a unique name
                name: 'fetch-user-id',
                text: 'SELECT customer_id,customer_name from customer WHERE customer_email=$1 OR customer_phone_no=$1',
                values: [user.requested_from]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
            });

        });
    },
    saveTransRequest(data, sender_id, reciever_name, amount, name) {
        console.log("dataaaaa", data, sender_id, amount, name, reciever_name);
        return new Promise((resolve, reject) => {
            let timeData = new Date();

            const tableQuery = {
                // give the query a unique name
                //  text:"SELECT * FROM transaction",
                name: 'request-save',
                text: 'INSERT INTO public.transaction(transaction_type,sender_id,reciever_id,amount,transacted_at,status,reciever_name,sender_name)VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
                values: [2, sender_id, data.customer_id, amount, timeData, 3, reciever_name, name]
            }
            connection.query(tableQuery, (err, res) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(res.rows[0]);

            });
        });
    },
    getNotification(data) {
        return new Promise((resolve, reject) => {
            let timeData = new Date();

            const tableQuery = {
                // give the query a unique name
                //  text:"SELECT * FROM transaction",
                name: 'request-save',
                text: 'SELECT transaction_id,transaction_type,sender_id,reciever_id,amount,transacted_at,status,reciever_name FROM transaction WHERE status=$1 AND reciever_id=$2',
                values: [3, data]
            }
            connection.query(tableQuery, (err, res) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(res.rows);

            });
        });
    },
    getUserDetails(data) {
        return new Promise((resolve, reject) => {
            let timeData = new Date();

            const tableQuery = {
                // give the query a unique name
                //  text:"SELECT * FROM transaction",
                name: 'request-customer-details-for-request',
                text: 'SELECT customer_name,customer_phone_no,customer_email FROM customer WHERE customer_id=$1',
                values: [data]
            }
            connection.query(tableQuery, (err, res) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(res.rows[0]);

            });
        });
    },
    getBalance(data) { //get customer balance also used for checking while sending data of the reciever
        return new Promise((resolve, reject) => {

            const tableQuery = {
                name: 'request-balance',
                text: 'SELECT wallet_amount,send_limit,todays_wallet_limit,customer_id FROM wallet WHERE customer_id=$1',
                values: [data]
            }
            connection.query(tableQuery, (err, res) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(res.rows[0]);

            });
        });
    },
    checkTransactionLimit(data, check) {
        if (check) {
            return new Promise((resolve, reject) => {
                const tableQuery = {
                    name: 'check-add-limit',
                    text: 'SELECT todays_wallet_limit FROM wallet WHERE customer_id=$1 ',
                    values: [data.customer_id]
                }
                connection.query(tableQuery, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else
                        resolve(res.rows[0]);

                });
            });
        } else {
            return new Promise((resolve, reject) => {
                console.log("dataaaa", data, check)
                const tableQuery = {
                    name: 'check-send-limit',
                    text: 'SELECT send_limit FROM wallet WHERE customer_id=$1 ',
                    values: [data.customer_id]
                }
                connection.query(tableQuery, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else
                        resolve(res.rows[0]);

                });
            });
        }

    },
    AddTransactionLimit(data) {
        return new Promise((resolve, reject) => {
            const tableQuery = {
                name: 'check-daily-limit',
                text: 'SELECT todays_wallet_limit FROM wallet WHERE customer_id=$1 ',
                values: [data]
            }
            connection.query(tableQuery, (err, res) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(res.rows[0]);

            });
        });
    },
    sendTransactionLimit(data) {
        return new Promise((resolve, reject) => {
            const tableQuery = {
                name: 'check-send-limit',
                text: 'SELECT send_limit FROM wallet WHERE customer_id=$1 ',
                values: [data]
            }
            connection.query(tableQuery, (err, res) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(res.rows[0]);

            });
        });
    }
};

export default CustomerService;