const express = require("express");
const cors = require("cors");

const authRouter = require("./routers/auth");
const cardsRouter = require("./routers/cards");
const dashboardRouter = require("./routers/dashboard");

require("./server/mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(cardsRouter);
app.use(dashboardRouter);

module.exports = app;
