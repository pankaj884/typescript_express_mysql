import * as express from 'express';
import * as jwt from 'express-jwt';
import * as expressJoi from 'joi-express';
import * as Joi from 'joi';
import UserController from '../controllers/user';

const userCtrl = new UserController();


const auth = jwt({
	secret: process.env.SECRET_TOKEN,
	userProperty: 'payload'
});

const setPasswordSchema = {
	body: {
		password: Joi.string().required(),
	}
};

const addUserForClientSchema = {
	body: {
		username: Joi.string().optional(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
	},
	headers: {
		authorization: Joi.string().required()
	}
};

const firstTimeUserSchema = {
	body: {
		identifier: Joi.string().required(),
		email: Joi.string().email().required(),
	},
	headers: {
		authorization: Joi.string().required()
	}
};

const tableSchema = {
	query: {
		perPage: Joi.number().min(1).required(),
		sortKey: Joi.string().optional(),
		sortOrder: Joi.number().optional(),
		page: Joi.number().min(0).required(),
		search: Joi.string().optional()
	},
	headers: {
		authorization: Joi.string().required()
	}
};

const router = express.Router();

router.route('/users').get(auth, userCtrl.getAll);
router.route('/users').post(auth, userCtrl.insert);
router.route('/users/:id').get(auth, userCtrl.get);
router.route('/users/:id').put(auth, userCtrl.update);
router.route('/users/:id').delete(auth, userCtrl.delete);


export default router;