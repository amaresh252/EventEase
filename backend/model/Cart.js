const mongoose =require('mongoose')
const {Schema} = mongoose;

const cart=new Schema({
   product:{type:Schema.Types.ObjectId, ref:'Product',required:true},
   user:{type:Schema.Types.ObjectId,ref:'User',required:true}
});

exports.Cart=mongoose.model('Cart',cart)