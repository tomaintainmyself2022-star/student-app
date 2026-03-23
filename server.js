const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb+srv://tomaintainmyself2022_db_user:UKR56EuHkUk6Xi4R@cluster0.gipthnd.mongodb.net/studentDB?retryWrites=true&w=majority")
.then(() => {
    console.log("MongoDB Connected");

    // START SERVER ONLY AFTER DB CONNECTS
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server running");
    });
})
.catch(err => {
    console.error("MongoDB Error:", err);
});

// Model
const Student = require("./models/Student");

// Add Student
app.post("/add", async (req, res) => {
    try {
        const { name, age } = req.body;

        if (!name || !age) {
            return res.status(400).json({ error: "Missing data" });
        }

        const student = new Student({ name, age });
        await student.save();

        res.json({ message: "Student Added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

