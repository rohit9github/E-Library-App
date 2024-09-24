import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditBookForm() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBook = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/books/${id}`);
          setBook(res.data);
          setTitle(res.data.title);
          setAuthor(res.data.author);
          setGenre(res.data.genre);
          setPublicationDate(res.data.publicationDate);
        } catch (err) {
          console.log(err);
        }
      };
      fetchBook();
  }, [id]);

  const handleEditBook = async () => {
    const token = localStorage.getItem('token');
  console.log("Token:", token);

  try {
    await axios.put(`http://localhost:5000/api/books/${id}`, { 
      title, 
      author, 
      genre, 
      publicationDate 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Book updated');
    navigate(`/books/${id}`);
  } catch (err) {
    console.log(err);
  }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 className="text-xl font-semibold mb-4">Edit Book</h1>
    <input 
      type="text" 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
      className="border border-gray-300 p-2 mb-4 w-full rounded" 
    />
    <input 
      type="text" 
      value={author} 
      onChange={(e) => setAuthor(e.target.value)} 
      className="border border-gray-300 p-2 mb-4 w-full rounded" 
    />
    <input 
      type="text" 
      value={genre} 
      onChange={(e) => setGenre(e.target.value)} 
      className="border border-gray-300 p-2 mb-4 w-full rounded" 
    />
    <input 
      type="date" 
      value={publicationDate} 
      onChange={(e) => setPublicationDate(e.target.value)} 
      className="border border-gray-300 p-2 mb-4 w-full rounded" 
    />
    <button 
      onClick={handleEditBook} 
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
      Update Book
    </button>
  </div>
  );
}

export default EditBookForm;
