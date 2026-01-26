
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Database connection pool
const pool = mysql.createPool({
    host: 'mysql',
    user: 'root', // Change this to your MySQL username
    password: 'rootpassword', // Change this to your MySQL password
    database: 'welcome_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL database');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}

// API Routes

// Get current welcome message
app.get('/api/message', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM messages ORDER BY id DESC LIMIT 1');
        
        if (rows.length === 0) {
            // Insert default message if none exists
            await pool.query('INSERT INTO messages (message_text) VALUES (?)', ['Welcome to our Application!']);
            const [newRows] = await pool.query('SELECT * FROM messages ORDER BY id DESC LIMIT 1');
            return res.json({ message: newRows[0].message_text });
        }
        
        res.json({ message: rows[0].message_text });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'Failed to fetch message' });
    }
});

// Update welcome message
app.post('/api/message', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }
        
        await pool.query('INSERT INTO messages (message_text) VALUES (?)', [message.trim()]);
        
        const [rows] = await pool.query('SELECT * FROM messages ORDER BY id DESC LIMIT 1');
        res.json({ 
            message: rows[0].message_text,
            success: 'Message updated successfully!' 
        });
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ error: 'Failed to update message' });
    }
});

// Get message history (optional)
app.get('/api/message/history', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 10');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    testConnection();
});