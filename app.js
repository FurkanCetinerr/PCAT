const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const Photo = require("./models/Photo");

const port = 3000;
const hostname = "127.0.0.1";

const app = express();

//connect DB
mongoose.connect("mongodb://localhost/pcat-test-db");

//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//MİDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
//ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort({ dateCreated: -1 });
  res.render("index", {
    photos,
  });
});
app.get("/photo/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
});

app.post("/photos", async (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  /* await Photo.create(req.body);
  res.redirect('/'); */
  let uploadImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
    res.redirect("/");
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.listen(port, hostname, () => {
  console.log(`SERVER ON! http://${hostname}:${port}/`);
});
