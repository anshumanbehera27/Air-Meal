import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './Routs/foodRouts.js';
import userRouter from './Routs/userRouts.js';

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// db connection 
connectDB()

// api end point 
app.use('/api/food' , foodRouter)
app.use('/images' , express.static('uploads'))
app.use("/api/user", userRouter)

// Routes
app.get('/', (req, res) => {
  res.send('API Working');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// mongodb+srv://Anshuman27:Behera20@cluster0.pnceyfy.mongodb.net/?