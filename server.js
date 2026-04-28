import dotenv from 'dotenv';
import app from './app.js';
import cors from 'cors';

app.use(cors());
dotenv.config();

import prisma from './config/prisma.client.js';

const PORT = process.env.PORT || 5000;

// start server
const startServer = async () => {
    try{
        await prisma.$connect();
        console.log('✅ Connected to DB');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {

    console.error(
      "❌ Failed to connect DB",
      error
    );

    process.exit(1);
  }
};

startServer();