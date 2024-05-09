const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());

module.exports = function (User, transporter, jwt, uuid) {

    router.post('/forgotPassword', async (req, res) => {
        const femail = req.body;
        console.log("femail : ", femail)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if the email follows a valid format
        if (!femail.match(emailRegex)) {
            return res.status(200).json({
                message: 'email',
            });
        }

        const user = await User.findOne({ femail });

        if (!user) {
            return res.status(200).json({ message: 'find' });
        }

        // Generate JWT token without expiry
        const jwtToken = jwt.sign({ userId: user._id }, 'Never');
        console.log("tkn : ", jwtToken)
        // Send an email with the reset link/token
        const resetLink = `http://127.0.0.1:5000/reset-password/${jwtToken}`; // Replace with your frontend reset password page
        const mailOptions = {
            from: 'codewithlab@gmail.com',
            to: femail,
            subject: 'Password Reset Request',
            text: `Click the following link to reset your password: ${resetLink} : password : ${user.password}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error);
                res.status(200).json({ message: 'Internal Server Error.' });
            } else {
                console.log('Email sent:', info.response);
                res.json({ message: 'Password reset link sent successfully' });
            }
        });
    });

    // Route to handle password reset
    router.post('/resetPassword', async (req, res) => {
        const { resetToken, newPassword } = req.body;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // Check if the password meets the criteria
        if (!newPassword.match(passwordRegex)) {
            return res.status(200).json({
                message: 'password',
            });
        }

        // Verify the reset token
        const decoded = jwt.verify(resetToken, jwtSecret);

        // Find the user by ID
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(200).json({ message: 'find' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).json({ message: 'success' });
    });

    router.post('/send-message', (req, res) => {
        const { name, email, message, phoneNumber } = req.body;

        const mailOptions = {
            from: 'codewithlab@gmail.com',
            to: 'contectpage@gmail.com',
            subject: 'New Message from Contact Form',
            html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p><p>phoneNumber: ${phoneNumber}</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error);
                res.status(500).json({ error: 'Internal Server Error.' });
            } else {
                console.log('Email sent:', info.response);
                res.json({ message: 'Message sent successfully' });
            }
        });
    });

    return router;
}