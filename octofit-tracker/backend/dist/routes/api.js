"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const Activity_1 = require("../models/Activity");
const Team_1 = require("../models/Team");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl, port: 8000 });
});
router.get('/users', async (_req, res) => {
    try {
        const users = await User_1.User.find().sort({ createdAt: -1 });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
router.post('/users', async (req, res) => {
    try {
        const user = await User_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create user', error });
    }
});
router.get('/activities', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('userId').sort({ createdAt: -1 });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
router.post('/activities', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create activity', error });
    }
});
router.get('/teams', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find().sort({ createdAt: -1 });
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
router.post('/teams', async (req, res) => {
    try {
        const team = await Team_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create team', error });
    }
});
router.get('/workouts', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().sort({ createdAt: -1 });
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
router.post('/workouts', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create workout', error });
    }
});
exports.default = router;
