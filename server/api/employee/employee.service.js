import connection from '../../db/db-pg-connection.js';

let EmployeeService = {
    getEmployees() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM public.transaction', (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.rows);
            });
        });
    }
};

export default EmployeeService;