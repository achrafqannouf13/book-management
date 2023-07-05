const express = require('express');
const expressRouter = express.Router();
const jwt = require('jsonwebtoken');

const bookController = require('./controllers/bookController');
const userController = require('./controllers/userController');

// Routes pour les livres
expressRouter.post('/books', bookController.createBook);
expressRouter.get('/books', bookController.getAllBooks);
expressRouter.get('/books/:id', bookController.getBookById);
expressRouter.put('/books/:bookID', bookController.updateBook);
expressRouter.delete('/books/:bookID', bookController.deleteBook);



// Routes pour les utilisateurs
expressRouter.post('/users', userController.createUser);
expressRouter.get('/users', userController.getAllUsers);
expressRouter.get('/users/:id', userController.getUserById);
expressRouter.put('/users/:id', userController.updateUser);
expressRouter.delete('/users/:id', userController.deleteUser);
expressRouter.post('/register', userController.registerUser);
expressRouter.post('/login', userController.loginUser);


module.exports = expressRouter;
