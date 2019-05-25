import * as express from 'express';
import { HttpCodes } from './utils/httpCodes';

import AuthRouter from './routes/auth';

export default function setRoutes(app) {

  const router = express.Router();

  app.use('/api', AuthRouter);
  app.use('/api', router);


  app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(HttpCodes.UNAUTHORIZED.CODE).send({
        message: 'No token provided.'
      });
    } else if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload);
    }
  });
}
