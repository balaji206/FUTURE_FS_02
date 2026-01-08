const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "APEX_OMEGA_2026_PROTOCOL"; 

// --- DATABASE SCHEMA ---
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller'], required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('CONNECTED_TO_VAULT'))
  .catch((err) => console.log('VAULT_CONNECTION_ERROR', err));

// --- 1. SIGNUP ---
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body; // Expecting 'buyer' or 'seller'

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Identity_Already_In_Archive" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "Identity_Created" });
    } catch (err) {
        res.status(500).json({ error: "Database_Sync_Failure" });
    }
});

// --- 2. LOGIN ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, password, role } = req.body; // Expecting 'buyer' or 'seller'

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "Identity_Not_Found" });

        // STRICT ROLE CHECK
        // If DB role is 'seller' and user clicked 'buyer' (Operative) tab
        if (user.role !== role) {
            return res.status(403).json({ 
                error: `Access_Denied: This account is registered as a ${user.role.toUpperCase()}.` 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid_Passkey" });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });

        res.json({
            token,
            user: { name: user.name, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ error: "Auth_System_Failure" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`SYSTEM_ONLINE: PORT_${PORT}`));