require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const trackingRoutes = require('./routes/tracking');
const dashboardRoutes = require('./routes/dashboard');
const logsRoutes = require('./routes/logs');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
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
app.use('/dashboard', dashboardRoutes);
app.use('/logs', logsRoutes);
app.use((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('FORBIDDEN');
});

server.listen(3001);
