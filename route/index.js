import { Router } from 'express'
import AuthController from '../controllers/Auth.js'
import OthersController from '../controllers/Others.js';
import multer from 'multer'

const route = Router()

import path from 'path'

const storage = multer.diskStorage(
  {
    destination: './public/uploads/',
    filename: function (req, file, cb) {
      return cb(null, `student_image_${Math.floor(Math.random() * 100)}${path.extname(file.originalname)}`);
    }
  }
)


const imageUpload = multer({
  limits: {
    fileSize: 10000000,
  },
  storage: storage,
  dest: './public/uploads/',
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb('Please upload an Image')
    }
    if (req?.files?.length > 6) {
      return cb('Sorry You can select more than 6 images')
    }
    cb(undefined, true)
  }
})

const requireAuth = (req, res, next) => {
  if (req?.session?.token) {
    next()
  } else {
    res.redirect('/login');
  }
};

route.get('/', requireAuth, (req, res) => {
  res.render('home')
})
route.get('/add-student', requireAuth, (req, res) => {
  res.render('add-student', { message: {} })
})
route.post('/add-student', requireAuth, imageUpload.single('image'), OthersController.addStudent)
route.get('/students', requireAuth, OthersController.allStudents)
route.get('/add-student-exam', requireAuth, OthersController.renderAddExam)
route.post('/add-student-exam', requireAuth, OthersController.AddStudentExam)
route.get('/docket/:docket_no', requireAuth, OthersController.fetchExamDetails)
route.get('/dockets', requireAuth, OthersController.fetchExams)
route.get('/verify', requireAuth, (req, res) => {
  res.render('verify', { layout: false, message: {} })
})


route.get('/verify', requireAuth, (req, res) => {
  res.render('home')
})
export default route