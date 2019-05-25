import * as ORM from 'sequelize';
import { Sequelize } from 'sequelize';

// Option 1: Passing parameters separately
export const sequelize = new ORM('test_notification', 'root', 'root', {
	host: '127.0.0.1',
	port: '8889',
	dialect: 'mysql',
}, {
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
