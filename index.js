import { configDotenv } from 'dotenv';
configDotenv();
import { conncetDb } from './config/dbConnection.js';
import { router } from './routes/contactRoutes.js';
import express from 'express';
import { errorhandler } from './middleware/errorhandler.js';
import { userRouter } from './routes/userRoutes.js';
conncetDb();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/contacts", router);
app.use("/api/users", userRouter);



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
app.use(errorhandler);
