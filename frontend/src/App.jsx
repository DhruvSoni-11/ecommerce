import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AddProduct } from './pages/AddProduct';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/tracking" element={<OrderTracking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-product" element={<AddProduct />} />
              </Routes>
            </main>
            {/* Simple footer */}
            <footer className="bg-white border-t border-gray-100 py-8 text-center text-gray-400 text-sm">
              <div className="max-w-7xl mx-auto px-4">
                &copy; {new Date().getFullYear()} LumiShop eCommerce. All rights reserved.
              </div>
            </footer>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;