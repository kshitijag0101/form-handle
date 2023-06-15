require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['https://kshitijagarwal.dev']
}));

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

app.post('/', async (req, res, next) => {
    try{
        const {contactName, contactEmail, contactSubject, contactMessage } = req.body;
        await transporter.sendMail({
            to: "agarwal.kshitij01@gmail.com",
            from: process.env.EMAIL,
            subject: "Contact Form Submission",
            html: `
                <h1>You have recieved a message from contact form</h1><br>
                Email from: ${contactName}<br>
                Email address: ${contactEmail}<br>
                Subject: ${contactSubject}<br>
                Message: ${contactMessage}<br>
            `
        });
        return res.status(200).json({message: 'Email Sent'})
    }
    catch(err){
        console.log(err);
    }

});

app.listen(5000, ()=>{
    console.log("Server started on port " + 5000 + "...");
});