import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import path from 'path'
import routes from "./route/index.js"
import cookieParser from "cookie-parser"
import sessions from 'express-session'
import AuthController from "./controllers/Auth.js"
import expressEjsLayouts from "express-ejs-layouts"

const __dirname = path.resolve();

const app = express()


// templating
app.set('view engine', 'ejs');
app.set('views', './views/');
app.set('layout', './layout')

const oneDay = 1000 * 60 * 60 * 24;
const middleWares = [
  cors(),
  express.json(),
  bodyParser.urlencoded({ extended: true }),
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
  }),
  cookieParser(),
  expressEjsLayouts
]

app.use(express.static(__dirname + '/public'));
app.use(middleWares)

// routes
const requireAuth = (req, res, next) => {
  if (req?.session?.token) {
    next()
  } else {
    res.redirect('/login');
  }
};

const redirectHome = (req, res, next) => {
  if (req.session.token) {
    res.redirect('/');
  } else {
    next();
  }
};

app.use("/", routes)
app.get('/login', redirectHome, (req, res) => {
  res.render('login',{layout:false})
})
app.post('/login', redirectHome, AuthController.login)
app.post('/logout', requireAuth, AuthController.logout)


export default app