import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  matric_no: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  dp: {
    type: String,
    required: true
  },
  _id: { type: Number },
  examinations: [
    { type: mongoose.Schema.Types.Number, ref: 'Examinations' }
  ]
}, {
  timestamps: true
})

const StudentModel = mongoose.model('Students', StudentSchema);
export default StudentModel