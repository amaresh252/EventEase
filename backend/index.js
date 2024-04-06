const express = require("express");
const server = express();
const path=require('path')
const mongoose = require("mongoose");
const multer = require("multer");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");
require('dotenv').config()
const cookieParser = require("cookie-parser");
const auth = require("./controller/Auth");
const product = require("./controller/Product");
const cart = require("./controller/Cart");
const order = require("./controller/Order");
const cors=require('cors');
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

const { User } = require("./model/User");
const { isAuth, cookieExtractor,sanitizeUser } = require("./services/common");
const cloudinary =require('./services/cloudinary')



const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KET;

server.use(express.static(path.join(__dirname, 'build')));
server.use(express.static("public"));
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session"));
server.use(cors());
server.use(express.json());


const router = express.Router();
server.use(router);

// Image Upload
const storage = multer.diskStorage({
  
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const CloudinaryUpload=(req,res,next)=>{
  
  cloudinary.uploader.upload(req.file.path, function (err, result){
      if(err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }
       req.file.filename = result.secure_url;
       next()
    })
   
}



router.post("/auth", auth.createUser);
router.post("/auth/login", passport.authenticate("local"), auth.loginUser);
router.patch("/auth",isAuth(), auth.updateUser);
router.get("/auth/logout", auth.signOut);
router.get('/auth/check',passport.authenticate("jwt"),auth.checkUser)
router.get('/user',isAuth(),auth.userInfo)

router
  .post("/cart",isAuth(), cart.addToCart)
  .get("/cart",isAuth(),  cart.fetchToCart)
  .delete("/cart/:_id",isAuth(),  cart.removeToCart)
  .delete("/reset",isAuth(),  cart.resetCart);

router
  .post("/order",isAuth(),  order.createOrder)
  .get("/order",isAuth(),  order.fetchUserOrder);
router
  .post("/vendor-side-order", isAuth(), order.createVendorSideOrder)
  .get("/vendor-side-order", isAuth(), order.fetchVendorSideOrder)
  .put("/vendor-side-order/:_id",isAuth(),  order.updateVendorSideOrder)
  .delete("/vendor-side-order/:_id", isAuth(), order.deleteVendorSideOrder);

router.get("/single-vendor-side-order/:_id",isAuth(),  order.fetchSingleVendorSideOrder);
router.get("/customer-current-order",isAuth(),  order.fetchCustomerCurrentOrder);

router
  .get("/vendor/products",isAuth(),   product.fetchProductByVendor)
  .post("/products/",isAuth(), upload.single("itemImage"),CloudinaryUpload, product.AddProduct)
  .delete("/products/:_id",isAuth(), product.deleteProduct)
  .patch("/products/:_id",isAuth(), upload.single("itemImage"),CloudinaryUpload, product.updateproduct)
  .get("/products",isAuth(), product.fetchAllProductForHome);



  passport.use(
    "local",
    new LocalStrategy(async function (username, password, done) {
      try {
        const user = await User.findOne({ username }).exec();
        if (!user) {
         return done(null, false, { message: "invalid credentials" });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              done(null, false, { message: "invalid credentials" });
            }
            else{
              const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KET);
              done(null, {_id:user._id,role:user.role,token});
            }
           
          }
        );
      } catch (err) {
        done(err);
      }
    })
  );
  
  passport.use(
    "jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      
      try {
        const user =await User.findById(jwt_payload._id);
        if (user) {
          return done(null, sanitizeUser(user));
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
  
  // this creates session variable req.user on being called form callback
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { _id: user._id, role: user.role });
    });
  });
  
  // this change session variable req.user whe called fron authorized request
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




main().catch((error) => console.log(error));


async function main(){
  await mongoose.connect(process.env.MONGOBD_URL);
  console.log('database connected')   
}





server.listen(process.env.PORT, ()=>{
  console.log('server started')
});