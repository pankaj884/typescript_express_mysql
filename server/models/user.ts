import * as ORM from 'sequelize';
import { sequelize } from './../db/conn';

export const User = sequelize.define('User', {
	name: ORM.STRING,
	email: ORM.STRING,
	country: ORM.STRING,
	city: ORM.STRING,
	tempRangeStart: ORM.FLOAT,
	tempRangeEnd: ORM.FLOAT,
	lastNotification: ORM.FLOAT
});