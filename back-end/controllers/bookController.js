const Book = require('../models/Book');

const createBook = async (req, res) => {
  try {
    const { title, author, genre, publicationDate } = req.body;
    const book = new Book({ title, author, genre, publicationDate });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json({ msg: 'Book deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// const book = await Book.findById(req.params.id);
const borrowBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ msg: 'Book not found' });
      if (book.isBorrowed) return res.status(400).json({ msg: 'Book is already borrowed' });
  
      book.isBorrowed = true;
      book.borrowedBy = req.user; // Ensure `req.user` has the correct user ID
      await book.save();
      res.json({ msg: 'Book borrowed successfully', book });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send('Server error');
    }
    console.log('Request Params:', req.params);
console.log('Request Body:', req.body);
console.log('User ID:', req.user);

  };

const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.available) return res.status(400).json({ msg: 'Book is not borrowed' });

    book.available = true;
    book.borrowedBy = null;
    await book.save();
    res.json({ msg: 'Book returned' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook, borrowBook, returnBook };
