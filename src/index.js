const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const firebaseAdmin = require('../firebase');  // Import Firebase initialization
const { verifyFirebaseToken } = require('./middlewares/authMiddleware');
const { getConfig, deleteConfig, updateConfig, addConfig } = require('./controllers/configController');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

// Routes for configuration endpoints
app.get('/config', verifyFirebaseToken, getConfig);
app.delete('/config/delete', verifyFirebaseToken, deleteConfig);
app.post('/config/update', verifyFirebaseToken, updateConfig);
app.post('/config/add', verifyFirebaseToken, addConfig);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
