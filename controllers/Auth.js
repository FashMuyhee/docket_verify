
class AuthController {

  static async login(req, res) {
    const defaultUser = {
      email: 'admin@email.com',
      password: 'rootuser'
    }
    try {
      const { email, password } = req.body
      if (password.length >= 8) {
        if (email === defaultUser.email && password === defaultUser.password) {
          const authToken = Math.random().toString(36).substring(2, 9);
          req.session.token = authToken
          res.redirect('/')

        } else {
          console.log({ type: 'error', msg: 'Invalid Login' })
          res.render('login', { message: { type: 'error', msg: 'Invalid Login' } })
        }

      } else {
        res.render('login', { message: { type: 'error', msg: 'Password Too Short' } })
        console.log('short')

      }
    } catch (error) {
      console.log(error)
      res.render('login', { message: { type: 'error', msg: 'Something went wrong' } })
    }

  }

  static async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.redirect('/')
        }
        res.clearCookie()
        return res.redirect('/login')
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

export default AuthController