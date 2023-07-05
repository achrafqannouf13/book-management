const BookModel = require('../models/book');

// Créer un livre
exports.createBook = async (req, res) => {
  try {
    const { bookID,title, author, publicationDate, genre, price } = req.body;

    const book = new BookModel({
      bookID,
      title,
      author,
      publicationDate, 
      genre,
      price,
    });

    await book.save();

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du livre.' });
  }
};

// Récupérer tous les livres
exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des livres.' });
  }
};

// Récupérer un livre par son identifiant
exports.getBookById = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé.' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du livre.' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { bookID, title, author, publicationDate, description, genre, price } = req.body;

    const book = await BookModel.findOne({ bookID: req.params.bookID });

    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé.' });
    }

    book.title = title;
    book.author = author;
    book.publicationDate = publicationDate;
    book.description = description;
    book.genre = genre;
    book.price = price;

    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du livre.' });
  }
};

// Supprimer un livre
exports.deleteBook = async (req, res) => {
  try {
    const { bookID } = req.params;

    const result = await BookModel.deleteOne({ bookID });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Livre non trouvé.' });
    }

    res.json({ message: 'Livre supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du livre.' });
  }
};
