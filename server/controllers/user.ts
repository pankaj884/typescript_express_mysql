import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user';
import BaseController from './base';
import { HttpCodes } from './../utils/httpCodes';
import * as rp from 'request-promise';
import { sequelize } from './../db/conn';
const Op = sequelize.Op;
const appKey = 'c7929b4254fdf1e666c8e1c1e6ca7e61';

dotenv.load({ path: '.env' });

export default class UserController extends BaseController {
  model = User;
  dashboardUrl = process.env.DASHBOARD_URL;

  checkTemp = async function() {

    try {

      let allUsersCities = await User.findAll({
        attributes: ['country', 'city'],
        group: ['country', 'city']
      });

      await Promise.all(
        allUsersCities.map(async (obj) => {
          let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + obj.dataValues.country + ',' + obj.dataValues.city + '&APPID=' + appKey;
          let result = await rp(url);

          result = JSON.parse(result);

          let temp = Number(result.main.temp) - 273.15;
          temp = Number(temp.toFixed(2));

          console.log("************** temp ******************", temp);
          await this.sendNotificationToUsers(obj.dataValues.country, obj.dataValues.city, temp);
        })
      )
      return true

    } catch (err) {
      return err;
    }

  }

  sendNotificationToUsers = async function(country, city, temp) {

    try {

      let where1 = {
        lastNotification: 0,
        '$or': [
          {
            tempRangeStart: { '$gt': temp }
          },
          {
            tempRangeEnd: { '$lt': temp }
          }
        ]
      };

      let where2 = {
        lastNotification: -1,
        tempRangeStart: { '$lt': temp },
      };

      let where3 = {
        lastNotification: 1,
        tempRangeEnd: { '$gt': temp }
      };

      let mainWhere = {
        country: country,
        city: city,
        '$or': [
          where1, where2, where3
        ]
      };
      console.log("***************** Cities :  ******************", city, temp);

      let usersArr = await User.findAll({ where: mainWhere });

      await Promise.all(
        usersArr.map(async (obj) => {

          let last = obj.dataValues.lastNotification;
          let newNotification = last;

          if (obj.dataValues.lastNotification == 0 && temp < obj.dataValues.tempRangeStart) {
            newNotification = -1;
          } else if (obj.dataValues.lastNotification == 0 && temp > obj.dataValues.tempRangeEnd) {
            newNotification = 1;
          } else if (obj.dataValues.lastNotification == -1 && temp > obj.dataValues.tempRangeEnd) {
            newNotification = 1;
          } else if (obj.dataValues.lastNotification == 1 && temp < obj.dataValues.tempRangeStart) {
            newNotification = -1;
          } else if (obj.dataValues.lastNotification != 0 && temp < obj.dataValues.tempRangeEnd && temp > obj.dataValues.tempRangeStart) {
            newNotification = 0;
          }

          if (newNotification !== last) {

            console.log("**********");
            console.log("****************");
            console.log("**********************");
            console.log("*********** Sending-Notification *****************", obj.dataValues.email, temp);
            console.log("**********************");
            console.log("****************");
            console.log("**********");

            let final = await User.update({
              updatedAt: new Date(),
              lastNotification: newNotification
            }, {
                where: {
                  id: obj.dataValues.id
                }
              });

            // sendNotificationToUser();
          }
        })
      );
      return true;
    } catch (err) {
      return err;
    }
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