const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/contacts-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    console.log('database connection successfully!');
});

const contactRouter = require('./api/routes/contact');
const userRoter = require('./api/routes/user');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/contacts', contactRouter);
app.use('/api/users', userRoter);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use((req, res, next) => {
    res.status(404).json('Requested Url was not found!');
    next("Requested url wasn't match!");
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next('There was an resuest error!');
    } else if (err.message) {
        res.status(500).json(err.message);
    } else {
        res.status(500).json({ message: 'There was a requesting error!' });
  }
});

app.listen(port, () => {
    console.log(`listen on port ${port}`);
});
