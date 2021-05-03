import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import ms from 'ms'

export class Auth {
  static generate(credentials: Record<'id' | 'username', string>): string {
    return jwt.sign(credentials, process.env.JWT_PRIVATE_KEY, {
      expiresIn: ms('8h')
    })
  }

  static middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(401).send({ message: 'No token provided' })
      return
    }
    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
      res.status(401).send({ message: 'Token error' })
      return
    }
    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).send({ message: 'Token malformatted' })
      return
    }
    jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY,
      (err, decoded: Record<'id' | 'username', string>) => {
        if (err) return res.status(401).send({ message: 'Token invalid', err })

        res.set('admin-id', decoded.id)
        return next()
      }
    )
  }
}
