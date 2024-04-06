const {Product}=require('../model/Product')


exports.AddProduct=async(req,res)=>{
    try{
        // const imageUrl=req.imageUrl;
        // console.log('product',imageUrl,req.file)
        const {_id,role}=req.user;
        const product=new Product({...req.body,itemImage:req.file.filename,userid:_id,role:role});
        const doc=await product.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchProductByVendor=async(req,res)=>{
    try{
        const {_id}=req.user;
        console.log(_id)
       const product=await Product.find({userid:_id});
       if(product){
        res.status(200).json(product); 
       }
       else {
        res.status(400).json({message:'not fetching'})
       }
       
    }catch(err){
        res.status(400).json({message:'not fetching'});
    }
}

exports.deleteProduct=async(req,res)=>{
    const {_id}=req.params ;
    try{
        const deletedProduct=await Product.findByIdAndDelete(_id);
        if(deletedProduct){
            res.status(200).json({message:'deleted successfully'});
        }
        else {
            res.status(400).json({message:'not deleted'}) 
        }
    }catch(err){
         res.status(400).json(err); 
    }
}
exports.updateproduct=async(req,res)=>{
    const {_id}=req.params;
    var data=req.body;
    if(req.file){
         data={...req.body,itemImage:req.file.filename};
    }
    
    try{
        const updatedproduct=await Product.findByIdAndUpdate(_id,data,{new:true});
        if(updatedproduct){
            res.status(200).json(updatedproduct);
        }
        else {
            res.status(400).json({message:'not updated'});
        }
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchAllProductForHome=async(req,res)=>{
    try{
        const product=await Product.find();
        res.status(200).json(product)

    }catch(err){
        res.status(400).json({message:'error in product fetching'})
    }
}