import {Application} from 'express';
import {userRouter} from './api/router';
const express = require('express');
const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Api-Key');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.use('/user', userRouter);

export default app;
