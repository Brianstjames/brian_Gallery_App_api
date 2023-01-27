'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Annie',
      lastName: 'Easley',
      email: 'ajeasley@nasa.gov',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete('Users', null, {});
  }
};
