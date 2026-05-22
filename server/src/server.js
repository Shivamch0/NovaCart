import dotenv from 'dotenv';
dotenv.config({
    path : ".env"
});

import app from "./app.js";
import { connectDB } from './config/database.js';

const Port = process.env.PORT || 5000;

connectDB()
.then(() => {
    app.listen(Port , () => {
        console.log("Server is listening on port:" , Port)
    })
})
.catch((error) => {
    console.log("DSomething went wrong while connecting the database..." , error)
})