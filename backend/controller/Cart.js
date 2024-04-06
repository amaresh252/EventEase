const { Cart } =require('../model/Cart')


exports.addToCart=async(req,res)=>{
        try{
            const {_id}=req.user;
            const cart=new Cart({...req.body,user:_id})
            const doc=await cart.save();
            const  item=await doc.populate('product');
            res.status(201).json(item);
        }catch(err){
            res.status(400).json({message:'Not added to cart'})
        }
}

exports.fetchToCart=async(req,res)=>{
   
    try{
        const {_id}=req.user;
        const  cartItem=await Cart.find({user:_id}).populate('product')
        res.status(200).json(cartItem);
    }catch(err){
        res.status(400).json({message:'product  is not fetched'})
    }
}

exports.removeToCart=async(req,res)=>{
    const {_id}=req.params;
    try{
        const removeditem=await Cart.findByIdAndDelete(_id);
        if(removeditem){
            res.status(200).json(removeditem);
        }
        else {
            res.status(400).json({message:'product  is not removed'})
        }
       
    }catch(err){
        res.status(400).json({message:'error during removal'})
    }
}

exports.resetCart = async (req, res) => {
    
    try {
        const {_id} = req.user;
        const doc = await Cart.deleteMany({ user: _id });
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(400).json('Error during cart reset');
        }
    } catch (err) {
        res.status(400).json('Error in cart reset');
    }
}