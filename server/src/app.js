import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleWare } from './middleware/error.middleware.js';

const app = express();

app.use(cors());

app.use(express.json({limit : '16kb'}));
app.use(express.urlencoded({ extended : true , limit : '16kb'}));
app.use("/uploads" , express.static("uploads"));

app.use(cookieParser());


// Routes Import // 
import userRoute from './route/user.route.js';

app.use("/api/v1/users" , userRoute);



app.use(errorMiddleWare)

export default app;