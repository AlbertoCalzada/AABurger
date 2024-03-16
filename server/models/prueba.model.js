const mongoose = require('mongoose')

//la forma que van a tener los objetos en la bbdd

const schema= new mongoose.Schema({ 
    title:String,
    author:String,
    genre:String,
    publication_date:String,

})

module.exports= mongoose.model('Book',schema)