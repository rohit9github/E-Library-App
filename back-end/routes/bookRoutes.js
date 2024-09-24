const express = require('express');
const { createBook, getBooks, getBookById, updateBook, deleteBook, borrowBook, returnBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.post('/:id/borrow', authMiddleware, borrowBook);
router.post('/:id/return', authMiddleware, returnBook);

module.exports = router;
