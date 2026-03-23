const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb+srv://tomaintainmyself2022_db_user:UKR56EuHkUk6Xi4R@cluster0.gipthnd.mongodb.net/studentDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Model
const Student = require("./models/Student");

// Add Student
app.post("/add", async (req, res) => {
    const { name, age } = req.body;
    const student = new Student({ name, age });
    await student.save();
    res.send("Student Added");
});

// Get Students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running");
});

