"use strict";
const { v4: uuid } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();
    const pickupLocations = [];

    await queryInterface.bulkInsert("Users", [
      {
        user_dni: 12345678,
        availableTime: 120,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ]);

    for (let i = 1; i <= 6; i++) {
      pickupLocations.push({
        pickup_location_id: uuid(),
        name: `Location ${i}`,
        capacity: 10,
      });
    }
    await queryInterface.bulkInsert(
      "PickupLocations",
      pickupLocations.map((location) => ({
        ...location,
        createdAt: timestamp,
        updatedAt: timestamp,
      }))
    );

    // Obtener todas las ubicaciones de recogida
    const allPickupLocations = await queryInterface.sequelize.query(
      'SELECT pickup_location_id FROM "PickupLocations";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Seed de monopatines
    const vehicles = [];
    allPickupLocations.forEach((location) => {
      for (let i = 1; i <= 2; i++) {
        vehicles.push({
          vehicle_id: uuid(),
          available: true,
          pickup_location_id_fk: location.pickup_location_id,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      }
    });
    await queryInterface.bulkInsert("Vehicles", vehicles);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
