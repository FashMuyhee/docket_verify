import mongoose from 'mongoose';

const ExaminationSchema = new mongoose.Schema({
  course_titles: {
    type: [String],
    required: true
  },
  course_codes: {
    type: [String],
    required: true
  },
  docket_no: {
    type: String,
    unique: true
  },
  student: {
    type: mongoose.Schema.Types.Number,
    ref: 'Students'
  },
  _id: {
    type: Number
  }
}, {
  timestamps: true
})

const ExaminationModel = mongoose.model('Examinations', ExaminationSchema);
export default ExaminationModel