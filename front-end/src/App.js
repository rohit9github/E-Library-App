import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './components/EditBookForm';
import BookListing from './components/BookListing';
import BookDetailsView from './components/BookDetailsView';
import NavBar from './components/navbar';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/books" element={<BookListing />} />
        <Route path="/books/:id" element={<BookDetailsView />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/edit-book/:id" element={<EditBookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
