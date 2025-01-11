import React, { useState } from 'react';

const CreateOrder: React.FC = () => {
  const [hashRate, setHashRate] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the order to the backend
    console.log({ hashRate, duration, price });
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold font-display mb-4">Create Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Hash Rate (TH/s)</label>
          <input
            type="number"
            value={hashRate}
            onChange={(e) => setHashRate(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Duration (hours)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Price per TH/s</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <button type="submit" className="w-full bg-primary text-background py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;