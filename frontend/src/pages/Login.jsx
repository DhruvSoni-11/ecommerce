import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-xl rounded-3xl border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Login</h2>
      {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-xl text-center text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required 
                 className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:border-purple-500 focus:ring-purple-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required 
                 className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:border-purple-500 focus:ring-purple-500 outline-none" />
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white rounded-xl py-3 font-medium hover:bg-purple-700 transition">
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 text-sm">
        Don't have an account? <Link to="/register" className="text-purple-600 hover:underline">Register here</Link>
      </p>
    </div>
  );
};
