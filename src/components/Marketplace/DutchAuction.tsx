import React, { useState } from 'react';

interface Auction {
  id: string;
  startingPrice: number;
  currentPrice: number;
  decrement: number;
  duration: number; // in seconds
}

const DutchAuction: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const startAuction = (auction: Auction) => {
    setAuctions([...auctions, auction]);
    // Logic to handle auction timing and price decrement can be added here
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold font-display mb-4">Dutch Auction</h2>
      <ul className="space-y-2">
        {auctions.map((auction) => (
          <li key={auction.id} className="bg-gray-800 p-4 rounded-md">
            Starting Price: ${auction.startingPrice} | Current Price: ${auction.currentPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DutchAuction;