const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const cors = require('cors');

const loginRouter = require('./logn');
const apiRouter = require('./api');
const mailsRouter = require('./mail');


const app = express();
const port = 5000;
app.use(cors());

app.use(bodyParser.json());

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/cwllogin';
// const mongoURI = 'mongodb://admin:adminPassword@13.235.79.231:27017';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Define a user schema with required fields
        const userSchema = new mongoose.Schema({
                username: { type: String, required: true },
                password: { type: String, required: true },
                mobileNumber: { type: String, required: true },
                email: { type: String, required: true, unique: true },
                profession: String,
                emailVerificationToken: String, 
                isEmailVerified: { type: Boolean, default: false }, 
            
        });

        // Create a User model
        const User = mongoose.model('User', userSchema);

        const transporter = nodemailer.createTransport({
            // ... (same as before)
            host: 'smtp.gmail.com',
            port: 465,
            service: 'gmail',
            secure: true,
            auth: {
                user: 'codewithlab@gmail.com',
                pass: 'idlpylsmfehiimyb',
            },
        });

        // Use the login router
        app.use('/logn', loginRouter(User, transporter, jwt, uuid));

        // Use the API router
        app.use('/api', apiRouter);
        app.use('/mail', require('./mail'));

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });