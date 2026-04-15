import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, Navigate } from 'react-router';
import { CheckCircle2, PackageSearch, Truck, Home, ArrowRight } from 'lucide-react';

export const OrderTracking = () => {
  const { orderTrackingInfo } = useCart();

  if (!orderTrackingInfo) {
    return <Navigate to="/" />;
  }

  const { orderId, trackingNo, totalPrice, estimatedDelivery, statusStep, items } = orderTrackingInfo;

  const steps = [
    { name: 'Order Confirmed', icon: CheckCircle2, description: 'We have received your order.' },
    { name: 'Picked by courier', icon: PackageSearch, description: 'Order is packed and picked up.' },
    { name: 'On the way', icon: Truck, description: 'Your order is on the way.' },
    { name: 'Ready for pickup', icon: Home, description: 'Arriving soon.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden relative">
        {/* Header Ribbon */}
        <div className="bg-purple-600 px-8 py-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left text-white">
              <h1 className="text-3xl font-extrabold mb-1 tracking-tight">Order Successful!</h1>
              <p className="text-purple-100 opacity-90">Thank you for your purchase.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white min-w-[200px] text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-purple-200 mb-1">Expected Delivery</p>
              <p className="text-2xl font-bold">{estimatedDelivery}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-b border-gray-100 pb-12">
            <div>
               <p className="text-sm text-gray-500 font-medium mb-1">Order Number</p>
               <p className="text-lg font-bold text-gray-900">{orderId}</p>
            </div>
            <div>
               <p className="text-sm text-gray-500 font-medium mb-1">Tracking Number</p>
               <p className="text-lg font-bold text-purple-600">{trackingNo}</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-10">Tracking Status</h2>
            <div className="relative">
              {/* Progress Bar Background */}
              <div className="absolute top-6 left-0 w-full h-1.5 bg-gray-100 rounded-full select-none" />
              {/* Progress Bar Fill */}
              <div 
                className="absolute top-6 left-0 h-1.5 bg-purple-600 rounded-full transition-all duration-1000 ease-out select-none"
                style={{ width: `${(statusStep / (steps.length - 1)) * 100}%` }}
              />

              <div className="relative flex justify-between">
                {steps.map((step, index) => {
                  const isCompleted = index <= statusStep;
                  const isCurrent = index === statusStep;
                  const Icon = step.icon;

                  return (
                    <div key={step.name} className="flex flex-col items-center w-1/4 group">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 z-10 transition-colors duration-500 ${
                          isCompleted ? 'bg-purple-600 border-white text-white shadow-lg shadow-purple-200' : 'bg-white border-gray-200 text-gray-300'
                        }`}
                      >
                        <Icon size={20} className={isCurrent ? 'animate-pulse' : ''} />
                      </div>
                      <div className="mt-4 text-center">
                        <p className={`text-sm font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                          {step.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 hidden sm:block px-2">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                   <div className="flex items-center gap-4">
                     <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                     <div>
                       <p className="font-bold text-gray-900">{item.name}</p>
                       <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                     </div>
                   </div>
                   <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">Total Paid</span>
              <span className="text-2xl font-black text-purple-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-bold group">
              Continue Shopping 
              <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
