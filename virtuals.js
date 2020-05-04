const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/whatever', {
    useNewUrlParser: true,
  });
};

// School

const school = new mongoose.Schema({
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'distric'
  },
  schoolName: {
    type: String,
  },
  openSince: {
    type: Number,
  },
  students: {
    type: Number,
  },
  isGreat: {
    type: Boolean,
  },
  staff: [
    {
      type: String,
    },
  ],
});

// Compound Index
school.index({
  district: 1,
  schoolName: 1,
}, { unique: true });

// Before Save
school.post('save', function (doc, next) {
  setTimeout(() => {
    console.log('post save', doc);
    next();
  }, 2000);
});

// Injects staffCount on runtime
school.virtual('staffCount').get(function () {
  console.log('in virtuals');
  return this.staff.length;
});

const School = new mongoose.model('school', school);

connect()
  .then(async (connection) => {
    const mySchool = await School.create({
      schoolName: 'my school',
      staff: ['v', 'f', 'fsa'],
    });

    console.log('staffCount', mySchool.staffCount);
  })
  .catch((e) => console.log(e));
