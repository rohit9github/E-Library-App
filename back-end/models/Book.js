const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  available: { type: Boolean, default: true },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isBorrowed: { type: Boolean, default: false }, 
  imageUrl: { type: String } 
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
