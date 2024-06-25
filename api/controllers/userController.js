import User from '../models/user.js'
import errorHandler from '../utils/errorHandler.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
// @route   POST /api/user/signup
// @access  Public

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const newUser = new User({
        username,
        email,
        password
    });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
}

// @desc    Auth user & get token
// @route   POST /api/user/signin
// @access  Public

export const signin = async (req, res, next) => {
    const { email } = req.body;
    console.log(req.body)

    try {
        const user = await User.findOne({email});
        if (!user){
            return next(errorHandler(404, 'User not found'))
        }
        const validPassword = user.matchPassword(req.body.password);
        if (!validPassword){
            return next(errorHandler(401, 'incorrect credentials'));
        }
        generateToken(res, user._id);
        const {password, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

// @desc    Auth user or Register a new user with google & get token
// @route   POST /api/user/google
// @access  Public

export const googleAuth = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({email});

        if (user) {
            generateToken(res, user._id);
            const {password, ...rest} = user._doc;
            res.status(200).json(rest)
        } else {
            const generatePassword = Math.random().toString(36).slice(-8);
            const username = req.body.name.split(' ').join('').toLowerCase()+Math.random().toString(36).slice(-5)
            const picture = req.body.photo
            const newUser = new User({
                username,
                email,
                password:generatePassword,
                picture
            });

            await newUser.save();

            generateToken(res, newUser._id)
            const {password, ...rest} = newUser._doc

            res.status(200).json(rest)
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Signout user / clear cookie
// @route   POST /api/user/signout
// @access  Public

export const signout = (req, res) => {
    res.clearCookie('jwt_token').status(200).json('Signout success')
}

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private

export const updateUserProfile = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.picture = req.body.picture || user.picture
            if (req.body.password) {
                user.password = req.body.password
            }
            const updatedUser = await user.save();
            const {password, ...rest} = updatedUser._doc
            res.status(200).json(rest);
        } else {
            next(errorHandler(404, 'User not found'));
        }
    } catch (error) {
        next(error)
    }
}