import express from 'express';
import { signout, signin, googleAuth, signup, updateUserProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', googleAuth)
router.post('/signout', signout)

router.put('/profile', auth ,updateUserProfile);

export default router 