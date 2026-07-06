import mongoose from 'mongoose';
import { User } from '../models/User';
import { Activity } from '../models/Activity';
import { Team } from '../models/Team';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Activity.deleteMany({});
    await Team.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.create([
      { name: 'Ava', email: 'ava@example.com', age: 15, fitnessLevel: 'intermediate', points: 120, team: 'Blue' },
      { name: 'Noah', email: 'noah@example.com', age: 16, fitnessLevel: 'advanced', points: 180, team: 'Green' }
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'Run', durationMinutes: 30, caloriesBurned: 240, notes: 'Morning jog' },
      { userId: users[1]._id, type: 'Strength', durationMinutes: 45, caloriesBurned: 300, notes: 'Weight training' }
    ]);

    await Team.create([
      { name: 'Blue', captain: 'Ava', members: ['Ava', 'Mia'], points: 120 },
      { name: 'Green', captain: 'Noah', members: ['Noah', 'Leo'], points: 180 }
    ]);

    await Workout.create([
      { title: 'Cardio Blast', description: 'A quick endurance workout', difficulty: 'beginner', durationMinutes: 20, category: 'cardio' },
      { title: 'Power Circuit', description: 'A high-intensity strength workout', difficulty: 'advanced', durationMinutes: 40, category: 'strength' }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
