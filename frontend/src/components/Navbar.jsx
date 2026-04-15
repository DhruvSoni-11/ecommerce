import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Store, Package, LogOut, User } from 'lucide-react';

export const Navbar = () => {
  const { cartItems, orderTrackingInfo } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Products', path: '/', icon: <Store size={20} /> },
  ];

  if (orderTrackingInfo) {
    navLinks.push({ name: 'Track Order', path: '/tracking', icon: <Package size={20} /> });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                <Store size={24} className="text-purple-600" />
              </div>
              <span className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors">
                LumiShop
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut size={20} /> Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                <User size={20} /> Login
              </Link>
            )}

            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors ml-4"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-purple-600 rounded-full border-2 border-white transform translate-x-1/4 -translate-y-1/4">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
