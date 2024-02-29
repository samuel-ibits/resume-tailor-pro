import mongoose, { Schema, Document } from 'mongoose';

export interface Notification extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const NotificationModel = mongoose.model<Notification>('Notification', notificationSchema);

export default NotificationModel;
