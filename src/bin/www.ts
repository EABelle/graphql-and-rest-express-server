const app = require('../app');
const http = require('http');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const server = http.createServer(app);

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to DB');
        server.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.log(err);
    });
