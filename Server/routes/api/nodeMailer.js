const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const FROM = process.env.FROM;
const PASS = process.env.PASS;
const TO = process.env.TO;

router.get("/", (req, res) => {
	res.json({ msg: "nodemailer" });
});

router.post("/", async (req, res) => {
	try {
		const { name, email, phone, message } = req.body;
		const transporter = nodemailer.createTransport({
			service: "hotmail",
			auth: {
				user: FROM,
				pass: PASS,
			},
		});
		const mailOptions = {
			from: FROM,
			to: TO,
			subject: "Customer mail",
			html: `<h3>Customer Details</h3> <ul> <li>Name: ${name}</li> <li>Email: ${email}</li> <li>Phone: ${phone}</li> </ul> <h3>Message</h3> <p>${message}</p>`,
		};
		transporter
			.sendMail(mailOptions)
			.then(response => {
				console.log("Message sent: %s", response.response);
				res.status(200).json({ msg: "Email has been sent" });
			})
			.catch(err => {
				console.log(err);
			});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
