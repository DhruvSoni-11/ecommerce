import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="text-center mt-20 text-xl font-bold">Please login to add products.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await addProduct(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-xl rounded-3xl border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Add New Product</h2>
      {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-xl text-center text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required 
                 className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:border-purple-500 focus:ring-purple-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required 
                 className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:border-purple-500 focus:ring-purple-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image File</label>
          <input type="file" onChange={e => setImage(e.target.files[0])} required 
                 className="mt-1 block w-full border border-gray-300 rounded-xl p-2" />
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white rounded-xl py-3 font-medium hover:bg-purple-700 transition">
          Upload Product
        </button>
      </form>
    </div>
  );
};
