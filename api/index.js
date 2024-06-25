import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'

import connectDB from './db/connectDB.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const port = process.env.PORT || 3000

connectDB();

const __dirname = path.resolve()
const app = express()

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);

app.listen(port, ()=> {
    console.log(`Server listening on port: ${port}`)
})