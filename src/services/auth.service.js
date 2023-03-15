import { UserModel } from '../models/User.model';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const login = async (data) => {
   try {
      const { username, password } = data;
      if (!username || !password)
         throw new Error('Vui lòng nhập đầy đủ thông tin');
      const user = await UserModel.findByUsername(username);

      if (!user) throw new Error('Tài khoản hoặc mật khẩu không đúng!');
      if (!(await argon2.verify(user.password, password)))
         throw new Error('Tài khoản hoặc mật khẩu không đúng!');
      const accessToken = await jwt.sign(
         { user: user._id },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '1d' }
      );
      return { user, accessToken, success: true };
   } catch (err) {
      throw new Error(err.message);
   }
};

const register = async (data) => {
   try {
      let { username, password, passwordConfirm } = data;
      if (!username || !password || !passwordConfirm)
         throw new Error('Vui lòng nhập đầy đủ thông tin');
      if (password.length < 6)
         throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
      if (password !== passwordConfirm) throw new Error('Mật khẩu không khớp');
      const user = await UserModel.findByUsername(username);
      if (user) throw new Error('Tên đăng nhập đã tồn tại');

      password = await argon2.hash(password);
      const insertData = {
         username,
         password,
      };
      const result = await UserModel.createNew(insertData);

      // Return token user
      const accessToken = await jwt.sign(
         { user: result._id },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '1d' }
      );
      return { user: result, accessToken, success: true };
   } catch (err) {
      throw new Error({ success: false, err });
   }
};

const getUserInfo = async (userId) => {
   try {
      const user = await UserModel.findById(userId);
      if (!user) throw new Error('Tài khoản không tồn tại');

      return { user, success: true };
   } catch (err) {
      throw new Error({ success: false, err });
   }
};

export const AuthService = { login, register, getUserInfo };
