import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    fetchProductById(id)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch product', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-purple-600 hover:text-purple-700 font-medium">
          ← Back to store
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/')} 
        className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to listings
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Image Hub */}
        <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-lg border border-gray-100">
          <img
            src={product.image?.startsWith('http') || product.image?.startsWith('data') ? product.image : `http://localhost:5000/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover object-center translate-y-0 hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 lg:mt-0 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {product.name}
          </h1>
          
          <div className="mt-6 flex items-center">
            <p className="text-3xl tracking-tight text-purple-600 font-bold">
              ${product.price}
            </p>
            <div className="ml-4 pl-4 border-l border-gray-200 flex items-center text-sm text-green-600 font-medium">
              <CheckCircle2 size={16} className="mr-1" />
              In Stock
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <h3 className="sr-only">Description</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.longDescription || product.description}
            </p>
          </div>

          {product.specs && (
            <div className="mt-8 border-t border-gray-100 pt-8">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                <ul className="grid grid-cols-2 gap-4">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                       {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-10 flex">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-purple-600 border border-transparent rounded-2xl py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-xl shadow-purple-200 transition-all active:scale-95"
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
