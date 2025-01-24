import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import UserService from '../services/UserService';
import Auth from '../components/Auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      const user = await UserService.loginUser(username, password);
      setUser(user);
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-black bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-black bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-white bg-black rounded hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/register" className="text-sm text-gray-600 hover:text-black">
            Don't have an account? Register here
          </a>
        </div>
        <div className="mt-4">
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default Login;