import express from 'express';
import TransactionController from './transaction.controller.js';

let router = express.Router();

router.get('/', TransactionController.TransactionData);
router.get('/user/:id', TransactionController.customerTransactions);//get transaction based on id
router.put('/request/:id', TransactionController.RequestTransaction);//transaction on request with transaction id


export default router;