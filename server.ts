require('dotenv').config()
import client from './src/dbconfig/dbconnector';
import express from 'express';
import router from './src/routers/userRoutes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use('/users', router);

client.connect();

app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})