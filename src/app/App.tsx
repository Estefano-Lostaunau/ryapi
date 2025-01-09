import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;