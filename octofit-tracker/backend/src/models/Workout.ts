import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, default: 30 },
    category: { type: String, default: 'general' }
  },
  { timestamps: true }
);

export const Workout = mongoose.model('Workout', workoutSchema);
