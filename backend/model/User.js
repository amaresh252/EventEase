const  mongoose=require('mongoose');
const  {Schema}=mongoose;


const user=new Schema({
    username:{type:String,required:true},
    password:{type:Buffer,required:true},
    role:{type:String,required:true},
    addresses:{type:[Schema.Types.Mixed]},
    salt:Buffer,
})

exports.User=mongoose.model('User',user);