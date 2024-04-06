const { User } = require("../model/User");
const crypto=require('crypto')
const jwt = require('jsonwebtoken');
const {sanitizeUser}=require('../services/common')


exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt }); 
        const doc = await user.save();
        req.login(sanitizeUser(doc),(err)=>{
            if(err){
                res.status(400).json(err);
            } else {
                const token = jwt.sign(sanitizeUser(doc), process.env.JWT_SECRET_KET);
                res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
                .status(201).json({_id:doc._id,role:doc.role});
            }
           
        })
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.checkUser=async (req,res)=>{
    console.log(req.user)
    if(req.user){
        res.json(req.user);
      }
      else{
        res.sendStatus(401);
      }
      
}
exports.userInfo=async (req,res)=>{
    try {
      
        const { _id } = req.user;
        const user = await User.findById(_id);
        res.status(200).json(user);
     
      } catch (err) {
        res.status(400).json(err);
      }
      
}

exports.loginUser = async (req, res) => {
    const user=req.user
  res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
  .status(201)
  .json({ _id: user._id, role: user.role });
 
};

exports.signOut = async (req, res) => {
    console.log('logout')
    res.cookie('jwt', null, { expires: new Date(Date.now() ), httpOnly: true })
    .sendStatus(200)
};

exports.updateUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
