const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Student = require("./models/Student");

app.post("/add", async (req, res) => {
    const { name, age } = req.body;
    const student = new Student({ name, age });
    await student.save();
    res.send("Student Added");
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
