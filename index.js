require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
let db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (err) => {
  console.log('DB Error: ' + err);
});

const bookRouter = require('./routes/book_router');
app.use('/book', bookRouter);

app.listen(PORT, () =>
  console.log(`Server started on http://127.0.0.1:${PORT}`)
);
