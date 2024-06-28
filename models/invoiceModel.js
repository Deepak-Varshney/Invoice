import mongoose from 'mongoose';

const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  number: {
    type: String,
    required: true,
    unique: true, 
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the Customer model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  editedAt: {
    type: Date,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
});

const InvoiceModel = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);

export default InvoiceModel;
