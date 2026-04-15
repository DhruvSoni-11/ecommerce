import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderTrackingInfo, setOrderTrackingInfo] = useState(null);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (customerDetails) => {
    // Generate mock order info
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNo = `TRK${Math.floor(10000000 + Math.random() * 90000000)}`;
    const today = new Date();
    today.setDate(today.getDate() + 3); // Estimated 3 days from now
    
    const newOrderInfo = {
      orderId,
      trackingNo,
      customerDetails,
      items: [...cartItems],
      totalPrice: cartTotal,
      estimatedDelivery: today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      shippingProvider: 'Express Logistics',
      statusStep: 1, // 0: placed, 1: confirmed, 2: picked, 3: on way, 4: ready
    };

    setOrderTrackingInfo(newOrderInfo);
    clearCart();
    return newOrderInfo;
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    placeOrder,
    orderTrackingInfo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
