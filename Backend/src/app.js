const express = require("express");
const userRouter = require("./routes/user.routes");
const cookieParser = require('cookie-parser')
const cors = require('cors');
const noteRouter = require("./routes/note.route");

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", userRouter);
app.use("/api/note", noteRouter);

module.exports = app;
