const { Knex } = require('knex');

class WorkSchedule {
  /**
   * @param {Knex} knex
   */
  static createTable(knex) {
    return knex.schema.createTable('work_schedules', (table) => {
      table.increments('id').primary();
      table.string('schedule_name').notNullable(); // Nom de l'horaire (par exemple, "39 heures")
      table.integer('hours_per_week').notNullable(); // Heures par semaine
      table.string('description'); // Description de l'horaire
      table.timestamps(true, true); // created_at et updated_at
    });
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getWorkScheduleById(knex, id) {
    return knex('work_schedules').where('id', id).first();
  }

  /**
   * @param {Knex} knex
   * @param {Object} scheduleData
   * @returns {Promise<number[]>}
   */
  static createWorkSchedule(knex, scheduleData) {
    return knex('work_schedules').insert(scheduleData);
  }

  /**
   * @param {Knex} knex
   * @returns {Promise<Object[]>}
   */
  static getAllWorkSchedules(knex) {
    return knex('work_schedules').select('*');
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @param {Object} scheduleData
   * @returns {Promise<number>}
   */
  static updateWorkSchedule(knex, id, scheduleData) {
    return knex('work_schedules').where('id', id).update(scheduleData);
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<number>}
   */
  static deleteWorkSchedule(knex, id) {
    return knex('work_schedules').where('id', id).del();
  }
}

module.exports = WorkSchedule;
