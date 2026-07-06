"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
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
exports.default = router;
