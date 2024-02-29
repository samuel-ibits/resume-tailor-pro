import mongoose, { Schema, Document } from 'mongoose';

export interface Transaction extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  createdAt: Date;
}

const transactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const TransactionModel = mongoose.model<Transaction>('Transaction', transactionSchema);

export default TransactionModel;
