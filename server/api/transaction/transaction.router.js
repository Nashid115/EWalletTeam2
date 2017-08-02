import express from 'express';
import TransactionController from './transaction.controller.js';

let router = express.Router();

router.get('/', TransactionController.TransactionData);


export default router;