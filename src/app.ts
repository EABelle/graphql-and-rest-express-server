require('dotenv').config();
import {Application} from 'express';
import {articleRouter, userRouter} from './api/router';
import {apiEndpoints} from './api/config';
import {accessControl} from './common/access-control';
import {fourOFourMiddleware} from './common/404-middleware';
import {authorization} from './common/authorization';
const express = require('express');
const bodyParser = require('body-parser');
const healthcheck = require('express-healthcheck')();

const app: Application = express();
app
    .disable('x-powered-by')
    .get('/health(check)?', healthcheck)
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(accessControl)
    .use(authorization)
    .use(apiEndpoints.articles, articleRouter)
    .use(apiEndpoints.users, userRouter)
    .use(fourOFourMiddleware);

export default app;
