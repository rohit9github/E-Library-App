import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditBookForm() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`).then((res) => {
      setBook(res.data);
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setGenre(res.data.genre);
      setPublicationDate(res.data.publicationDate);
    });
  }, [id]);

  const handleEditBook = async () => {
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, { title, author, genre, publicationDate });
      alert('Book updated');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input type="date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
      <button onClick={handleEditBook}>Update Book</button>
    </div>
  );
}

export default EditBookForm;
