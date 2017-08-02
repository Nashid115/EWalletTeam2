import TransactionService from './transaction.service.js';

let TransactionController = {
    TransactionData(req, res, next) {
        TransactionService.getTransaction()
            .then( transaction => res.send({transaction}))
            .catch(next);
    }
};


export default TransactionController;