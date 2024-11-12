const { Knex } = require('knex');

class Session {
  /**
   * @param {Knex} knex
   */
  static createTable(knex) {
    return knex.schema.createTable('sessions', (table) => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().notNullable();
      table.integer('course_id').unsigned().notNullable(); // Lien avec le cours
      table.dateTime('start_time').notNullable(); // Heure de début de la session
      table.dateTime('end_time'); // Heure de fin de la session (optionnelle)
      table.string('topic'); // Sujet de la session
      table.string('status').defaultTo('scheduled'); // Statut de la session
      table.timestamps(true, true); // created_at et updated_at

      // Clés étrangères vers les tables employees et courses
      table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
      table.foreign('course_id').references('id').inTable('courses').onDelete('CASCADE');
    });
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getSessionById(knex, id) {
    return knex('sessions').where('id', id).first();
  }

  /**
   * @param {Knex} knex
   * @param {Object} sessionData
   * @returns {Promise<number[]>}
   */
  static createSession(knex, sessionData) {
    return knex('sessions').insert(sessionData);
  }

  /**
   * @param {Knex} knex
   * @returns {Promise<Object[]>}
   */
  static getAllSessions(knex) {
    return knex('sessions').select('*');
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @param {Object} sessionData
   * @returns {Promise<number>}
   */
  static updateSession(knex, id, sessionData) {
    return knex('sessions').where('id', id).update(sessionData);
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<number>}
   */
  static deleteSession(knex, id) {
    return knex('sessions').where('id', id).del();
  }
}

module.exports = Session;
