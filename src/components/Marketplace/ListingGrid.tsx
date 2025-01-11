import React from 'react';
import { Card, Tag, Button, Select, Empty } from 'antd';
import { ArrowUpDown } from 'lucide-react';

const { Option } = Select;

interface Listing {
  id: string;
  algorithm: string;
  hashPower: number;
  pricePerTH: number;
  minPurchase: number;
  maxPurchase: number;
  sellerAddress: string;
}

interface ListingGridProps {
  listings: Listing[];
  onPurchase: (listing: Listing) => void;
}

const algorithmColors = {
  'SHA-256': '#FF9800',
  'Ethash': '#2196F3',
  'Scrypt': '#4CAF50',
  'RandomX': '#9C27B0',
};

export function ListingGrid({ listings, onPurchase }: ListingGridProps) {
  const [sortBy, setSortBy] = React.useState<'price' | 'power'>('price');
  const [filterAlgorithm, setFilterAlgorithm] = React.useState<string | null>(null);

  const filteredAndSortedListings = React.useMemo(() => {
    let result = [...listings];
    
    // Apply algorithm filter
    if (filterAlgorithm) {
      result = result.filter(listing => listing.algorithm === filterAlgorithm);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'price') {
        return a.pricePerTH - b.pricePerTH;
      }
      return b.hashPower - a.hashPower;
    });

    return result;
  }, [listings, filterAlgorithm, sortBy]);

  const handlePurchase = (listing: Listing) => {
    onPurchase(listing);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-['Clash Display']">Available Hash Power</h2>
        
        <div className="flex gap-4">
          <Select
            placeholder="Filter by Algorithm"
            allowClear
            style={{ width: 200 }}
            onChange={value => setFilterAlgorithm(value)}
          >
            <Option value="SHA-256">SHA-256 (Bitcoin)</Option>
            <Option value="Ethash">Ethash (Ethereum)</Option>
            <Option value="Scrypt">Scrypt (Litecoin)</Option>
            <Option value="RandomX">RandomX (Monero)</Option>
          </Select>

          <Button
            onClick={() => setSortBy(prev => prev === 'price' ? 'power' : 'price')}
            icon={<ArrowUpDown className="w-4 h-4" />}
          >
            Sort by {sortBy === 'price' ? 'Price' : 'Power'}
          </Button>
        </div>
      </div>

      {filteredAndSortedListings.length === 0 ? (
        <Empty
          description="No listings found"
          className="mt-8"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedListings.map(listing => (
            <Card
              key={listing.id}
              className="hover:shadow-lg transition-shadow bg-[#1C2128] border-[#30363D]"
              style={{ color: 'inherit' }}
            >
              <div className="flex justify-between items-start mb-4">
                <Tag color={algorithmColors[listing.algorithm as keyof typeof algorithmColors]}>
                  {listing.algorithm}
                </Tag>
                <div className="text-right">
                  <div className="text-lg font-bold">${listing.pricePerTH.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">per TH/s</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Power:</span>
                  <span className="font-medium">{listing.hashPower} TH/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Purchase:</span>
                  <span className="font-medium">{listing.minPurchase} TH/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Purchase:</span>
                  <span className="font-medium">{listing.maxPurchase} TH/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seller:</span>
                  <span className="font-medium truncate ml-2" style={{ maxWidth: '180px' }}>
                    {listing.sellerAddress}
                  </span>
                </div>
              </div>

              <Button
                type="primary"
                block
                onClick={() => handlePurchase(listing)}
              >
                Purchase Hash Power
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}