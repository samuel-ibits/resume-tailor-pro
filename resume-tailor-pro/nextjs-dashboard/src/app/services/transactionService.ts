import TransactionModel, { Transaction } from '../../models/transaction';

export async function createTransaction(transactionData: Partial<Transaction>): Promise<Transaction | null> {
  try {
    const transaction = await TransactionModel.create(transactionData);
    return transaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    return null;
  }
}

// Implement other transaction-related functions like getTransactionById, updateTransaction, deleteTransaction, etc.
