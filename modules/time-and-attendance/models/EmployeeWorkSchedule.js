const { Knex } = require('knex');

class EmployeeWorkSchedule {
  /**
   * @param {Knex} knex
   */
  static createTable(knex) {
    return knex.schema.createTable('employee_work_schedules', (table) => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().notNullable(); // Lien avec l'employé
      table.integer('work_schedule_id').unsigned().notNullable(); // Lien avec l'horaire de travail
      table.date('start_date').notNullable(); // Date de début de l'horaire attribué
      table.date('end_date'); // Date de fin (nullable)
      table.timestamps(true, true); // created_at et updated_at

      // Clés étrangères vers les tables employees et work_schedules
      table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
      table.foreign('work_schedule_id').references('id').inTable('work_schedules').onDelete('CASCADE');
    });
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getEmployeeWorkScheduleById(knex, id) {
    return knex('employee_work_schedules').where('id', id).first();
  }

  /**
   * @param {Knex} knex
   * @param {Object} employeeScheduleData
   * @returns {Promise<number[]>}
   */
  static createEmployeeWorkSchedule(knex, employeeScheduleData) {
    return knex('employee_work_schedules').insert(employeeScheduleData);
  }

  /**
   * @param {Knex} knex
   * @returns {Promise<Object[]>}
   */
  static getAllEmployeeWorkSchedules(knex) {
    return knex('employee_work_schedules').select('*');
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @param {Object} employeeScheduleData
   * @returns {Promise<number>}
   */
  static updateEmployeeWorkSchedule(knex, id, employeeScheduleData) {
    return knex('employee_work_schedules').where('id', id).update(employeeScheduleData);
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<number>}
   */
  static deleteEmployeeWorkSchedule(knex, id) {
    return knex('employee_work_schedules').where('id', id).del();
  }
}

module.exports = EmployeeWorkSchedule;
