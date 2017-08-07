var mongoose=require('mongoose');
var walletSchema=mongoose.Schema({
   Amount:{
       type: Number,
        default:0
   }


});

const Wallet=module.exports=mongoose.model('Wallet',walletSchema);

//get customers
// module.exports.getCustomers = (callback, limit) => {
// 	Wallet.find(callback).limit(limit);
// }