import express from 'express';

import employeeRouter from './api/employee/employee.router.js';
import Customer from './models/customer.js';
import Wallet from './models/wallet.js';
import customerRouter from './api/customers/customer.router.js';
import transactionRouter from './api/transaction/transaction.router.js';
import walletRouter from './api/wallet/wallet.router.js';

let router = new express.Router();

router.use('/transactions', transactionRouter);
router.use('/wallet',walletRouter);
router.use('/customer',customerRouter);
export default router;