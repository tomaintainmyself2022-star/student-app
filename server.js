const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

let students = [];

app.post("/add", (req, res) => {
    const { name, age } = req.body;
    students.push({ name, age });
    res.send("Student Added");
});

app.get("/students", (req, res) => {
    res.json(students);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running");
});


