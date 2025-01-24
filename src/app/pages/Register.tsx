import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UserService.registerUser(username, password, email);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-black">Register</h2>
        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black">Username:</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-black">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-black bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-black bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-black rounded hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;