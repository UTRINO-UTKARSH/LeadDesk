require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./lib/db');
const userRoutes = require('./routes/user.route');
const leadRoutes = require('./routes/lead.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/auth', userRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
  res.send('LeadDesk backend is running');
});

app.listen(port, () => {
  connectDB();
  console.log(`LeadDesk_backend listening on port ${port}`);
});
