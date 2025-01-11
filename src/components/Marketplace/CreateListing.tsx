import React from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { toast } from 'react-hot-toast';
import { useWallet } from '../../contexts/WalletContext';

const { Option } = Select;

interface CreateListingFormData {
  algorithm: string;
  hashPower: number;
  pricePerTH: number;
  minPurchase: number;
  maxPurchase: number;
}

export function CreateListing() {
  const { isConnected } = useWallet();
  const [form] = Form.useForm<CreateListingFormData>();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: CreateListingFormData) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement contract interaction
      console.log('Creating listing:', values);
      toast.success('Listing created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#1C2128] rounded-lg shadow-md border border-[#30363D]">
      <h2 className="text-2xl font-bold mb-6 font-['Clash Display']">Create Hash Power Listing</h2>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="algorithm"
          label="Mining Algorithm"
          rules={[{ required: true, message: 'Please select an algorithm' }]}
        >
          <Select placeholder="Select algorithm">
            <Option value="SHA-256">SHA-256 (Bitcoin)</Option>
            <Option value="Ethash">Ethash (Ethereum)</Option>
            <Option value="Scrypt">Scrypt (Litecoin)</Option>
            <Option value="RandomX">RandomX (Monero)</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="hashPower"
          label="Hash Power (TH/s)"
          rules={[{ required: true, message: 'Please enter hash power amount' }]}
        >
          <InputNumber
            min={0.1}
            step={0.1}
            style={{ width: '100%' }}
            placeholder="Enter hash power amount"
          />
        </Form.Item>

        <Form.Item
          name="pricePerTH"
          label="Price per TH/s (USD)"
          rules={[{ required: true, message: 'Please enter price per TH/s' }]}
        >
          <InputNumber
            min={0.01}
            step={0.01}
            style={{ width: '100%' }}
            placeholder="Enter price per TH/s"
          />
        </Form.Item>

        <Form.Item
          name="minPurchase"
          label="Minimum Purchase (TH/s)"
          rules={[{ required: true, message: 'Please enter minimum purchase amount' }]}
        >
          <InputNumber
            min={0.1}
            step={0.1}
            style={{ width: '100%' }}
            placeholder="Enter minimum purchase amount"
          />
        </Form.Item>

        <Form.Item
          name="maxPurchase"
          label="Maximum Purchase (TH/s)"
          rules={[{ required: true, message: 'Please enter maximum purchase amount' }]}
        >
          <InputNumber
            min={0.1}
            step={0.1}
            style={{ width: '100%' }}
            placeholder="Enter maximum purchase amount"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={!isConnected}
            className="w-full"
          >
            Create Listing
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
