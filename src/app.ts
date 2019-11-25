require('dotenv').config();
import {Application} from 'express';
import {articleRouter, userRouter} from './api/router';
import {apiEndpoints} from './api/config';
const express = require('express');
const bodyParser = require('body-parser');

const app: Application = express();

app
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(function(_req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Api-Key');
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
    })
    .use(apiEndpoints.articles, articleRouter)
    .use(apiEndpoints.users, userRouter);

export default app;
