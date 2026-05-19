import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BookingPage from './components/BookingPage';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const pages = {
    home:     <HomePage setPage={setPage} />,
    services: <ServicesPage setPage={setPage} />,
    about:    <AboutPage />,
    contact:  <ContactPage />,
    book:     <BookingPage />,
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar page={page} setPage={setPage} />
      <main id="main-content" tabIndex={-1}>
        {pages[page] || <HomePage setPage={setPage} />}
      </main>
      <Footer setPage={setPage} />
    </>
  );
}

export default App;
