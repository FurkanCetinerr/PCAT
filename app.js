const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const ejs = require("ejs");
const photoController=require('./controllers/photoController')
const pageController=require('./controllers/pageController');

const port = 3000;
const hostname = "127.0.0.1";

const app = express();

//connect DB
mongoose.connect("mongodb://localhost/pcat-test-db"),{
  useFindAndModify: false
};

//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//MİDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride("_method", {
  methods:['POST', 'GET']
}));
//ROUTES
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id",photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id",photoController.updatePhoto );
app.delete('/photos/:id', photoController.deletePhoto);

app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/photos/edit/:id", pageController.getEditPage);

app.listen(port, hostname, () => {
  console.log(`SERVER ON! http://${hostname}:${port}/`);
});
