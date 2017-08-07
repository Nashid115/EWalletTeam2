import connection from '../../db/db-pg-connection.js';

let WalletService = {
    getWalletr() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM public.wallet', (err, res) => {
                console.log("response",res);
                if (err)
                    reject(err);
                else
                    resolve(res.rows);
                
            });
        });
    },
    checkWallet(data){
        console.log("dadada",data)
           return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM public.wallet', (err, res) => {
                console.log("response",res);
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);
                
            });
        });
    }

    
};

export default WalletService;