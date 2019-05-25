import { HttpCodes } from './httpCodes';

export const checkIfAuthorized = (req, res) => {
  if (req.payload && !req.payload.user._id) {
    return res.status(HttpCodes.UNAUTHORIZED.CODE).json({
      message: 'UnauthorizedError: private'
    });
  } 
}