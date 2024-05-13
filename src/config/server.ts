import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db_conn';
import movieRoutes from '../modules/movie/movie.routes';
import createAdmin from "../middlewares/createAdmin"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use(express.json());
app.use('/api', movieRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

connectDB()
createAdmin()