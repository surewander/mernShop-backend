const User = require("../Models/User")
const jwt = require('jsonwebtoken');
const secret = 'your_secret_key_edited';

const bcrypt = require('bcryptjs');
const Cart = require("../Models/Cart");


const userContoller = {
    signUpUser: (req, res, next) => {
        console.log('request reached')
        //...logic
        let foundUser = null;
        let hashedPassword = null;
        User.find({ email: req.body.email })
            .then((findResult) => {
                if (findResult.length > 0) {
                    let newError = new Error()
                    newError.statusCode = 403
                    newError.myMessage = 'user with that email already exist'
                    throw newError;
                }
                // hash password
                var salt = bcrypt.genSaltSync(10);
                return bcrypt.hash(req.body.password, salt)

            })
            .then(hashedpw => {
                hashedPassword = hashedpw
                // create new user

                let user = new User({
                    fullName: req.body.email,
                    email: req.body.email,
                    password: hashedPassword
                })
                return user.save()
            })
            .then(savedUser => {
                return res.status(201).json({
                    message: 'Signed Up Successfully...!!!',
                    user: savedUser
                })
            })
            .catch(err => {
                console.log('err ', err)
                if (!err.statusCode) {
                    err.statusCode = 500
                    err.myMessage = 'Server Error'
                }

                return res.status(err.statusCode).json({ message: err.myMessage })
            })
        // let user = new User({
        //     fullName: req.body.fullName,
        //     email:
        // })
    },
    signInUser: (req, res, next) => {
        let foundUser = null;
        let token = null;
        //...logic
        User.find({ email: req.body.email })
            .then(result => {
                if (result.length == 0) {

                    let newError = new Error()
                    newError.statusCode = 403
                    newError.myMessage = 'user with that email not exist'
                    throw newError;

                }
                // compare password
                if(!(bcrypt.compareSync(req.body.password, result[0].password))){
                    let newError = new Error()
                    newError.statusCode = 403
                    newError.myMessage = 'wrong password'
                    throw newError;
                }
                // generate token
                const tokenData= {
                    email: result[0].email,
                    _id: result[0]._id
                }
                token = jwt.sign(tokenData, secret, { expiresIn: 60 * 60 }); // Expires in 1 hour
                foundUser = result[0]
                return Cart.find({
                    user: foundUser._id
                })
                
            })
            .then(cartResult=>{
                if(cartResult.length>0){
                    return res.status(201).json({
                        message: 'logged in Successfully..!!!',
                        token: token,
                        id: foundUser._id,
                        email: foundUser.email,
                        cartCount: cartResult[0].count
                    })
                }
                return res.status(201).json({
                    message: 'logged in Successfully..!!!',
                    token: token,
                    id: foundUser._id,
                    email: foundUser.email,
                    cartCount: 0
                })
            })
            .catch(err => {
                console.log('err ', err)
                if (!err.statusCode) {
                    err.statusCode = 500
                    err.myMessage = 'Server Error'
                }

                return res.status(err.statusCode).json({ message: err.myMessage })
            })
    }
}

module.exports = userContoller