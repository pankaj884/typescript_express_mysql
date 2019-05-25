import * as _ from 'lodash';
import { HttpCodes } from '../utils/httpCodes';

abstract class BaseController {

  abstract model: any;

  // Get all
  getAll = async (req, res) => {

    try {

      if (req.payload && !req.payload.user._id) {
        res.status(HttpCodes.UNAUTHORIZED.CODE).json({
          message: 'UnauthorizedError: private'
        });
      } else {

        const docs = await this.model.findAll(req.params);
        res.status(HttpCodes.OK.CODE).json(docs);

      }
    } catch (err) {
      return res.status(HttpCodes.SERVER_ERROR.CODE).json({
        message: HttpCodes.SERVER_ERROR.MESSAGE,
        devMessage: err
      });
    }

  };


  // Insert
  insert = async (req, res) => {

    try {

      if (req.payload && !req.payload.user._id) {
        res.status(HttpCodes.UNAUTHORIZED.CODE).json({
          message: 'UnauthorizedError: private'
        });
      } else {
        _.assignIn(req.body, req.params);

        const docs = await this.model.create(req.body);
        res.status(HttpCodes.OK.CODE).json(docs);

      }
    } catch (err) {
      return res.status(HttpCodes.SERVER_ERROR.CODE).json({
        message: HttpCodes.SERVER_ERROR.MESSAGE,
        devMessage: err
      });
    }
  };

  // Get by id
  get = async (req, res) => {

    try {

      if (req.payload && !req.payload.user._id) {
        res.status(HttpCodes.UNAUTHORIZED.CODE).json({
          message: 'UnauthorizedError: private'
        });
      } {

        const docs = await this.model.find({ id: req.params.id });
        res.status(HttpCodes.OK.CODE).json(docs);

      }

    } catch (err) {
      return res.status(HttpCodes.SERVER_ERROR.CODE).json({
        message: HttpCodes.SERVER_ERROR.MESSAGE,
        devMessage: err
      });
    }


  };

  // Update by id
  update = async (req, res) => {


    try {
      if (req.payload && !req.payload.user._id) {
        res.status(HttpCodes.UNAUTHORIZED.CODE).json({
          message: 'UnauthorizedError: private'
        });
      } else {
        await this.model.update(req.body, { where: { id: req.params.id } })
        res.status(HttpCodes.OK.CODE).json({ message: 'success' });
      }
    } catch (err) {
      return res.status(HttpCodes.SERVER_ERROR.CODE).json({
        message: HttpCodes.SERVER_ERROR.MESSAGE,
        devMessage: err
      });
    }

  };

  // Delete by id
  delete = async (req, res) => {

    try {

      if (req.payload && !req.payload.user._id) {
        res.status(HttpCodes.UNAUTHORIZED.CODE).json({
          message: 'UnauthorizedError: private'
        });
      } else {
        _.assignIn(req.body, req.params);

        const docs = await this.model.destroy({ where: { id: req.params.id } });
        res.status(HttpCodes.OK.CODE).json({ message: 'success' });

      }
    } catch (err) {
      return res.status(HttpCodes.SERVER_ERROR.CODE).json({
        message: HttpCodes.SERVER_ERROR.MESSAGE,
        devMessage: err
      });
    }
  };
}

export default BaseController;
