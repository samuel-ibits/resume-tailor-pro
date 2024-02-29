import PaymentModel, { Payment } from '../../models/payment';

export async function createPayment(paymentData: Partial<Payment>): Promise<Payment | null> {
  try {
    const payment = await PaymentModel.create(paymentData);
    return payment;
  } catch (error) {
    console.error('Error creating payment:', error);
    return null;
  }
}

// Implement other payment-related functions like getPaymentById, updatePayment, deletePayment, etc.
