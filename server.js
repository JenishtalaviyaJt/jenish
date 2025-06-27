const express = require('express');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const app = express();

// Set port for production and development
const PORT = process.env.PORT || 3000;

// Enable trust proxy for secure headers behind reverse proxy
app.set('trust proxy', 1);

// Admin credentials (in production, use environment variables)
const ADMIN_USERNAME = 'jenishtalaviya';
// Hashed password for 'qmqb82004'
const ADMIN_PASSWORD_HASH = '$2b$10$OBZeGTchmimW6pVXosGbfOtNG/RK9xDszFTq.cXdvqFlIt035FeGa';

// Middleware
app.use(express.static(__dirname));
app.use(express.json({ limit: '10kb' }));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Simple in-memory store (replace with proper database in production)
const visitors = new Map();

// Handle form submissions
app.post('/submit-registration', (req, res) => {
    try {
        // Validate required fields
        const { fullName, email, phone, interestedIn } = req.body;
        if (!fullName || !email || !phone || !interestedIn) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Generate unique ID for visitor
        const visitorId = crypto.randomUUID();

        // Store visitor data with timestamp
        const visitorData = {
            id: visitorId,
            fullName,
            email,
            phone,
            interestedIn,
            timestamp: new Date().toISOString(),
        };

        // Save to in-memory store (replace with database in production)
        visitors.set(visitorId, visitorData);

        // Return success without exposing other visitors' data
        res.json({
            success: true,
            message: 'Registration received successfully',
            visitorId
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration'
        });
    }
});

// Basic authentication middleware
const authenticateAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            res.setHeader('WWW-Authenticate', 'Basic');
            return res.status(401).json({ message: 'Authentication required' });
        }

        const credentials = Buffer.from(authHeader.split(' ')[1], 'base64')
            .toString()
            .split(':');

        const username = credentials[0];
        const password = credentials[1];

        if (username !== ADMIN_USERNAME) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
};

// Admin endpoint to get all visitors
app.get('/admin/visitors', authenticateAdmin, (req, res) => {
    try {
        const visitorList = Array.from(visitors.values());
        res.json({
            success: true,
            visitors: visitorList
        });
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch visitor data'
        });
    }
});

// Admin panel route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the website`);
});