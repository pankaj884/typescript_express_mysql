import * as ORM from 'sequelize';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.load({ path: '.env' });

// Option 1: Passing parameters separately
export const sequelize = new ORM(process.env.db_name, process.env.db_user, process.env.db_pass, {
	host: process.env.db_host,
	port: process.env.db_port,
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
