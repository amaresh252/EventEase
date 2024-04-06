const mongoose=require('mongoose')
const {Schema}=mongoose;

const order=new Schema({
    products:{type:[Schema.Types.Mixed],required:true},
    address:{type:Schema.Types.Mixed,required:true},
    paymentMethod:{type:String,required:true},
    userid:{type:String,required:true},
    date:{type:String,required:true},
    totalAmount:{type:Number,required:true}
})

exports.Order=mongoose.model('Order',order)