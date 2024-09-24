const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authenticateToken = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/uploads', express.static('uploads'));


app.put('/api/books/:id', authenticateToken, (req, res) => {
    const { title, author, genre, publicationDate } = req.body;
    const { id } = req.params;

    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
      return res.status(404).send('Book not found');
    }
  
    books[bookIndex] = { id, title, author, genre, publicationDate };
    
    res.status(200).json({ message: 'Book updated successfully' });
  });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
