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
    if (book.isBorrowed) {
      alert('This book is already borrowed.');
      return;
    }
    
    // Proceed to borrow the book
    try {
      await axios.post(`/api/books/${id}/borrow`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Handle successful borrow (e.g., update UI, show message)
    } catch (error) {
      console.error('Error borrowing the book', error);
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

  const handleEdit = () => {
    navigate(`/edit-book/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        alert('Book deleted successfully');
        navigate('/books'); // Navigate back to the book listing
      } catch (error) {
        console.error('Error deleting the book', error);
      }
    }
  };

  return (
    book && (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-700 mb-2">Author: {book.author}</p>
        <p className="text-gray-700 mb-2">Genre: {book.genre}</p>
        <p className="text-gray-700 mb-4">Published on: {book.publicationDate}</p>
        {book.available ? (
          <button 
            onClick={handleBorrow} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Borrow
          </button>
        ) : (
          <button 
            onClick={handleReturn} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Return
          </button>
        )}

<div className="flex space-x-4 mt-4">
          <button 
            onClick={handleEdit} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            Delete
          </button>
        </div>
      </div>
    )
  );
}

export default BookDetailsView;
