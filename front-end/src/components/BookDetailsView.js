import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../services/authService';

function BookDetailsView() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, [id]);

  const handleBorrow = async () => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/books/${id}/borrow`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReturn = async () => {
    try {
      await axios.post(`http://localhost:5000/api/books/${id}/return`);
      alert('Book returned');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    book && (
      <div>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <p>{book.genre}</p>
        <p>{book.publicationDate}</p>
        {book.available ? (
          <button onClick={handleBorrow}>Borrow</button>
        ) : (
          <button onClick={handleReturn}>Return</button>
        )}
      </div>
    )
  );
}

export default BookDetailsView;
