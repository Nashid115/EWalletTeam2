import connection from '../../db/db-pg-connection.js';

let CustomerService = {
    getCustomer() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM public.customer', (err, res) => {
                console.log("response", res);
                if (err)
                    reject(err);
                else
                    resolve(res.rows);

            });
        });
    },

    postCustomer(obj) {
        return new Promise((resolve, reject) => {
            // let tableQuery='INSERT INTO customer(customer_name, customer_email, customer_phone_no, customer_password) VALUES ("rishi", "r@gmail.com", "345343536","abcaca")';
            const text = 'INSERT INTO customer(customer_name, customer_email, customer_phone_no, customer_password) VALUES($1, $2,$3,$4) RETURNING *'
            const values = [obj.customer_name, obj.customer_email, obj.customer_phone_no, obj.customer_password]
            //    console.log(tableQuery,"tablequery");  
            connection.query(text, values, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);



            });
        });
    },
    postWallet(obj) {
        return new Promise((resolve, reject) => {
            console.log("object of wallet", obj)
            // let tableQuery='INSERT INTO customer(customer_name, customer_email, customer_phone_no, customer_password) VALUES ("rishi", "r@gmail.com", "345343536","abcaca")';
            const text = 'INSERT INTO wallet(customer_id, wallet_amount) VALUES($1, $2) RETURNING *'
            const values = [obj.customer_id, 0]
            //    console.log(tableQuery,"tablequery");  
            connection.query(text, values, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows[0]);



            });
        });
    },
    checkCustomer(obj) {
        return new Promise((resolve, reject) => {
            console.log("object of wallet", obj)
            const tableQuery = {
                // give the query a unique name
                name: 'fetch-user',
                text: 'SELECT * FROM customer WHERE customer_email = $1 AND customer_password=$2',
                values: [obj.customer_email, obj.customer_password]
            }
            // let tableQuery='select * from public.customer where customer_email=' + obj.customer_email + ' AND customer_password=' + obj.customer_password;
            //      const text = 'INSERT INTO wallet(customer_id, wallet_amount) VALUES($1, $2) RETURNING *'
            // const values = [obj.customer_id, 0]
            //    console.log(tableQuery,"tablequery");  
            connection.query(tableQuery, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows);
            });

        });
    }

};

export default CustomerService;