import TransactionService from './transaction.service.js';

let TransactionController = {
    TransactionData(req, res, next) {
        TransactionService.getTransaction()
            .then( transaction => res.send({transaction}))
            .catch(next);
    },
        customerTransactions(req,res,next){
            // console.log("rewwqe",req.params.id)
            TransactionService.customerTransData(req.params.id)
            .then(senderTrans=>res.send({senderTrans}));
        },
        RequestTransaction(req,res,next){
            // console.log("rewwqe",req.body,req.params.id)
            TransactionService.updateTransaction(req.params.id,req.body)
            .then(data=>{
                let updateSender=TransactionService.updateWalletSender(req.body.sender_id,data);
             let updateReciever=TransactionService.updateWalletReciever(req.body.reciever_id,data);
               Promise.all([updateSender,updateReciever])
               .then(values=>{
                   res.status(200);
                   res.send(values[0]);
               })
            }).catch(next);
                
        },
};


export default TransactionController;