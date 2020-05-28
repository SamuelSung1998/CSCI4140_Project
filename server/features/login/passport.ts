import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

import { findUserByEmail, findUserById } from './queries';
import {
  FAILURE, SUCCESS, TokenPayloadType, PassportLoginSuccessType,
} from './types';
import { jwtSecret } from '../../common/config';

const loginStrategy = (passport: PassportStatic) => {
  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    }, async (email: string, password: string, done) => {
      if (typeof email !== 'string' || typeof password !== 'string') {
        return done(null, false, { message: 'invalid input' });
      }

      const rtn = await findUserByEmail(email);

      if (rtn.result === SUCCESS) {
        if (compareSync(password, rtn.payload.user.passwordHash)) {
          const { id, group } = rtn.payload.user;
          const jwtPayload: TokenPayloadType = { id, email, group };
          const token = sign(jwtPayload, jwtSecret);

          const successRtn: PassportLoginSuccessType = {
            user: rtn.payload.user,
            token,
          };

          return done(null, successRtn);
        }
        return done(null, false, { message: 'invalid password' });
      }
      return done(null, false, { message: rtn.payload.error });
    }),
  );

  passport.use(
    'jwt',
    new JWTStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: jwtSecret,
    }, async (payload: TokenPayloadType, done) => {
      const rtn = await findUserById(payload.id);
      if (rtn.result === SUCCESS) {
        return done(null, rtn.payload.user);
      }
      return done(null, false, { message: rtn.payload.error });
    }),
  );
};

export default loginStrategy;
