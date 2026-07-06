import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    captain: { type: String, default: '' },
    members: [{ type: String, trim: true }],
    points: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Team = mongoose.model('Team', teamSchema);
