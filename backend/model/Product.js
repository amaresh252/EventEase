const mongoose=require('mongoose');
const {Schema}=mongoose;

const productSchema=new Schema({
    itemName:{type:String,required:true},
    itemPrice:{type:Number,required:true},
    itemImage:{type:String,required:true},
    itemType:{type:String,required:true},
    userid:{type:String,required:true},
    role:{type:String,required:true}
})

exports.Product=mongoose.model('Product',productSchema);