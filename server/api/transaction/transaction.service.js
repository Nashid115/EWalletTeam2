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
    }

    
};

export default TransactionService;