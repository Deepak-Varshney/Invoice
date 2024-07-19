To implement date filtering in your `api/invoices/route.js` file in Next.js, you'll need to modify your existing routes to accept date parameters and filter invoices accordingly. Here's how you can adjust your `GET` function to support date filtering and return invoices within a specified date range:

### Updated `GET` Function with Date Filtering

```javascript
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import InvoiceModel from "@/models/invoiceModel";
import { startOfMonth, endOfDay } from 'date-fns';

export async function GET(request) {
    try {
        await connectDB();

        let startDate = startOfMonth(new Date()); // Default to start of current month
        let endDate = endOfDay(new Date()); // Default to end of current day

        // Check if startDate and endDate are provided in query parameters
        if (request.query.startDate && request.query.endDate) {
            startDate = new Date(request.query.startDate);
            endDate = new Date(request.query.endDate);
        }

        // Fetch invoices within the specified date range
        const invoices = await InvoiceModel.find({
            issueDate: {
                $gte: startDate,
                $lte: endDate
            }
        });

        return NextResponse.json({
            message: "Invoices fetched successfully",
            data: invoices
        }, {
            status: 200
        });

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch Invoices",
            error: error.message
        }, {
            status: 500
        });
    }
}
```

### Explanation:

1. **Date Filtering**: 
   - `startOfMonth(new Date())` and `endOfDay(new Date())` are used from `date-fns` to set default values for `startDate` and `endDate` to cover the current month.
   - If `startDate` and `endDate` are provided in the query parameters (`request.query.startDate` and `request.query.endDate`), these values override the defaults.

2. **Querying Invoices**: 
   - The `InvoiceModel.find()` method now includes a `issueDate` query to filter invoices based on the date range specified (`$gte` for greater than or equal to `startDate` and `$lte` for less than or equal to `endDate`).

### Frontend Integration

Ensure your frontend (React component) correctly sends HTTP GET requests to your API route with the appropriate date parameters. Here’s an example of how you might adjust your frontend code:

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InvoicesPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetchInvoices();
    }, [startDate, endDate]);

    const fetchInvoices = async () => {
        try {
            const response = await axios.get(`/api/invoices?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
            setInvoices(response.data.data); // Assuming response.data.data is where invoices are located
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    const handleDateRangeChange = () => {
        fetchInvoices();
    };

    return (
        <div className="container mx-auto mt-4">
            <div className="flex space-x-4 mb-4">
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDateRangeChange}>
                    Apply Date Range
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {invoices.map(invoice => (
                    <div key={invoice._id} className="border p-4">
                        <p>Invoice Number: {invoice.invoiceNumber}</p>
                        <p>Customer: {invoice.customer}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvoicesPage;
```

### Summary

- **Backend (`api/invoices/route.js`)**: Updated to include date filtering logic using `date-fns` and querying MongoDB accordingly.
- **Frontend (React Component)**: Sends HTTP GET requests with date parameters to fetch invoices within the specified date range and displays them dynamically.

Make sure your MongoDB schema (`InvoiceModel`) includes an `issueDate` field that stores invoice dates as `Date` objects for accurate querying based on date ranges. Adjust paths (`@/lib/db` and `@/models/invoiceModel`) according to your project's structure and module resolution setup in Next.js.
