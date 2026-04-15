import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { fetchProducts } from '../services/api';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Featured Products
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Discover our handpicked selection of premium devices and accessories.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product._id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
            <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.image?.startsWith('http') || product.image?.startsWith('data') ? product.image : `http://localhost:5000/${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  <Link to={`/product/${product._id}`}>
                    <span aria-hidden="true" className="absolute inset-0 z-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="text-lg font-bold text-purple-600">${product.price}</p>
              </div>
              <div className="flex-1"></div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white px-4 py-2.5 rounded-xl font-medium transition-colors z-10 relative shadow-sm"
              >
                <ShoppingBag size={18} />
                Quick Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
