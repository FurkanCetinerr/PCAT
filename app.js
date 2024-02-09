const express = require("express");
const mongoose = require('mongoose');
const ejs = require("ejs");
const path = require("path");
const Photo= require('./models/Photo');

const port = 3000 ;
const hostname = '127.0.0.1' ;

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//MİDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({}) 
  res.render('index',{
    photos
  });
});
app.get("/about", (req, res) => {
  res.render('about');
});
app.get("/add", (req, res) => {
  res.render('add');
});
app.get("/video-page", (req, res) => {
  res.render('video-page');
});


app.post("/photos", async(req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});


app.listen(port, hostname, () => {
  console.log(`SERVER ON! http://${hostname}:${port}/`);
});

