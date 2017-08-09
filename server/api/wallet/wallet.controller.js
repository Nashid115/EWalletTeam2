import WalletService from './wallet.service.js';

let WalletController = {
    WalletData(req, res, next) {
        WalletService.getWalletr()
            .then( wallet => res.send({wallet}))
            .catch(next);
    }
};


export default WalletController;