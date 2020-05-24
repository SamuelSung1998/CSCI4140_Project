import express from 'express';
import passport from '../../server/passport';
import { FAILURE, SUCCESS, PassportLoginSuccessType } from './types';

const loginRoute = express.Router();

loginRoute.post('/', (req, res, next) => {
  passport.authenticate('local-login', (err, rtn: PassportLoginSuccessType | false, info) => {
    if (err !== null || rtn === null || rtn === undefined || rtn === false) {
      return res.status(400).json({
        result: FAILURE,
        payload: {
          error: info.message,
        },
      });
    }

    return res.status(200).json({
      result: SUCCESS,
      payload: {
        username: rtn.user.username,
        group: rtn.user.group,
        token: rtn.token,
      },
    });
  })(req, res, next);
});

export default loginRoute;
