"use client"
import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { FiPrinter } from "react-icons/fi";
import { BsLayoutTextWindow } from "react-icons/bs";

import { IoMdCloudDownload } from "react-icons/io";
import Script from 'next/script';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AccountForm, ProfileForm } from '@/components/forms/InvoiceForm';
// import {InvoiceForm} from '@/components/ui/form';

export default function page() {
    const [preview, setPreview] = useState(false)
    const [formData, setformData] = useState(
        {
            companyName: "",
            companyEmail: "",
            companyAddress: "",
            companyTel: "",
            clientName: "",
            clientCompany: "",
            clientAddress: "",
            clientEmail: "",
            clientTel: "",
            invoiceNumber: "",
            invoiceDate: "",
            invoiceDueDate: "",
        }
    )
    // console.log(formData)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log(e)
        const { name, value } = e.target;
        console.log(name, value)
        setformData({ ...formData, [name]: value, })
    }
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // console.log(e)
        e.preventDefault();
        console.log(formData)
    }
    return (
        <ScrollArea className="h-full">
            <div className="flex items-center justify-between m-10">
                <div className="flex gap-4">
                    <Button onClick={() => setPreview(!preview)}>
                        {
                            preview ? (
                                <div className='flex text-center items-center'>
                                    <BsLayoutTextWindow className='mr-2 text-2xl' />
                                    <span>Edit</span>
                                </div>
                            ) : (
                                <div className='flex text-center items-center'>
                                    <BsLayoutTextWindow className='mr-2 text-2xl' />
                                    <span>Preview</span>
                                </div>
                            )
                        }
                    </Button>
                    <Button>
                        <FiPrinter className='mr-2 text-2xl' />
                        <span>Print</span>
                    </Button>
                    <Button>
                        <IoMdCloudDownload className='mr-2 text-2xl' />
                        <span>Download</span>
                    </Button>
                </div>
                <div className="flex gap-4">
                    <Button className='text-purple-800'>
                        <IoMdCloudDownload className='mr-2 text-2xl' />
                        <span>Save Online</span>
                    </Button>
                    <Button className='text-purple-800'>
                        <CiMail className='mr-2 text-2xl' />
                        <span>Send</span>
                    </Button>
                </div>
            </div>
            {
                preview ? (<ScrollArea className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6" id="invoice">

                    <form onSubmit={handleFormSubmit}>
                        {/* company details */}
                        <div className="grid grid-cols-2 items-center">
                            <div>
                                {/* Company logo */}
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="company-logo" height="100" width="100" />
                            </div>
                            {/* Company Details */}
                            <div className="text-right">
                                <p className='text-gray-500'>
                                    <Input name='companyName' className='font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Company Name' onChange={handleInputChange} value={formData.companyName} />
                                </p>
                                <p className="text-gray-500 text-sm">
                                    <Input name='companyEmail' className='font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Company Email' onChange={handleInputChange} value={formData.companyEmail} />
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                    <Textarea rows={5} name='companyAddress' className='font-normal text-gray-700 border-none resize-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Company Address' onChange={handleInputChange} value={formData.companyAddress} />
                                    <Input name='companyTel' className='font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Tel: +91' onChange={handleInputChange} value={formData.companyTel} />
                                </p>

                            </div>
                        </div>

                        {/* Client info */}
                        <div className="grid grid-cols-2 items-center mt-8">
                            <div>
                                <p className="font-bold text-gray-800">
                                    Bill to :
                                </p>
                                <p className="text-gray-500">
                                    <Input name='clientName' className='font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Customer Name' onChange={handleInputChange} value={formData.clientName} />
                                </p>
                                <p className="text-gray-500">
                                    <Input name='clientCompany' className='font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Customer Company Name' onChange={handleInputChange} value={formData.clientCompany} />
                                </p>
                                <p className="text-gray-500">
                                    <Textarea rows={5} name='clientAddress' className='font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Customer Address' onChange={handleInputChange} value={formData.clientAddress} />
                                </p>
                                <p className="text-gray-500">
                                    <Input name='clientTel' className='font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Customer Number' onChange={handleInputChange} value={formData.clientTel} />
                                </p>
                                <p className="text-gray-500">
                                    <Input name='clientEmail' className='font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' placeholder='Customer Email Address' onChange={handleInputChange} value={formData.clientEmail} />
                                </p>
                            </div>
                            <div className="text-right ml-24 p-5">
                                <p className="text-gray-500 flex gap-1 items-center justify-items-start text-right">
                                    <label className="text-gray-500" htmlFor="invoiceNumber">Invoice#:
                                    </label>
                                    <Input id='invoiceNumber' name='invoiceNumber' placeholder='INV-2024' className=' font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' onChange={handleInputChange} value={formData.invoiceNumber} />
                                </p>
                                <p className="text-gray-500 flex gap-2 items-center justify-items-left text-right">
                                    <label className=" text-gray-500" htmlFor="invoiceDate">Invoice Date:
                                    </label>
                                    <Input id='invoiceDate' name='invoiceDate' placeholder='Type Date' type='date' className=' font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' onChange={handleInputChange} value={formData.invoiceDate} />
                                </p>
                                <p className="text-gray-500 flex gap-2 items-center justify-items-left text-right">
                                    <label className=" text-gray-500" htmlFor="invoiceDueDate">Due Date:
                                    </label>
                                    <Input id='invoiceDueDate' name='invoiceDueDate' placeholder='Enter Due Date' type='date' className=' font-normal text-gray-700 border-none placeholder:text-gray-600 placeholder:font-normal outline-none' onChange={handleInputChange} value={formData.invoiceDueDate} />
                                </p>
                            </div>
                        </div>

                        {/* Invoice Items */}
                        <div className="-mx-4 mt-8 flow-root sm:mx-0">
                            <table className="min-w-full">
                                <colgroup>
                                    <col className="w-full sm:w-1/2" />
                                    <col className="sm:w-1/6" />
                                    <col className="sm:w-1/6" />
                                    <col className="sm:w-1/6" />
                                </colgroup>
                                <thead className="border-b border-gray-300 text-gray-900">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Items</th>
                                        <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Quantity</th>
                                        <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Price</th>
                                        <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="font-medium text-gray-900">E-commerce Platform</div>
                                            <div className="mt-1 truncate text-gray-500">Laravel based e-commerce platform.</div>
                                        </td>
                                        <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">500.0</td>
                                        <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">$100.00</td>
                                        <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">$5,000.00</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="font-medium text-gray-900">Frontend Design</div>
                                            <div className="mt-1 truncate text-gray-500">Frontend design using Vue.js and Tailwind CSS.</div>
                                        </td>
                                        <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">500.0</td>
                                        <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">$100.00</td>
                                        <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">$5,000.00</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="font-medium text-gray-900">Shop SEO</div>
                                            <div className="mt-1 truncate text-gray-500">Website SEO and Social Media marketing.</div>
                                        </td>
                                        <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">50.0</td>
                                        <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">$100.00</td>
                                        <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">$500.00</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th scope="row" colSpan={3} className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Subtotal</th>
                                        <th scope="row" className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
                                        <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">$10,500.00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" colSpan={3} className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Tax</th>
                                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax</th>
                                        <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">$1,050.00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" colSpan={3} className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Discount</th>
                                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Discount</th>
                                        <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">- 10%</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" colSpan={3} className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Total</th>
                                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
                                        <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">$11,550.00</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
                            Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </ScrollArea >) :
                    (
                        <div>
                            <h1>Invoice Form</h1>
                            <ProfileForm />
                        </div>
                    )
            }
        </ScrollArea>
    )

}