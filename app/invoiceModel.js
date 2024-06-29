import mongoose, { Schema, models } from 'mongoose';

const InvoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: [true, 'Invoice number is required'],
      unique: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer ID is required'],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product ID is required'],
        },
        quantity: {
          type: Number,
          required: [true, 'Product quantity is required'],
        },
      },
    ],
    totalAmount: {
      type: Number
      // required: [true, 'Total amount is required'],
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'paid', 'cancelled'],
      default: 'draft',
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const InvoiceModel = models.invoice || mongoose.model('invoice', InvoiceSchema);

export default InvoiceModel;
