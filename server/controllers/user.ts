import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user';
import BaseController from './base';
import { HttpCodes } from './../utils/httpCodes';
dotenv.load({ path: '.env' });

export default class UserController extends BaseController {
  model = User;
  dashboardUrl = process.env.DASHBOARD_URL;



  test = async function() {

    console.log("************** test function called ******************");

  }



  public async auth(req, res) {

    try {
      res.status(HttpCodes.OK.CODE).json({});
    } catch (err) {
      console.log("req.payload.user : ", req.payload.user, typeof req.payload.user, err.message);

      return res.status(HttpCodes.SERVER_ERROR.CODE).json({
        message: err.message
      });
    }
  };
}