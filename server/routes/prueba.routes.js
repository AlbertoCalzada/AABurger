const express = require('express')
const router = express.Router()
const Book = require('../models/prueba.model')

//Obtener los libros

router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        console.log('GET ALL', books)
        if(books.length===0){
            res.status(204).json([])
        }
        res(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Crear un nuevo libro