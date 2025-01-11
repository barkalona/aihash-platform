import React from 'react';
import { Card, Tag, Button, Select, Empty, Input, Radio } from 'antd';
import { ArrowUpDown, Search, LayoutGrid, List, Star } from 'lucide-react';

const { Option } = Select;
const { Search: SearchInput } = Input;

interface Listing {
  id: string;
  algorithm: string;
  hashPower: number;
  pricePerTH: number;
  minPurchase: number;
  maxPurchase: number;
  sellerAddress: string;
  sellerRating: number;
  completedSales: number;
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
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState<'price' | 'power' | 'rating'>('price');
  const [filterAlgorithm, setFilterAlgorithm] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredAndSortedListings = React.useMemo(() => {
    let result = [...listings];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(listing => 
        listing.algorithm.toLowerCase().includes(query)
      );
    }

    // Apply algorithm filter
    if (filterAlgorithm) {
      result = result.filter(listing => listing.algorithm === filterAlgorithm);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerTH - b.pricePerTH;
        case 'power':
          return b.hashPower - a.hashPower;
        case 'rating':
          return b.sellerRating - a.sellerRating;
        default:
          return 0;
      }
    });

    return result;
  }, [listings, filterAlgorithm, sortBy, searchQuery]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-['Clash Display']">Available Hash Power</h2>
        <div className="flex items-center gap-4">
          <Radio.Group 
            value={viewMode}
            onChange={e => setViewMode(e.target.value)}
            className="bg-[#1C2128] p-1 rounded-lg"
          >
            <Radio.Button value="grid" className="bg-transparent border-none">
              <LayoutGrid className="w-4 h-4" />
            </Radio.Button>
            <Radio.Button value="list" className="bg-transparent border-none">
              <List className="w-4 h-4" />
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SearchInput
          placeholder="Search by algorithm..."
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-grow"
          prefix={<Search className="w-4 h-4 text-gray-400" />}
        />
        <Select
          placeholder="Filter by Algorithm"
          allowClear
          style={{ width: 200 }}
          onChange={value => setFilterAlgorithm(value)}
          className="bg-[#1C2128]"
        >
          <Option value="SHA-256">SHA-256 (Bitcoin)</Option>
          <Option value="Ethash">Ethash (Ethereum)</Option>
          <Option value="Scrypt">Scrypt (Litecoin)</Option>
          <Option value="RandomX">RandomX (Monero)</Option>
        </Select>

        <Select
          value={sortBy}
          style={{ width: 150 }}
          onChange={value => setSortBy(value)}
          className="bg-[#1C2128]"
        >
          <Option value="price">Sort by Price</Option>
          <Option value="power">Sort by Power</Option>
          <Option value="rating">Sort by Rating</Option>
        </Select>
      </div>

      <div className="mt-8">
        {filteredAndSortedListings.length === 0 ? (
          <Empty
            description="No listings found"
            className="mt-8"
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <div className="text-2xl font-bold">${listing.pricePerTH.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">per TH/s</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Available Power:</span>
                    <span className="font-medium">{listing.hashPower} TH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Min Purchase:</span>
                    <span className="font-medium">{listing.minPurchase} TH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Purchase:</span>
                    <span className="font-medium">{listing.maxPurchase} TH/s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Seller Rating:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {listing.sellerRating} ({listing.completedSales})
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="primary"
                    block
                    onClick={() => onPurchase(listing)}
                    className="flex-grow bg-green-500 hover:bg-green-600"
                  >
                    Buy Now
                  </Button>
                  <Button
                    className="bg-[#1C2128] border-[#30363D] hover:border-[#6E7681]"
                  >
                    Schedule
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedListings.map(listing => (
              <div 
                key={listing.id}
                className="flex items-center justify-between p-4 bg-[#1C2128] border border-[#30363D] rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-6 flex-grow">
                  <Tag color={algorithmColors[listing.algorithm as keyof typeof algorithmColors]}>
                    {listing.algorithm}
                  </Tag>
                  <div className="flex gap-8">
                    <div>
                      <div className="text-sm text-gray-400">Available Power</div>
                      <div className="font-medium">{listing.hashPower} TH/s</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Price per TH/s</div>
                      <div className="font-medium">${listing.pricePerTH.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Seller Rating</div>
                      <div className="font-medium flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {listing.sellerRating} ({listing.completedSales})
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    onClick={() => onPurchase(listing)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Buy Now
                  </Button>
                  <Button
                    className="bg-[#1C2128] border-[#30363D] hover:border-[#6E7681]"
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}