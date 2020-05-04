const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever", {
    useNewUrlParser: true,
  });
};

// Student
const student = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      unique: true,
    },
    faveFoods: [{ type: String }],
    info: {
      school: {
        type: String,
      },
      shoeSize: {
        type: Number,
      },
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "school",
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("student", student);

// School

const school = new mongoose.Schema({
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
  staff: [{
    type: String
  }]
});

const School = new mongoose.model("school", school);

connect()
  .then(async (connection) => {
    // const schoolConfig = {
    //   schoolName: 'MLK Elementry',
    //   openSince: 2009,
    //   students: 1000,
    //   isGreat: true,
    //   staff: ['a', 'b', 'c']
    // };

    // const school2 = {
    //   schoolName: 'Larry Middle School',
    //   openSince: 1980,
    //   students: 600,
    //   isGreat: false,
    //   staff: ['v', 'b', 'g']
    // };

    // const schools = await School.create([schoolConfig, school2]);

    const match = await School.find({
      // students: { $gt: 600, $lt: 800 },
      // isGreat: true,
      // staff: 'b'
      staff: { $in: ['v', 'b', 'g'] }
    })
    .exec();

    // const school = await School.findOneAndUpdate(
    //   { schoolName: "MLK Elementry" },
    //   { schoolName: "MLK Elementry!" },
    //   { new: true }
    // ).exec();
    // const student = await Student.create({ firstName: 'Trisha', lastName: 'Joe', school: school._id }).exec();

    // const match = await Student.findById(student._id).populate("school").exec();

    console.log(match);
  })
  .catch((e) => console.log(e));
