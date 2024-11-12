const { Knex } = require('knex');

class Absence {
  /**
   * @param {Knex} knex
   */
  static createTable(knex) {
    return knex.schema.createTable('absences', (table) => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().notNullable(); // Lien avec l'employé
      table.date('start_date').notNullable(); // Date de début de l'absence
      table.date('end_date'); // Date de fin de l'absence (nullable)
      table.string('reason').notNullable(); // Raison de l'absence
      table.string('status').defaultTo('approved'); // Statut de l'absence
      table.timestamps(true, true); // created_at et updated_at

      // Clé étrangère vers la table employees
      table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
    });
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getAbsenceById(knex, id) {
    return knex('absences').where('id', id).first();
  }

  /**
   * @param {Knex} knex
   * @param {Object} absenceData
   * @returns {Promise<number[]>}
   */
  static createAbsence(knex, absenceData) {
    return knex('absences').insert(absenceData);
  }

  /**
   * @param {Knex} knex
   * @returns {Promise<Object[]>}
   */
  static getAllAbsences(knex) {
    return knex('absences').select('*');
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @param {Object} absenceData
   * @returns {Promise<number>}
   */
  static updateAbsence(knex, id, absenceData) {
    return knex('absences').where('id', id).update(absenceData);
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<number>}
   */
  static deleteAbsence(knex, id) {
    return knex('absences').where('id', id).del();
  }
}

module.exports = Absence;
