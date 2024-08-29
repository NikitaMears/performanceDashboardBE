const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed data to the User table
    await User.bulkCreate([
      {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'Admin@frontieri.com',
        phoneNumber: '0978954555',
        password: await bcrypt.hash('Password@123', 10), // Hash the password
        roleId: 1, // Provide the appropriate roleId
        status: 'Candidate',
        lastPasswordChange:null
      },
      {
        firstName: 'Melaku',
        lastName: 'Minas',
        email: 'melaku@frontieri.com',
        phoneNumber: '0978998546',
        password: await bcrypt.hash('Password@123', 10), // Hash the password
        roleId: 1, // Provide the appropriate roleId
        status: 'Candidate',
        lastPasswordChange:null
      },
  
      // Add more user objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seed data from the User table
    await User.destroy({ where: {} });
  },
};

