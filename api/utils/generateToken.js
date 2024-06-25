import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'30d'});

    // set token as http-only cookie
    res.cookie('jwt_token', token, {
        httpOnly: true,
        // use secure cookie in production
        secure: process.env.ENVIROMENT !== 'development',
        maxAge: 30 * 24 *60 *60 * 100, // 30 days 
        // sameSite: strict, // Prevent CSRF attacks
    });
}

export default generateToken;