import express from 'express';
import {
  compareSync, hashSync, genSalt, genSaltSync,
} from 'bcryptjs';
import passport from '../../server/passport';
import { FAILURE, FormType } from './types';
import { UsersType, ADMIN, USER } from '../login/types';
import {
  updateUser, getUsersList, createUser, deleteUesrById,
} from './queries';
import { findUserById } from '../login/queries';

const userRoute = express.Router();

userRoute.get<{ changeUserId: string }>(
  '/by-id/:changeUserId',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, settingUser: UsersType | false, info) => {
      // token error
      if (err !== null || settingUser === null || settingUser === undefined || settingUser === false) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: info.message,
          },
        });
      }

      if (settingUser.group !== ADMIN) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'not enough permission',
          },
        });
      }

      const result = await findUserById(req.params.changeUserId);

      if (result.result === FAILURE) {
        return res.status(400).json(result);
      }

      const {
        id, username, group, email, phone,
      } = result.payload.user;

      return res.status(200).json({
        ...result,
        payload: {
          ...result.payload,
          user: {
            id,
            username,
            group,
            email,
            phone,
          },
        },
      });
    })(req, res, next);
  },
);

userRoute.delete<{ changeUserId: string }>(
  '/by-id/:changeUserId',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, settingUser: UsersType | false, info) => {
      // token error
      if (err !== null || settingUser === null || settingUser === undefined || settingUser === false) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: info.message,
          },
        });
      }

      if (settingUser.group !== ADMIN) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'not enough permission',
          },
        });
      }

      const result = await deleteUesrById(req.params.changeUserId);

      if (result.result === FAILURE) {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);
    })(req, res, next);
  },
);

userRoute.patch<{ changeUserId: string }>(
  '/by-id/:changeUserId',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, settingUser: UsersType | false, info) => {
      // token error
      if (err !== null || settingUser === null || settingUser === undefined || settingUser === false) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: info.message,
          },
        });
      }

      if (settingUser.group !== ADMIN) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'not enough permission',
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
  },
);

userRoute.get(
  '/list',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, settingUser: UsersType | false, info) => {
      // token error
      if (err !== null || settingUser === null || settingUser === undefined || settingUser === false) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: info.message,
          },
        });
      }

      if (settingUser.group !== ADMIN) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'not enough permission',
          },
        });
      }

      const result = await getUsersList();

      if (result.result === FAILURE) {
        return res.status(400).json(result);
      }

      return res.status(200).json({
        ...result,
        payload: {
          ...result.payload,
          users: result.payload.users.map((user) => ({
            id: user.id,
            username: user.username,
            group: user.group,
            email: user.email,
            phone: user.phone,
          })),
        },
      });
    })(req, res, next);
  },
);

userRoute.get(
  '/',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, settingUser: UsersType | false, info) => {
      // token error
      if (err !== null || settingUser === null || settingUser === undefined || settingUser === false) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: info.message,
          },
        });
      }

      const result = await findUserById(settingUser.id);

      if (result.result === FAILURE) {
        return res.status(400).json(result);
      }

      const {
        id, username, group, email, phone,
      } = result.payload.user;

      return res.status(200).json({
        ...result,
        payload: {
          ...result.payload,
          user: {
            id,
            username,
            group,
            email,
            phone,
          },
        },
      });
    })(req, res, next);
  },
);

userRoute.post(
  '/',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, settingUser: UsersType | false, info) => {
      // token error
      if (err !== null || settingUser === null || settingUser === undefined || settingUser === false) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: info.message,
          },
        });
      }

      if (settingUser.group !== ADMIN) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'not enough permission',
          },
        });
      }

      const {
        username, password, password2, group, email, phone,
      } = req.body;

      if (password.length < 6) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'not long enough password',
          },
        });
      }

      if (password !== password2) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'not same password',
          },
        });
      }

      const result = await createUser({
        username, passwordHash: hashSync(password, genSaltSync(10)), group, email, phone,
      });

      if (result.result === FAILURE) {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);
    })(req, res, next);
  },
);

userRoute.patch(
  '/',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, settingUser: UsersType | false, info) => {
      // token error
      if (err !== null || settingUser === null || settingUser === undefined || settingUser === false) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: info.message,
          },
        });
      }

      const { form }: { form: FormType } = req.body;

      if (form.password !== form.password2) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'different new password',
          },
        });
      }

      if (!compareSync(form.oldPassword, settingUser.passwordHash)) {
        return res.status(400).json({
          result: FAILURE,
          payload: {
            error: 'wrong password',
          },
        });
      }

      const result = await updateUser(form.id, {
        ...form,
        passwordHash: form.password !== '' ? hashSync(form.password, genSaltSync(10)) : undefined,
      });

      if (result.result === FAILURE) {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);
    })(req, res, next);
  },
);

export default userRoute;
