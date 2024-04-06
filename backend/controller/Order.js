const {Order}=require('../model/Order')
const {VendorSideOrder} =require('../model/VendorSideOrder')
exports.createOrder=async(req,res)=>{
     
    try{
        const {_id}=req.user;
        const order=new Order({...req.body,userid:_id})
        const doc=await order.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json({message:'order not placed'})
    }
}

exports.fetchUserOrder=async(req,res)=>{
    const{_id}=req.user;
    try{
        const order=await Order.find({userid:_id})
        res.status(200).json(order);
    }catch(err){
        res.status(400).json({message:'order not fetched'})
    }
}

exports.createVendorSideOrder = async (req, res) => {
    try {
        const vendorSideOrder = req.body;
        const createdOrders = [];

        for (let i = 0; i < vendorSideOrder.length; i++) {
            const order = new VendorSideOrder(vendorSideOrder[i]);
                const doc = await order.save();
                if(doc){
                    createdOrders.push(doc);
                }
        }
        if (createdOrders.length ==vendorSideOrder.length) {
            res.status(201).json(createdOrders);
        } else {
            res.status(400).json('vendor side order failed to save');
        }
    } catch (err) {
        res.status(500).json('Error creating vendor side order');
    }
}



exports.fetchVendorSideOrder=async(req,res)=>{
    try{
        const {_id}=req.user;
        const  doc=await VendorSideOrder.find({vendor_id:_id});
        if(doc){
            res.status(200).json(doc)
        }
        else {
            res.status(400).json('error in vendor side order fetching')
        }

    }catch(err){
    res.status(400).json('vendor side order is not fetched')
   }
}
exports.fetchCustomerCurrentOrder=async(req,res)=>{
    try{
        const{_id}=req.user;
        const  doc=await VendorSideOrder.find({user_id:_id});
        if(doc){
            res.status(200).json(doc)
        }
        else {
            res.status(400).json('error in cusomer current order fetching')
        }

    }catch(err){
    res.status(400).json('usomer current order is not fetched')
   }
}

exports.fetchSingleVendorSideOrder=async(req,res)=>{
    try{
        const  doc=await VendorSideOrder.find({_id:req.params._id});
        if(doc){
            res.status(200).json(doc)
        }
        else {
            res.status(400).json('error in vendor side order fetching')
        }

    }catch(err){
    res.status(400).json('vendor side order is not fetched')
   }
}


exports.updateVendorSideOrder=async(req,res)=>{
    const _id=req.params._id;

    try{
        const  doc=await VendorSideOrder.findByIdAndUpdate(_id,req.body,{new:true});
        if(doc){
            res.status(200).json(doc)
        }
        else {
            res.status(400).json('error in vendor side order updating')
        }

    }catch(err){
    res.status(400).json('vendor side order is not updated')
   }
}
exports.deleteVendorSideOrder=async(req,res)=>{
    const _id=req.params._id;
    try{
        const  doc=await VendorSideOrder.findByIdAndDelete(_id);
        if(doc){
            res.status(200).json(doc)
        }
        else {
            res.status(400).json('error in vendor side order deleting')
        }

    }catch(err){
    res.status(400).json('vendor side order is not deleted')
   }
}