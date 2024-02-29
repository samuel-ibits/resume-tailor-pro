import mongoose, { Schema, Document } from 'mongoose';

export interface Resume extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const resumeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ResumeModel = mongoose.model<Resume>('Resume', resumeSchema);

export default ResumeModel;
