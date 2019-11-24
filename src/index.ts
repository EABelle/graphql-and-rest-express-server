import express from 'express';
import {userRouter} from "./api/router";
import bodyParser = require("body-parser");

const mongoose = require('mongoose');
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app: express.Application = express();

//middleware
//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Api-Key');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

app
    .use('/user', userRouter);

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.log(err);
    });
