import connection from '../../db/db-pg-connection.js';

let TransactionService = {
    getTransaction() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM public.transaction', (err, res) => {
                console.log("response",res);
                if (err)
                    reject(err);
                else
                    resolve(res.rows);
                
            });
        });
    },
    customerTransData(userId){
        return new Promise((resolve, reject) => {
             const tableQuery = {
                // give the query a unique name
                name:'sender transaction',
                 text: 'SELECT * FROM public.transaction WHERE sender_id=$1 OR reciever_id=$1',
                values: [userId]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows);
                
            });
        });
    },
  updateTransaction(userId,data){//UPDATE THE TRANSACTION TABLE
      return new Promise((resolve, reject) => {
             const tableQuery = {
                // give the query a unique name
                name:'Update transaction',
                 text: 'UPDATE transaction SET sender_id=$2, reciever_id=$3,transaction_type=$4,status=$5,reciever_name=$6 WHERE transaction_id=$1 RETURNING amount',
                values: [userId,data.sender_id,data.reciever_id,2,1,data.reciever_name]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
                
            });
        });
  },
    updateWalletSender(data,amount){//update senders balance
          return new Promise((resolve, reject) => {
             const tableQuery = {
                // give the query a unique name
                name:'sender update',
                 text: 'UPDATE wallet SET wallet_amount=wallet_amount -$1 WHERE customer_id= $2 Returning customer_id,wallet_amount',
                values: [amount.amount,data]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
                
            });
        });
    },
    updateWalletReciever(data,amount){// update recivers balance
          return new Promise((resolve, reject) => {
             const tableQuery = {
                // give the query a unique name
                name:'reciever transaction',
                 text: 'UPDATE wallet SET wallet_amount=wallet_amount + $1 WHERE customer_id= $2 Returning customer_id,wallet_amount',
                values: [amount.amount,data]
            }
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
                
            });
        });
    },


    
};

export default TransactionService;