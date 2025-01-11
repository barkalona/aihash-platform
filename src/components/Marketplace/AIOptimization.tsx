import React from 'react';

interface OptimizationMetric {
  icon: string;
  label: string;
  value: string;
  change: number;
}

export function AIOptimization() {
  const metrics: OptimizationMetric[] = [
    {
      icon: '🧠',
      label: 'AI Efficiency Score',
      value: '94.2%',
      change: 2.3,
    },
    {
      icon: '⚡',
      label: 'Power Optimization',
      value: '87.5%',
      change: 1.8,
    },
    {
      icon: '📈',
      label: 'Profit Prediction',
      value: '+12.4%',
      change: 3.2,
    },
    {
      icon: '🔄',
      label: 'Hash Rate Utilization',
      value: '96.8%',
      change: 0.5,
    },
  ];

  const timeRemaining = '04:32';

  return (
    <div className="bg-[#1C2128] rounded-lg p-6 border border-[#30363D]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-['Clash Display']">AI Optimization</h2>
        <span className="px-3 py-1 bg-[#0D1117] text-green-400 rounded-full text-sm">
          Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-[#0D1117] rounded-lg p-4 border border-[#30363D]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{metric.icon}</span>
              <span className="text-gray-400 text-sm">{metric.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span className={`text-sm ${metric.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change >= 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Next Optimization in</span>
          <span>{timeRemaining}</span>
        </div>
        <div className="w-full bg-[#0D1117] rounded-full h-2">
          <div
            className="bg-green-400 h-2 rounded-full"
            style={{ width: '75%' }}
          />
        </div>
      </div>
    </div>
  );
}