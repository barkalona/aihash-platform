import React from 'react';

interface MarketStat {
  label: string;
  value: string | number;
  change: number;
}

export function MarketOverview() {
  const stats: MarketStat[] = [
    {
      label: '24h Volume',
      value: '1,234.56 BTC',
      change: 8.12,
    },
    {
      label: 'Active Miners',
      value: '2,345',
      change: 12.3,
    },
    {
      label: 'AI Optimization Savings',
      value: '15.4%',
      change: 2.1,
    },
  ];

  return (
    <div className="bg-[#1C2128] rounded-lg p-6 border border-[#30363D]">
      <h2 className="text-2xl font-['Clash Display'] mb-6">Market Overview</h2>
      <div className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-gray-400 text-sm mb-1">{stat.label}</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className={`flex items-center ${stat.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <span className="text-lg">
                  {stat.change >= 0 ? '↗' : '↘'} {Math.abs(stat.change)}%
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
