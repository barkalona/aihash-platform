import React from 'react';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { Marketplace } from './Marketplace';
import { MarketOverview } from './MarketOverview';
import { NetworkStats } from './NetworkStats';
import { AIOptimization } from './AIOptimization';

export function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-['Clash Display']">Hash Power Marketplace</h1>
        <Button
          type="primary"
          size="large"
          icon={<Plus className="w-5 h-5" />}
          className="bg-green-500 hover:bg-green-600 flex items-center"
        >
          Create Listing
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          <Marketplace />
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <MarketOverview />
          <NetworkStats />
          <AIOptimization />
        </div>
      </div>
    </div>
  );
}
