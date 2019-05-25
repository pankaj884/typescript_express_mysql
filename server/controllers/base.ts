import * as _ from 'lodash';
import { HttpCodes } from '../utils/httpCodes';

abstract class BaseController {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    if (req.payload && !req.payload.user._id) {
      res.status(HttpCodes.UNAUTHORIZED.CODE).json({
        message: 'UnauthorizedError: private'
      });
    } else {
      this.model.find(req.params, (err, docs) => {
        if (err) {
          return res.status(HttpCodes.SERVER_ERROR.CODE).json({
            message: HttpCodes.SERVER_ERROR.MESSAGE,
            devMessage: err
          });
        }
        res.status(HttpCodes.OK.CODE).json(docs);
      });
    }
  };

  // Count all
  count = (req, res) => {
    if (req.payload && !req.payload.user._id) {
      res.status(HttpCodes.UNAUTHORIZED.CODE).json({
        message: 'UnauthorizedError: private'
      });
    } else {
      this.model.count((err, count) => {
        if (err) {
          return res.status(HttpCodes.SERVER_ERROR.CODE).json({
            message: HttpCodes.SERVER_ERROR.MESSAGE,
            devMessage: err
          });
        }
        res.status(HttpCodes.OK.CODE).json(count);
      });
    }
  };

  // Insert
  insert = (req, res) => {
    if (req.payload && !req.payload.user._id) {
      res.status(HttpCodes.UNAUTHORIZED.CODE).json({
        message: 'UnauthorizedError: private'
      });
    } else {
      _.assignIn(req.body, req.params);
      const obj = new this.model(req.body);
      obj.save((err, item) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          return res.status(HttpCodes.UNPROCESSABLE_ENTITY.CODE).json({
            mongoError: 'UNIQUE',
            devMessage: err
          });
        }
        if (err) {
          return res.status(HttpCodes.SERVER_ERROR.CODE).json({
            message: HttpCodes.SERVER_ERROR.MESSAGE,
            devMessage: err
          });
        }
        res.status(HttpCodes.OK.CODE).json(item);
      });
    }
  };

  // Get by id
  get = (req, res) => {
    if (req.payload && !req.payload.user._id) {
      res.status(HttpCodes.UNAUTHORIZED.CODE).json({
        message: 'UnauthorizedError: private'
      });
    } else {
      this.model.findOne({ _id: req.params.id }, (err, obj) => {
        if (err) {
          return res.status(HttpCodes.SERVER_ERROR.CODE).json({
            message: HttpCodes.SERVER_ERROR.MESSAGE,
            devMessage: err
          });
        }
        res.status(HttpCodes.OK.CODE).json(obj);
      });
    }
  };

  // Update by id
  update = (req, res) => {
    if (req.payload && !req.payload.user._id) {
      res.status(HttpCodes.UNAUTHORIZED.CODE).json({
        message: 'UnauthorizedError: private'
      });
    } else {
      _.assignIn(req.body, req.params);

      this.model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, item) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          return res.status(HttpCodes.UNPROCESSABLE_ENTITY.CODE).json({
            mongoError: 'UNIQUE',
            devMessage: err
          });
        }
        if (err) {
          return res.status(HttpCodes.SERVER_ERROR.CODE).json({
            message: HttpCodes.SERVER_ERROR.MESSAGE,
            devMessage: err
          });
        }
        res.status(HttpCodes.OK.CODE).json(item);
      });
    }
  };

  // Delete by id
  delete = (req, res) => {
    if (req.payload && !req.payload.user._id) {
      res.status(HttpCodes.UNAUTHORIZED.CODE).json({
        message: 'UnauthorizedError: private'
      });
    } else {
      this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) {
          return res.status(HttpCodes.SERVER_ERROR.CODE).json({
            message: HttpCodes.SERVER_ERROR.MESSAGE,
            devMessage: err
          });
        }
        res.status(HttpCodes.OK.CODE).json({});
      });
    }
  };
}

export default BaseController;
