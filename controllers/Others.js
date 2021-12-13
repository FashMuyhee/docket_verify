import ExaminationModel from "../models/Examination.js"
import StudentModel from "../models/Student.js"



export default class OthersController {

  static async allStudents(req, res) {
    try {
      const result = await StudentModel.find()
      return res.render('students', { data: result })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async addStudent(req, res) {
    try {

      const { fullname, school, matric_no, dept, level, email } = req.body
      const last_entry = await StudentModel.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
      const count = last_entry?._id ? last_entry?._id + 1 : 1
      console.log(req.file.filename)
      await StudentModel.create({ _id: count, dp: req.file.filename, fullname, school, matric_no, dept, level, email })
      res.render('add-student', { message: { type: 'success', msg: 'Student Added Successfully' } })

    } catch (error) {
      console.log(error)
      res.render('./add-student', { message: { type: 'error', msg: 'Something went wrong' } })
    }
  }

  static async renderAddExam(req, res) {
    try {
      const result = await StudentModel.find()
      return res.render('add-student-exam', { students: result, message: {} })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async AddStudentExam(req, res) {
    try {

      const { student, course_title, course_code } = req.body
      const result = await StudentModel.find()
      const studentFetch = await StudentModel.findById(parseInt(student))
      const uid = Math.random().toString(36).substring(2, 9);
      const last_entry = await ExaminationModel.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
      const count = last_entry?._id ? last_entry?._id + 1 : 1
      const exam = await ExaminationModel.create({ _id: count, student: parseInt(student), course_titles: course_title, course_codes: course_code, docket_no: uid })
      await exam.save();

      studentFetch.examinations.push(exam);
      await studentFetch.save();
      res.render('add-student-exam', { students: result, message: { type: 'success', msg: 'Student Registered Added Successfully' } })

    } catch (error) {
      const result = await StudentModel.find()

      console.log(error)
      res.render('./add-student-exam', { students: result, message: { type: 'error', msg: 'Something went wrong' } })
    }
  }

  static fetchExamDetails = async (req, res) => {
    try {
      const { docket_no } = req.params;
      const data = await ExaminationModel.findOne({docket_no}).populate('student');
      console.log(data)
      res.render('docket', ({ data, layout: false }));
    } catch (error) {
      console.log(error)
    }
  }

  static fetchExams = async (req, res) => {
    try {
      const data = await ExaminationModel.find().populate('student');
      res.render('dockets', ({ data}));
    } catch (error) {
      console.log(error)
    }
  }

  static async delete(req, res) {
    try {

      const result = await StudentModel.findByIdAndRemove(req.params.id)
      console.log(result)
      return res.redirect('/admin/featured_images/')
    } catch (error) {
      res.status(500).json({ error })
    }
  }

}