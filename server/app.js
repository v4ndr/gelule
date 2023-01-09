require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const connection = require('./models/connection');
const trackingRoutes = require('./routes/tracking');
const authRoutes = require('./routes/auth');

connection.connectToServer(async (err) => {
  if (err) console.log('err : ', err);
  else {
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      }),
    );
    app.use(cors({
      origin: '*',
    }));

    app.use('/tracking', trackingRoutes);
    app.use('/auth', authRoutes);
    app.use((req, res) => {
      res.setHeader('Content-Type', 'text/plain');
      res.status(404).send('FORBIDDEN');
    });

    server.listen(3001);
  }
});
