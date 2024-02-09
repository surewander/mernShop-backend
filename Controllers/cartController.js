const Cart = require("../Models/Cart")
const CartItem = require("../Models/CartItem")

const cartController = {

    addToCart: (req, res, next) => {
        //will get cartItem and userId


        let savedCartItem = null;
        let cartCount = 0;
        // check if product in cart already exist then inc qty in cartItem and update else insert
        console.log('request body:- ', req.body)
        CartItem.find({
            user: req.body.user_id,
            product: req.body.cartItem.productId
        })
            .then(result => {
                console.log('citm result:-  ', result)
                if (result.length > 0) {
                    //product exist update
                    let existingCartItem = result[0]
                    existingCartItem.quantity += req.body.cartItem.quantity
                    return existingCartItem.save()
                }
                // insert the cartItem
                let newCartItem = new CartItem({
                    user: req.body.user_id,
                    product: req.body.cartItem.productId,
                    quantity: 1
                })
                return newCartItem.save()
            })
            .then(saved => {
                savedCartItem = saved;
                // check If cart exist
                return Cart.find({
                    user: req.body.user_id
                })


            })
            .then(result => {
                console.log('cartResult:- ', result);
                console.log('savedCartItem ', savedCartItem)
                if (result.length > 0) {
                    // cart exist update
                    // update cartItems
                    if (result[0].cartItems.includes(savedCartItem._id.toString())) {
                        // no need to push
                    }
                    else {
                        result[0].cartItems.push(savedCartItem._id);
                    }
                    // increase count
                    result[0].count += req.body.cartItem.quantity
                    return result[0].save()
                }
                // create new cart
                let cart = new Cart({
                    user: req.body.user_id,
                    cartItems: [savedCartItem._id],
                    count: req.body.cartItem.quantity
                })
                return cart.save();
            })
            .then((savedCart) => {
                return res.status(201).json({
                    message: 'Item added to cart...!!!',
                    cartCount: savedCart.count
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

    },
    getCart: (req, res, next) => {
        // will get userId fetch the cart and return
        console.log('in get cart...!!!');
        let finalCart = {}
        Cart.find({
            user: req.body.user_id
        })
            .then(result => {
                console.log('crt result:- ',result)
                if (result.length == 0) {
                    console.log('in check')
                    return res.status(200).json({
                        cart: {
                            user: req.body.user_id,
                            cartItems: [],
                            count: 0
                        }
                    })
                }

                return Cart.findOne({
                    user: req.body.user_id
                }).populate('cartItems')


            })
            .then((fullyfetchedCart) => {
                console.log(fullyfetchedCart);
                if(fullyfetchedCart.cartItems){

                    finalCart = fullyfetchedCart
                    populatedCartItemsPromises = fullyfetchedCart.cartItems.map(cartItem => {
                        return CartItem.findOne({
                            _id: cartItem._id
                        }).populate('product')
                    });
                    return Promise.all(populatedCartItemsPromises)
                }
                return false;
                })
            .then(populatedCartItems=>{
                console.log(populatedCartItems)
                if(populatedCartItems){

                    finalCart.cartItems = populatedCartItems
                    return res.status(200).json({
                        cart: finalCart
                    })
                }
            })
            .catch(err => {
                console.log('err ', err)
                if (!err.statusCode) {
                    err.statusCode = 500
                    err.myMessage = 'Server Error'
                }

                return res.status(500).json({ message: err.myMessage })
            })
    },
    getCartCount: (req, res, next) => {
        //....
    }

}

module.exports = cartController