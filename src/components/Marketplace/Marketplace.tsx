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
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="purchase"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Confirm Purchase
        </Button>,
      ]}
    >
      {listing && (
        <div className="space-y-4">
          <div className="bg-[#0D1117] p-4 rounded-lg border border-[#30363D]">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600">Algorithm:</div>
              <div className="font-medium">{listing.algorithm}</div>
              <div className="text-gray-600">Price per TH/s:</div>
              <div className="font-medium">${listing.pricePerTH.toFixed(2)}</div>
              <div className="text-gray-600">Available Power:</div>
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
  const [showCreateListing, setShowCreateListing] = React.useState(false);

  // Mock data for development
  const [listings] = React.useState<Listing[]>([
    {
      id: '1',
      algorithm: 'SHA-256',
      hashPower: 100,
      pricePerTH: 50,
      minPurchase: 1,
      maxPurchase: 50,
      sellerAddress: '0x1234...5678',
    },
    {
      id: '2',
      algorithm: 'Ethash',
      hashPower: 75,
      pricePerTH: 65,
      minPurchase: 0.5,
      maxPurchase: 30,
      sellerAddress: '0x8765...4321',
    },
  ]);

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
    <div className="container mx-auto py-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-['Clash Display']">Hash Power Marketplace</h1>
        <Button
          type="primary"
          onClick={() => setShowCreateListing(!showCreateListing)}
        >
          {showCreateListing ? 'View Listings' : 'Create Listing'}
        </Button>
      </div>

      {!isConnected && (
        <Alert
          message="Wallet Not Connected"
          description="Please connect your wallet to interact with the marketplace."
          type="warning"
          showIcon
          className="mb-8"
        />
      )}

      {showCreateListing ? (
        <CreateListing />
      ) : (
        <ListingGrid
          listings={listings}
          onPurchase={(listing) => {
            setSelectedListing(listing);
            setShowPurchaseModal(true);
          }}
        />
      )}

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