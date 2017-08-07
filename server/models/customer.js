var mongoose=require('mongoose');
var customerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone_no:{
        type:String,
        required:true
    
    }
    // date:{
    //     type:Date,
    //     default:Date.now
    // }


});

const Customer=module.exports=mongoose.model('customer',customerSchema);

//get customers
// module.exports.getCustomers = (callback, limit) => {
// 	Customer.find(callback).limit(limit);
// }