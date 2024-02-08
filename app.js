const express = require("express");
const ejs = require("ejs");
const path = require("path");


const port = 3000
const hostname = '127.0.0.1'

const app = express();

//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//MİDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ROUTES
app.get("/", (req, res) => {
  res.render('index');
});
app.get("/about", (req, res) => {
  res.render('about');
});
app.get("/add", (req, res) => {
  res.render('add');
});
app.post("/photos", (req, res) => {
  console.log(req.body);
  res.redirect('/')
});


app.listen(port, hostname, () => {
  console.log(`SERVER ON! http://${hostname}:${port}/`)
});

