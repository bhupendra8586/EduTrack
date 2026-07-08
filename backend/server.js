const express = require("express");
const env = require("dotenv");
env.config();
const connect_to_DB = require("../backend/connection/connect");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const marksRoutes = require("./routes/marksRoutes");
const yearRoutes = require("./routes/yearRoutes");


const app = express();
const port = process.env.PORT || 7878;




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL, // frontend url
    credentials: true // allow cookies
}));




app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/marks", marksRoutes);
app.use("/year", yearRoutes);


app.get("/", (req, res) => {
    res.send("Home Page of EduTrack: Student Academic Management System from server.js");
});

connect_to_DB(process.env.MONGODB_URL).then(() => {
    console.log("database connected successfully...");
    app.listen(port, (req, res) => {
        console.log(`server started at ${port}...`);
    });
});