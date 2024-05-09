const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(bodyParser.json());

module.exports = function (User, transporter, jwt, uuid) {

    router.post('/register', async (req, res) => {
        const {
            susername,
            spassword,
            smobileNumber,
            semail,
            sprofession,
        } = req.body;


        console.log("susername: ", susername)
        console.log("spassword: ", spassword)
        console.log("smobileNumber: ", smobileNumber)
        console.log("semail: ", semail)
        console.log("sprofession: ", sprofession)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if the email follows a valid format
        if (!semail.match(emailRegex)) {
            return res.status(200).json({
                message: 'email',
            });
        }

        const mobileNumberRegex = /^\d{10}$/;
        if (!smobileNumber.match(mobileNumberRegex)) {
            return res.status(200).json({
                message: 'mobile',
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // Check if the password meets the criteria
        if (!spassword.match(passwordRegex)) {
            return res.status(200).json({
                message: 'password',
            });
        }

        try {
            const existingUser = await User.findOne({ $or: [ { email: semail }] });
            const hashedPassword = await bcrypt.hash(spassword, saltRounds);

            if (existingUser) {
                console.log("exist")
                return res.status(200).json({ message: 'exist' });
            }

            const emailVerificationToken = uuid.v4();

            const newUser = new User({
                username: susername,
                password: hashedPassword,
                mobileNumber: smobileNumber,
                email: semail,
                profession: sprofession,
                emailVerificationToken,
            });

            await newUser.save();
            const jwtToken = jwt.sign({ emailVerificationToken }, 'Never', { expiresIn: '10m' });

            const verificationLink = `http://localhost:5000/logn/verify-email?token=${jwtToken}`;

            const mailOptions = {
                from: "codewithlab@gmail.com",
                to: semail,
                subject: 'Email Verification',
                text: `Please click the following link to verify your email: ${verificationLink}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Error sending verification email' });
                }

                console.log('Verification email sent:', info.response);
                return res.status(200).json({ message: 'verify' });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    router.get('/verify-email', async (req, res) => {
        const { token } = req.query;

        try {
            // Verify the JWT token
            const decoded = jwt.verify(token, 'Never');
            await User.updateOne(
                { emailVerificationToken: decoded.emailVerificationToken },
                { $set: { isEmailVerified: true } }
            );

            // Redirect to the specified URL
            return res.redirect('http://localhost:3000/login');


        } catch (error) {
            console.error(error);
            return res.status(200).json({ error: 'Invalid or expired verification token' });
        }
    });


    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ $or: [{ username: email }, { email: email }] });

        if (!user) {
            return res.status(200).json({ message: 'registeration' });
        }

        if (!user.isEmailVerified) {
            return res.status(200).json({ message: 'verification' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(200).json({ message: 'password' });
        }

        // Generate JWT token without expiry
        const jwtToken = jwt.sign({ userId: user._id }, 'Never');

        return res.status(200).json({ message: 'success', token: jwtToken });
    });

    router.post('/forgotPassword', async (req, res) => {
        const { femail } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if the email follows a valid format
        if (!femail.match(emailRegex)) {
            return res.status(200).json({
                message: 'email',
            });
        }

        try {
            const user = await User.findOne({ email: femail });

            if (!user) {
                return res.status(200).json({ message: 'find' });
            }

            // Send an email with the reset link/token
            const resetLink = `http://localhost:3000/resetForgotPassword/${user.emailVerificationToken}`;
            const mailOptions = {
                from: 'codewithlab@gmail.com',
                to: femail,
                subject: 'Password Reset Request',
                text: `Click the following link to reset your password: ${resetLink}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email sending error:', error);
                    res.status(200).json({ message: 'internalError' });
                } else {
                    console.log('Email sent:', info.response);
                    res.json({ message: 'sent' });
                }
            });
        } catch (error) {
            console.error('Forgot password error:', error);
            res.status(200).json({ message: 'internalError' });
        }
    });

    router.post('/resetForgotPassword', async (req, res) => {
        const { resetToken, newPassword } = req.body;
        console.log('token: ', resetToken)
        const user = await User.findOne({ emailVerificationToken: resetToken });

        if (!user) {
            return res.status(200).json({ message: 'find' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // Check if the password meets the criteria
        if (!newPassword.match(passwordRegex)) {
            return res.status(200).json({ message: 'password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'success' });
    });

    router.post('/resetPassword', async (req, res) => {
        const { remail, oldPassword, newPassword } = req.body;

        const user = await User.findOne({ email: remail });

        if (!user) {
            return res.status(200).json({ message: 'find' });
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(200).json({ message: 'incorrectOldPassword' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // Check if the password meets the criteria
        if (!newPassword.match(passwordRegex)) {
            return res.status(200).json({
                message: 'password',
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).json({ message: 'success', tkn: user.emailVerificationToken });
    });

    router.post('/send-message', (req, res) => {
        const { name, email, message, phone } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if the email follows a valid format
        if (!email.match(emailRegex)) {
            return res.status(200).json({
                message: 'email',
            });
        }

        const mailOptions = {
            from: 'codewithlab@gmail.com',
            to: 'contectpage@gmail.com',
            subject: 'New Message from Contact Form',
            html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p><p>phoneNumber: ${phone}</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error);
                res.status(200).json({ message: 'Internal Server Error.' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'sent' });
            }
        });
    });

    return router;

}