import mongoose, { Schema, Document } from 'mongoose';

export interface Profile extends Document {
    
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  category: string;
  role: string;
  description: string;
  resume: number;
  activity: string;

  // Add other profile fields as needed
}

const profileSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  category: { type: String, required: true },
  role: { type: String, required: true },
  description:{ type: String },
  resume: { type: Number},
  activity: { type: String },
  // Define other profile fields
});

const ProfileModel = mongoose.model<Profile>('Profile', profileSchema);

export default ProfileModel;
