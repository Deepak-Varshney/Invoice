'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Invoice {
  _id: string;
  invoiceNumber: string;
  customer: string;
  totalAmount: number;
  createdAt: Date;
}

const MyInvoiceTable: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('/api/invoices');
      setInvoices(response.data.data); // Assuming API response structure has { data: Invoice[] }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleViewInvoice = (id: string) => {
    // Example: Navigate to view invoice details page
    console.log(`View invoice with ID: ${id}`);
    // Implement navigation logic as per your app requirements
  };

  const handleEditInvoice = (id: string) => {
    // Example: Navigate to edit invoice page
    console.log(`Edit invoice with ID: ${id}`);
    // Implement navigation logic as per your app requirements
  };

  const handleDeleteInvoice = async (id: string) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this invoice?');
      if (confirmDelete) {
        const response = await axios.delete(`/api/invoices/${id}`);
        if (response.status === 200) {
          // Remove the deleted invoice from state or fetch invoices again to update the list
          fetchInvoices();
          alert('Invoice deleted successfully.');
        } else {
          alert('Failed to delete invoice.');
        }
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Failed to delete invoice.');
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.totalAmount}</td>
              <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleViewInvoice(invoice._id)}>View</button>
                <button onClick={() => handleEditInvoice(invoice._id)}>Edit</button>
                <button onClick={() => handleDeleteInvoice(invoice._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyInvoiceTable;
