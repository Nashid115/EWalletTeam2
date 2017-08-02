import express from 'express';
import CustomerController from './customer.controller.js';

let router = express.Router();

router.get('/', CustomerController.getCustomerData);
// router.get('/:id', CustomerController.getCustomerData(id)); //get data based on id

router.post('/add',CustomerController.postCustomerData); //post customer object 
router.post('/checkuser',CustomerController.checkCustomerData); //for login verification

export default router;