const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Davilson Junior',
          email: 'davilson_2007@yahoo.com.br',
          password_hash: bcrypt.hashSync('12345', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
