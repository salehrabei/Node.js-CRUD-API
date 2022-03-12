const express = require("express");
const connection = require("./configration/configDb");
require("dotenv").config();
const app = express();
const userRoute = require("./modules/users/routes/users.route");
const port = process.env.PORT;



connection();
app.use(express.json());
app.use(userRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
