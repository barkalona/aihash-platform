import React from 'react';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { Marketplace } from './Marketplace';
import OrderBook from './OrderBook';
import MatchingEngine from './MatchingEngine';
import CreateOrder from './CreateOrder';
import { MarketOverview } from './MarketOverview';
import DutchAuction from './DutchAuction';
import ReputationAlgorithm from './ReputationAlgorithm';
import { NetworkStats } from './NetworkStats';
import { AIOptimization } from './AIOptimization';

export function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-['Clash Display']">Hash Power Marketplace</h1>
            <p className="text-gray-400 mt-2">Browse and purchase mining rigs with aiHash tokens</p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<Plus className="w-5 h-5" />}
            className="bg-green-500 hover:bg-green-600 flex items-center"
          >
            List Your Rig
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-grow order-2 lg:order-1 space-y-6">
            <OrderBook />
            <DutchAuction />
            <ReputationAlgorithm miners={[]} /> {/* Pass miners data as needed */}
            <CreateOrder />
            <OrderBook />
            <DutchAuction />
            <ReputationAlgorithm miners={[]} /> {/* Pass miners data as needed */}
            <CreateOrder />
            <OrderBook />
            <DutchAuction />
            <ReputationAlgorithm miners={[]} /> {/* Pass miners data as needed */}
            <MatchingEngine />
            <CreateOrder />
            <OrderBook />
            <DutchAuction />
            <ReputationAlgorithm miners={[]} /> {/* Pass miners data as needed */}
            <MatchingEngine />
            <CreateOrder />
            <OrderBook />
            <DutchAuction />
            <ReputationAlgorithm miners={[]} /> {/* Pass miners data as needed */}
            <Marketplace />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 order-1 lg:order-2 space-y-6">
            <MarketOverview />
            <NetworkStats />
            <AIOptimization />
          </div>
        </div>
      </div>
    </div>
  );
}
