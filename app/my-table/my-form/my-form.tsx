'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  costPrice: number;
  sellingPrice: number;
}

interface Customer {
  _id: string;
  name: string;
}

export function AddInvoiceForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchProduct, setSearchProduct] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/customers');
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSearchProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
    setSelectedProduct(null);
  };

  const handleSearchCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCustomer(e.target.value);
    setSelectedCustomer(null);
  };

  const handleProductSelect = (productId: string) => {
    const selected = products.find(product => product._id === productId);
    if (selected) {
      setSelectedProduct(selected);
    }
  };

  const handleCustomerSelect = (customerId: string) => {
    const selected = customers.find(customer => customer._id === customerId);
    if (selected) {
      setSelectedCustomer(selected);
      setSearchCustomer('');
    }
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      setSelectedProducts([...selectedProducts, selectedProduct]);
      setSelectedProduct(null);
      setSearchProduct('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const invoiceData = {
      invoiceNumber,
      customer: selectedCustomer?._id,
      products: selectedProducts.map(product => product._id),
      issueDate: invoiceDate,
      dueDate,
    };
    try {
      const response = await axios.post('http://localhost:3000/api/invoices', invoiceData);
      console.log('Invoice created successfully:', response.data);
      // Reset form
      setInvoiceNumber('');
      setSelectedCustomer(null);
      setSelectedProducts([]);
      setInvoiceDate('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer</label>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchCustomer}
            onChange={handleSearchCustomerChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {searchCustomer && (
            <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
              {customers
                .filter(customer => customer.name.toLowerCase().includes(searchCustomer.toLowerCase()))
                .map(customer => (
                  <li
                    key={customer._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleCustomerSelect(customer._id)}
                  >
                    {customer.name}
                  </li>
                ))}
            </ul>
          )}
          {selectedCustomer && (
            <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded-md">
              Selected Customer: {selectedCustomer.name}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Products</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchProduct}
            onChange={handleSearchProductChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {searchProduct && (
            <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
              {products
                .filter(product => product.name.toLowerCase().includes(searchProduct.toLowerCase()))
                .map(product => (
                  <li
                    key={product._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleProductSelect(product._id)}
                  >
                    {product.name}
                  </li>
                ))}
            </ul>
          )}
          {selectedProduct && (
            <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded-md">
              <h2 className="text-lg font-semibold">{selectedProduct.name}</h2>
              <p>Cost Price: ${selectedProduct.costPrice}</p>
              <p>Selling Price: ${selectedProduct.sellingPrice}</p>
              <button
                type="button"
                className="mt-2 p-2 bg-green-500 text-white rounded-md"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          )}
        </div>
        {selectedProducts.length > 0 && (
          <div className="mt-4 bg-white border border-gray-300 rounded-md p-4">
            <h2 className="text-lg font-semibold">Selected Products</h2>
            <ul className="mt-2">
              {selectedProducts.map(product => (
                <li key={product._id}>
                  {product.name} - ${product.sellingPrice}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Date</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Display Invoice Data before submission */}
        <div className="mt-4 bg-white border border-gray-300 rounded-md p-4">
          <h2 className="text-lg font-semibold">Invoice Data</h2>
          {selectedCustomer && (
            <div className="mt-2">
              <strong>Customer:</strong> {selectedCustomer.name}
            </div>
          )}
          {selectedProducts.length > 0 && (
            <div className="mt-2">
              <strong>Selected Products:</strong>
              <ul>
                {selectedProducts.map(product => (
                  <li key={product._id}>
                    {product.name} - ${product.sellingPrice}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-2">
            <strong>Invoice Number:</strong> {invoiceNumber}
          </div>
          <div className="mt-2">
            <strong>Invoice Date:</strong> {invoiceDate}
          </div>
          <div className="mt-2">
            <strong>Due Date:</strong> {dueDate}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          disabled={!selectedCustomer || selectedProducts.length === 0 || !invoiceNumber || !invoiceDate || !dueDate}
        >
          Add Invoice
        </button>
      </form>
    </div>
  );
}
