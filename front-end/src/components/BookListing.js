import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookListing() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-4">Book List</h1>
      <ul className="space-y-2">
        {books.map(book => (
          <li key={book._id} className="border-b border-gray-300 py-2">
            <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookListing;
