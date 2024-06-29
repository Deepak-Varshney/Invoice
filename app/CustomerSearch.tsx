// components/customersearch.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Customer {
  _id: string;
  name: string;
}

interface CustomerSearchProps {
  onSelect: (customer: Customer) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Customer[]>([]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      // Fetch customers based on search term
      axios.get(`http://localhost:3000/api/customers?search=${searchTerm}`).then((response) => {
        setSearchResults(response.data.data); // Assuming the structure of your customers API response
      }).catch((error) => {
        console.error('Error fetching customers:', error);
        setSearchResults([]);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSelectCustomer = (customer: Customer) => {
    onSelect(customer);
    setSearchTerm(''); // Clear search term after selection
    setSearchResults([]); // Clear search results after selection
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Customer"
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
      />
      {searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
          {searchResults.map((customer) => (
            <div
              key={customer._id}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => handleSelectCustomer(customer)}
            >
              {customer.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;
