const express = require("express");
const cors = require("cors");

const authRouter = require("./routers/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(authRouter);

module.exports = app;
