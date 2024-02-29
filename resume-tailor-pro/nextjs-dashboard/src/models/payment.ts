import mongoose, { Schema, Document } from 'mongoose';

export interface Payment extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

const paymentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const PaymentModel = mongoose.model<Payment>('Payment', paymentSchema);

export default PaymentModel;
