const secret = 'your_secret_key_edited';
const jwt = require('jsonwebtoken');
const authMiddlewares = {
    isAuth: (req, res, next) => {

        try {
            const authorizationHeader = req.headers.authorization;

            if (authorizationHeader.lenth ==0) {
                return res.status(401).json({ message: 'Missing authorization header' });
            }
            const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, secret);
            if (!decoded) {
                let newError = new Error()
                newError.statusCode = 401
                newError.myMessage = 'Token Malfunctioned'
                throw newError;
            }
            console.log('decoded , ',decoded)
            req.body.user_id = decoded._id
            req.body.user_email = decoded.email;
            next()
        }
        catch (err) {
            console.log('err ', err)
            if (!err.statusCode) {
                err.statusCode = 500
                err.myMessage = 'Server Error'
            }

            return res.status(err.statusCode).json({ message: err.myMessage })
        }
    }
}

module.exports = authMiddlewares;