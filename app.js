import express from 'express';
const app = express();


app.use(express.json());

// check app health
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Digital Banking API'
    });
});

// routes



export default app;
