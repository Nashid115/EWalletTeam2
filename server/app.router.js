import express from 'express';

import employeeRouter from './api/employee/employee.router.js';
import Customer from './models/customer.js';
import Wallet from './models/wallet.js';
import customerRouter from './api/customers/customer.router.js';
import transactionRouter from './api/transaction/transaction.router.js';
import walletRouter from './api/wallet/wallet.router.js';

// const Customer =require('../models/customer.js');
let router = new express.Router();

router.use('/transactions', transactionRouter);
router.use('/wallet',walletRouter);
router.use('/customer',customerRouter);


//retrieving customers
// router.get('/customers', (req, res, next) => {
//     // res.send('retriveing customers....');
//     Customer.find(function (err, customers) {
//         res.json(customers);
//     })
// });

// //add customer
// router.post('/customer', (req, res, next) => {
//     let newCustomer = new Customer({
//         name: req.body.name,
//         email_id: req.body.email_id,
//         password: req.body.password,
//         phone_no: req.body.phone_no
//     });

//     newCustomer.save((err, customer) => {
//         if (err) {
//             res.json({ msg: 'failed to add customer' });
//         }
//         else {
//             res.json({ msg: 'successfully added' });
//             //automatically add to the wallet table
//         }
//     });
// });


//delete customer if needed
// router.delete('/customers/:id',(req,res,next)=>{
//     Customer.remove({_id:req.params.id},function(err,result){
//         if(err){
//             res.json(err);
//         }else{
//             res.json(result);
//         }
//     });
// });

//adding money to wallet
// router.p('/wallet',(req,res,next)=>{

// })
export default router;