import express from 'express';
import WalletController from './wallet.controller.js';

let router = express.Router();

router.get('/', WalletController.WalletData);


export default router;