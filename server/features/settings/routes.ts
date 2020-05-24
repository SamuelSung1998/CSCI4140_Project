import express from 'express';
import passport from '../../server/passport';
import { FAILURE } from './types';
import { UsersType } from '../login/types';
import { updateUser } from './queries';

const settingsRoute = express.Router();

settingsRoute.get<{ changeUserId: string }>('/:changeUserId', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, settingUser: UsersType | false, info) => {
    if (err !== null || settingUser === null || settingUser === undefined || settingUser === false) {
      return res.status(400).json({
        result: FAILURE,
        payload: {
          error: info.message,
        },
      });
    }
    const { changeUserId } = req.params;
    const {
      username, passwordHash, group, email, phone,
    } = req.body;

    const result = await updateUser(changeUserId, {
      username, passwordHash, group, email, phone,
    });

    if (result.result === FAILURE) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  })(req, res, next);
});

export default settingsRoute;
