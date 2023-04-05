const express = require("express");
const mailer = require("./routes/api/nodeMailer");

const app = express();
app.use(express.json());
const PORT = 6969 || process.env.PORT;

app.get("/", (req, res) => {
	res.json({ msg: "shut the fuck up da" });
});

app.use("/api/mail", mailer);

app.listen(PORT, () => {
	console.log(`Server listening in port ${PORT}`);
});
