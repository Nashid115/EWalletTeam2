import connection from './db/db-pg-connection.js';
import Cron from 'cron';




var jobToMakeWalletLimtToDefault = function(expression){
    var CronJob = Cron.CronJob;
    new CronJob(expression, function() {
    const tableQuery={
        text:'UPDATE wallet SET todays_wallet_limit =$1,send_limit=$1',
        values:[0]
    }
   connection.query(tableQuery, (err, res) => {
                if (err)
                    console.log('Error Occurred');
                else{
                    console.log('Job Finished');
                }

            });
  },     
        
  null,
  true
  );

};
    

export default jobToMakeWalletLimtToDefault;