import React from 'react';
import { Modal, InputNumber, Button, Form, Alert } from 'antd';
import { toast } from 'react-hot-toast';
import { useWallet } from '../../contexts/WalletContext';
import { ListingGrid } from './ListingGrid';

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

interface PurchaseModalProps {
  listing: Listing | null;
  visible: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => Promise<void>;
}

function generateMockListings(count: number): Listing[] {
  const algorithms = ['SHA-256', 'Ethash', 'Scrypt', 'RandomX'];
  const listings: Listing[] = [];

  for (let i = 0; i < count; i++) {
    const algorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    const hashPower = Math.floor(Math.random() * 900) + 100; // 100-1000 TH/s
    const pricePerTH = Number((Math.random() * 80 + 20).toFixed(2)); // $20-100 per TH/s
    
    listings.push({
      id: `listing-${i + 1}`,
      algorithm,
      hashPower,
      pricePerTH,
      minPurchase: Math.max(1, Math.floor(hashPower * 0.05)), // 5% of total
      maxPurchase: Math.floor(hashPower * 0.8), // 80% of total
      sellerAddress: `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      sellerRating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0-5.0 rating
      completedSales: Math.floor(Math.random() * 500), // 0-500 sales
    });
  }

  return listings;
}

function PurchaseModal({ listing, visible, onClose, onPurchase }: PurchaseModalProps) {
  const { isConnected } = useWallet();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet to complete the purchase');
      return;
    }

    try {
      const values = await form.validateFields();
      setLoading(true);
      await onPurchase(values.amount);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<span className="font-['Clash Display']">Purchase Hash Power</span>}
      open={visible}
      onCancel={onClose}
      className="dark-theme-modal"
      styles={{
        content: {
          background: '#1C2128',
          color: 'white',
        },
        header: {
          color: 'white',
          background: '#1C2128',
          borderBottom: '1px solid #30363D',
        },
        footer: {
          background: '#1C2128',
          borderTop: '1px solid #30363D',
        },
      }}
      footer={[
        <Button key="cancel" onClick={onClose} className="bg-[#1C2128] border-[#30363D]">
          Cancel
        </Button>,
        <Button
          key="purchase"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600"
        >
          {isConnected ? 'Confirm Purchase' : 'Connect Wallet to Purchase'}
        </Button>,
      ]}
    >
      {listing && (
        <div className="space-y-4">
          <div className="bg-[#0D1117] p-6 rounded-lg border border-[#30363D] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Algorithm</span>
              <span className="text-xl font-['Clash Display']">{listing.algorithm}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Price per TH/s</span>
              <span className="text-xl font-['Clash Display']">${listing.pricePerTH.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Available Power</span>
              <span className="text-xl font-['Clash Display']">{listing.hashPower} TH/s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Seller Rating</span>
              <span className="text-xl font-['Clash Display'] flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                {listing.sellerRating} ({listing.completedSales} sales)
              </span>
            </div>
          </div>

          <Form form={form} layout="vertical" className="[&_.ant-form-item-label>label]:!text-gray-400 [&_.ant-form-item-label>label]:!font-normal">
            <Form.Item
              name="amount"
              label="Purchase Amount (TH/s)"
              rules={[
                { required: true, message: 'Please enter purchase amount' },
                {
                  validator: (_, value) => {
                    if (value < listing.minPurchase) {
                      return Promise.reject(`Minimum purchase is ${listing.minPurchase} TH/s`);
                    }
                    if (value > listing.maxPurchase) {
                      return Promise.reject(`Maximum purchase is ${listing.maxPurchase} TH/s`);
                    }
                    if (value > listing.hashPower) {
                      return Promise.reject('Amount exceeds available hash power');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                min={listing.minPurchase}
                max={Math.min(listing.maxPurchase, listing.hashPower)}
                step={0.1}
                style={{ width: '100%' }}
                className="bg-[#1C2128] border-[#30363D] text-white [&_.ant-input-number-input]:text-white [&_.ant-input-number-handler-wrap]:bg-[#1C2128] [&_.ant-input-number-handler]:border-[#30363D] [&_.ant-input-number-handler:hover]:bg-[#30363D] [&_.ant-input-number]:!rounded-md"
              />
            </Form.Item>
          </Form>

          <Alert
            message={<span className="text-gray-400 text-sm">Estimated Total</span>}
            description={
              <div className="text-3xl font-bold font-['Clash Display'] mt-1">
                ${((form.getFieldValue('amount') || 0) * listing.pricePerTH).toFixed(2)}
              </div>
            }
            type="info"
            className="bg-[#1C2128] border-[#30363D] [&_.ant-alert-message]:!p-0 [&_.ant-alert-description]:!p-0 [&_.ant-alert-description]:mt-1"
          />

          {!isConnected && (
            <Alert
              message={<span className="font-['Clash Display']">Wallet Connection Required</span>}
              description={<span className="text-gray-400">Connect your wallet to complete the purchase using aiHash tokens.</span>}
              type="warning"
              showIcon
              className="bg-[#1C2128] border-[#30363D] [&_.ant-alert-message]:!p-0 [&_.ant-alert-description]:!p-0"
            />
          )}
        </div>
      )}
    </Modal>
  );
}

export function Marketplace() {
  const { isConnected } = useWallet();
  const [selectedListing, setSelectedListing] = React.useState<Listing | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = React.useState(false);

  // Generate 30 demo listings
  const [listings] = React.useState<Listing[]>(() => generateMockListings(30));

  const handlePurchase = async (amount: number) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      // TODO: Implement contract interaction
      console.log('Purchasing:', { listing: selectedListing, amount });
      toast.success('Purchase successful!');
      setShowPurchaseModal(false);
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Purchase failed');
    }
  };

  return (
    <div>
      <ListingGrid
        listings={listings}
        onPurchase={(listing) => {
          setSelectedListing(listing);
          setShowPurchaseModal(true);
        }}
      />

      <PurchaseModal
        listing={selectedListing}
        visible={showPurchaseModal}
        onClose={() => {
          setShowPurchaseModal(false);
          setSelectedListing(null);
        }}
        onPurchase={handlePurchase}
      />
    </div>
  );
}