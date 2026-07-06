import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, min: 10, max: 100 },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    points: { type: Number, default: 0 },
    team: { type: String, default: 'unassigned' }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
