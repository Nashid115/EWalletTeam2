import express from 'express';
import CustomerController from './customer.controller.js';

let router = express.Router();

router.get('/', CustomerController.getCustomerData);
router.post('/add',CustomerController.postCustomerData); //post customer object 
router.post('/login',CustomerController.checkCustomerData); //for login verification
router.post('/wallet',CustomerController.addMoneyData); // adding money to wallet
router.post('/send',CustomerController.sendMoneyData); //send money
router.post('/request',CustomerController.requestMoneyData); //request money
router.get('/notification/:id',CustomerController.notification);//get notification
router.get('/balance/:id',CustomerController.balance);//get balance


export default router;