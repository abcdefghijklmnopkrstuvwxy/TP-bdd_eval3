import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import taskRoutes from "./routes/taskRoutes";
import projectRoutes from './routes/projectRoutes';
import dotenv from 'dotenv';
dotenv.config();

// Créer notre app
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api', projectRoutes);

//const uri = "mongodb://root:example@localhost:27017/";
const uri = process.env.URI;
mongoose.connect(uri as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })

// Route par défaut
app.get('/', (req: Request, res: Response) => {
    res.send('TP');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
