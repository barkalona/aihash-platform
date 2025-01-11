import React from 'react';
import { Modal, InputNumber, Button, Form, Alert } from 'antd';
import { toast } from 'react-hot-toast';
import { useWallet } from '../../contexts/WalletContext';
import { CreateListing } from './CreateListing';
import { ListingGrid } from './ListingGrid';

interface Listing {
  id: string;
  algorithm: string;
  hashPower: number;
  pricePerTH: number;
  minPurchase: number;
  maxPurchase: number;
  sellerAddress: string;
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
    });
  }

  return listings;
}

function PurchaseModal({ listing, visible, onClose, onPurchase }: PurchaseModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
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
      title="Purchase Hash Power"
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
          Confirm Purchase
        </Button>,
      ]}
    >
      {listing && (
        <div className="space-y-4">
          <div className="bg-[#0D1117] p-4 rounded-lg border border-[#30363D]">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-400">Algorithm:</div>
              <div className="font-medium">{listing.algorithm}</div>
              <div className="text-gray-400">Price per TH/s:</div>
              <div className="font-medium">${listing.pricePerTH.toFixed(2)}</div>
              <div className="text-gray-400">Available Power:</div>
              <div className="font-medium">{listing.hashPower} TH/s</div>
            </div>
          </div>

          <Form form={form} layout="vertical">
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
                className="bg-[#1C2128] border-[#30363D]"
              />
            </Form.Item>
          </Form>

          <Alert
            message="Estimated Total"
            description={
              <div className="text-lg font-bold">
                ${((form.getFieldValue('amount') || 0) * listing.pricePerTH).toFixed(2)}
              </div>
            }
            type="info"
            className="bg-[#1C2128] border-[#30363D]"
          />
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
      {!isConnected && (
        <Alert
          message="Wallet Not Connected"
          description="Please connect your wallet to interact with the marketplace."
          type="warning"
          showIcon
          className="mb-8 bg-[#1C2128] border-[#30363D]"
        />
      )}

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