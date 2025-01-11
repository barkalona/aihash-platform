import React from 'react';

const MatchingEngine: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold font-display mb-4">Matching Engine</h2>
      <p className="mb-2">This section visualizes how the matching algorithm works:</p>
      <ul className="list-disc list-inside">
        <li>Buyers post orders specifying their requirements.</li>
        <li>Miners post offers detailing their resources.</li>
        <li>Orders are matched based on price and reputation.</li>
      </ul>
      <h3 className="text-xl font-semibold mt-4">Dutch Auction Mechanism</h3>
      <p>Prices start high and decrease until a match is found, ensuring fair pricing for both parties.</p>
      <h3 className="text-xl font-semibold mt-4">Reputation-Weighted Matching</h3>
      <p>Miners with higher reputation scores are prioritized in the matching process.</p>
    </div>
  );
};

export default MatchingEngine;