import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const handleAddBook = async () => {
    try {
      await axios.post('http://localhost:5000/api/books', { title, author, genre, publicationDate });
      alert('Book added');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Add New Book</h1>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} />
      <input type="text" placeholder="Genre" onChange={(e) => setGenre(e.target.value)} />
      <input type="date" onChange={(e) => setPublicationDate(e.target.value)} />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
}

export default AddBookForm;
