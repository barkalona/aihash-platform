import React from 'react';

interface Miner {
  id: string;
  reputationScore: number; // Higher is better
  hashRate: number;
}

const ReputationAlgorithm: React.FC<{ miners: Miner[] }> = ({ miners }) => {
  const sortedMiners = miners.sort((a, b) => b.reputationScore - a.reputationScore);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold font-display mb-4">Reputation-Weighted Miners</h2>
      <ul className="space-y-2">
        {sortedMiners.map((miner) => (
          <li key={miner.id} className="bg-gray-800 p-4 rounded-md">
            Miner ID: {miner.id} | Reputation: {miner.reputationScore} | Hash Rate: {miner.hashRate} TH/s
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReputationAlgorithm;