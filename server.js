/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Prasiddha Thapaliya Student ID:121569230 Date: 17th Feb, 2024
*
********************************************************************************/ 

const express = require("express");
const path = require("path");

//Importing the module for college data
const data = require("./modules/collegeData.js");

const app = express();

//Defining the port number
const HTTP_PORT = process.env.PORT || 8080;

//Serving static files from the "public" directory
app.use(express.static("public"));

//Routing for the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

//Routing for the about page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

//Routing for the HTML demo page
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

//Routing to get all students or students by course
app.get("/students", (req, res) => {
    if (req.query.course) {
        // Getting students by course
        data.getStudentsByCourse(req.query.course)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json({ message: "no results" });
            });
    } else {
        //Getting all students
        data.getAllStudents()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json({ message: "no results" });
            });
    }
});

//Routing to get a single student by student number
app.get("/student/:studentNum", (req, res) => {
    data.getStudentByNum(req.params.studentNum)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: "no results" });
        });
});

//Routing to get teaching assistants
app.get("/tas", (req, res) => {
    data.getTAs()
        .then((data) => {
            res.json(data);
        });
});

//Routing to get all courses
app.get("/courses", (req, res) => {
    data.getCourses()
        .then((data) => {
            res.json(data);
        });
});

//Handling 404 errors
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

//Initializing the data module and starting the server
data.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("app listening on: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.log("unable to start server: " + err);
    });