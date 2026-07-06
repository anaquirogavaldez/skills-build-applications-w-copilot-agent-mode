"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Activity_1 = require("../models/Activity");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await User_1.User.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        const users = await User_1.User.create([
            { name: 'Ava', email: 'ava@example.com', age: 15, fitnessLevel: 'intermediate', points: 120, team: 'Blue' },
            { name: 'Noah', email: 'noah@example.com', age: 16, fitnessLevel: 'advanced', points: 180, team: 'Green' }
        ]);
        await Activity_1.Activity.create([
            { userId: users[0]._id, type: 'Run', durationMinutes: 30, caloriesBurned: 240, notes: 'Morning jog' },
            { userId: users[1]._id, type: 'Strength', durationMinutes: 45, caloriesBurned: 300, notes: 'Weight training' }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
