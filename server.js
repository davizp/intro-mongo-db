const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { urlencoded, json } = require('body-parser');


const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },
  body: {
    type: String,
    minlength: 10
  }
});

const Note = mongoose.model('note', noteSchema); 

app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/note', async (req, res) => {
  const notes = await Note
    .find({})
    // .skip(10)
    // .limit(10)
    .lean()
    .exec();

  res.status(200).json({
    status: 'success',
    data: notes
  });
});

app.post('/note', async (req, res) => {
  const noteToBeCreated = req.body;

  const note = await Note.create(noteToBeCreated);

  res.status(201).json({
    status: 'success',
    note: note.toJSON()
  });
});

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/whatever', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};


const init = async() => {
  try {
    await connect();
    app.listen(5000);
  } catch(error) {
    console.log(error)
  }
};

init();
