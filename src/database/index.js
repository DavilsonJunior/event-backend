import Sequelize from 'sequelize';

import User from '../app/models/User';
import Event from '../app/models/Event';
// import EventUser from '../app/models/EventUser';

import databaseConfig from '../config/database';

const models = [User, Event];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
