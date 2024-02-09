const Product = require("../Models/Product");

const productController = {
    getProducts: (req, res, next) => {
        // logc...
        Product.find()
        .then(products=>{
            return res.status(200).json({
                products: products
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
    addProduct: (req, res, next) => {
        let newProduct = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.body.fileName,
            user: req.body.user_id
        })
        newProduct.save()
            .then(savedProduct => {
                return res.status(201).json({
                    message: 'Product Added Successfully...!!!',
                    product: { ...savedProduct }
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

module.exports = productController;