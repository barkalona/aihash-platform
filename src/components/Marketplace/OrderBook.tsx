import React from 'react';

interface Order {
  id: string;
  type: 'buy' | 'sell';
  hashRate: number;
  price: number;
  duration: number;
}

const OrderBook: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);

  // Example function to add an order
  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold font-display mb-4">Order Book</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="bg-gray-800 p-4 rounded-md">
            {order.type} {order.hashRate} TH/s at ${order.price} for {order.duration} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderBook;