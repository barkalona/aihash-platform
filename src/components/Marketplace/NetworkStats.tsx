import React from 'react';

interface NetworkStat {
  icon: string;
  label: string;
  value: string;
}

interface Algorithm {
  name: string;
  hashRate: string;
}

export function NetworkStats() {
  const stats: NetworkStat[] = [
    {
      icon: '⚡',
      label: 'Total Hash Power',
      value: '12.5 EH/s',
    },
    {
      icon: '👥',
      label: 'DAO Members',
      value: '8,234',
    },
    {
      icon: '🌱',
      label: 'Green Energy',
      value: '76%',
    },
  ];

  const algorithms: Algorithm[] = [
    {
      name: 'SHA-256',
      hashRate: '6.29 TH/s',
    },
    {
      name: 'Ethash',
      hashRate: '168.14 TH/s',
    },
    {
      name: 'Scrypt',
      hashRate: '553.82 TH/s',
    },
  ];

  return (
    <div className="bg-[#1C2128] rounded-lg p-6 border border-[#30363D]">
      <h2 className="text-2xl font-['Clash Display'] mb-6">Network Stats</h2>
      
      <div className="space-y-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-gray-400">{stat.label}</span>
            </div>
            <span className="text-lg font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-['Clash Display'] mb-4">Top Algorithms</h3>
      <div className="space-y-4">
        {algorithms.map((algo) => (
          <div key={algo.name} className="flex items-center justify-between">
            <span className="text-gray-400">{algo.name}</span>
            <span className="text-lg font-semibold">{algo.hashRate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}