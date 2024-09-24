import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [image, setImage] = useState(null);

  const handleAddBook = async () => {
    const formData = new FormData();
    if (image) {
        formData.append('image', image); 
      }
    try {
      await axios.post('http://localhost:5000/api/books', { title, author, genre, publicationDate });
      alert('Book added');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-4">Add New Book</h1>
      <input 
        type="text" 
        placeholder="Title" 
        className="border border-gray-300 p-2 mb-4 w-full rounded" 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Author" 
        className="border border-gray-300 p-2 mb-4 w-full rounded" 
        onChange={(e) => setAuthor(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Genre" 
        className="border border-gray-300 p-2 mb-4 w-full rounded" 
        onChange={(e) => setGenre(e.target.value)} 
      />
      <input 
        type="date" 
        className="border border-gray-300 p-2 mb-4 w-full rounded" 
        onChange={(e) => setPublicationDate(e.target.value)} 
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImage(e.target.files[0])} 
      />
      <button 
        onClick={handleAddBook} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Add Book
      </button>
    </div>
  );
}

export default AddBookForm;
