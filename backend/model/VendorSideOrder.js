const mongoose=require('mongoose')
const {Schema}=mongoose;

const  vendorSideOrderSchema=new Schema({
    itemName:{type:String,required:true},
    itemPrice:{type:Number,required:true},
    itemImage:{type:String,required:true},
    user_id:{type:String,required:true},
    vendor_id:{type:String,required:true},
    status:{type:String,required:true},
    address:{type:Schema.Types.Mixed,required:false}
})

exports.VendorSideOrder=mongoose.model('VendorSideOrder',vendorSideOrderSchema);