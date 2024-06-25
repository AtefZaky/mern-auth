import jwt from 'jsonwebtoken'
import errorHandler from '../utils/errorHandler.js';

const auth = (req, res, next) => {
    const token = req.cookies.jwt_token;

    // check if there is a token
    if (!token) return next(errorHandler(401, 'You are not authorized'));

    // verify JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token not valid'));
        req.user = user;
        next();
    });
}

export default auth;