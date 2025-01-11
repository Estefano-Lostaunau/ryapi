import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Header = () => {
  const { user } = useUser();

  return (
    <header className=" text-black p-4">
      <nav className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-400">Register</Link>
          </li>
        </ul>
        {user && (
          <div className="flex items-center space-x-2">
            <img src={user.picture} alt="User Avatar" className="w-8 h-8 rounded-full" />
            <span>{user.name}</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;