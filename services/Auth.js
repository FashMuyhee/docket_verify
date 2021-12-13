import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

class AuthService {

  generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
  }

  hashPassword = async (password) => {
    const hash = await bcrypt.hashSync(password, 10);
    return hash
  }

  compareHashPassword = async (password, hashPassword) => {
    const match = await bcrypt.compareSync(password, hashPassword);
    return match
  }

}

export default new AuthService()