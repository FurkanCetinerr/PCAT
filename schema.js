const mongoose = require('mongoose')
const Schema = mongoose.Schema

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db')

//create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String
})

const Photo= mongoose.model('Photo', PhotoSchema)

//create a photo

/* Photo.create({
    title:'Photo Title 3',
    description: 'Photo descriptiion 3 lorem ipsum'
}) */

//delete a photo

/* const id = ('65c4ea3b50e44a70ec2580ac')
Photo.findByIdAndDelete(id).then((data)=> {
    console.log("Photo deleted")
}) */