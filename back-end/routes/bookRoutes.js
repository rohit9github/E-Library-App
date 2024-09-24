const express = require('express');
const { createBook, getBooks, getBookById, updateBook, deleteBook, borrowBook, returnBook } = require('../controllers/bookController');
const router = express.Router();
const Book = require("../models/Book");
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', createBook);
router.get('/', getBooks);
router.get('/:id', getBookById); 
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/:id/borrow', authMiddleware, async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
  
      if (book.isBorrowed) return res.status(400).json({ message: 'Book is already borrowed' });
  
      book.isBorrowed = true;
      book.borrowedBy = req.user;
      await book.save();
      res.json({ message: 'Book borrowed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.post('/:id/return', authMiddleware, async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
  
      if (!book.isBorrowed || book.borrowedBy.toString() !== req.user) {
        return res.status(400).json({ message: 'Cannot return this book' });
      }
  
      book.isBorrowed = false;
      book.borrowedBy = null;
      await book.save();
      res.json({ message: 'Book returned successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
