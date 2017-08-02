import CustomerService from './customer.service.js';

let CustomerController = {
    getCustomerData(req, res, next) {
        CustomerService.getCustomer()
            .then(customers => { res.send({ customers }) })
            .catch(next);
    },

    postCustomerData(req,res,next){ //post data for sign up
        let customer_data;
        CustomerService.postCustomer(req.body)
        .then(customer=>{
            customer_data = customer;
            return CustomerService.postWallet(customer);
        })
        .then(wallet=>{
            res.send(customer_data);
        })
        .catch(next);
    },
     checkCustomerData(req,res,next){ //check data for login
      CustomerService.checkCustomer(req.body).then(resp=>{res.send({resp})})
      .catch(next);
    }

};

export default CustomerController;