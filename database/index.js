import Sequelize from 'sequelize';
import configDB from '../config/database.js';

import Product from '../models/product.js';
// import User from '../models/user.js';

const connection = new Sequelize(configDB);

Product.init(connection);
// User.init(connection);

export default connection;
