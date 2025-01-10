import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes';
import { UserProvider } from './contexts/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;