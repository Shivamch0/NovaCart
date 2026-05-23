import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());

app.use(express.json({limit : '16kb'}));
app.use(express.urlencoded({ extended : true , limit : '16kb'}));
app.use("/uploads" , express.static("uploads"));

app.use(cookieParser());


// Routes Import // 
import userRoute from './route/user.route.js';

app.use("/api/v1/users" , userRoute);

export default app;