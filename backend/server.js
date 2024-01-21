const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const {handleErrorResponse} = require('./utils/handleErrorResponse')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to QuizWhiz server');
});

app.get('/health', (req, res) => {
    res.json({
        serverName: 'QuizWhiz Server',
        currentTime: new Date(),
        state: 'active',
    });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Server running on ${process.env.PORT}`);
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        return handleErrorResponse(res, 500, 'Internal server error!');
    }
};

app.listen(process.env.PORT, startServer);