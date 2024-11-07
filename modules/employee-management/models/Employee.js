const { Knex } = require('knex');

class Employee {
  /**
   * @param {Knex} knex
   */
  static createTable(knex) {
    return knex.schema.createTable('employees', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').unique().notNullable();
      table.string('phone');
      table.date('hire_date');
      table.date('exit_date');
      table.string('status').defaultTo('active');
      table.timestamps(true, true);
    });
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getEmployeeById(knex, id) {
    return knex('employees').where('id', id).first();
  }

  /**
   * @param {Knex} knex
   * @param {Object} employeeData
   * @returns {Promise<number[]>}
   */
  static createEmployee(knex, employeeData) {
    return knex('employees').insert(employeeData);
  }

  /**
   * @param {Knex} knex
   * @returns {Promise<Object[]>}
   */
  static getAllEmployees(knex) {
    return knex('employees').select('*');
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @param {Object} employeeData
   * @returns {Promise<number>}
   */
  static updateEmployee(knex, id, employeeData) {
    return knex('employees').where('id', id).update(employeeData);
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<number>}
   */
  static deleteEmployee(knex, id) {
    return knex('employees').where('id', id).del();
  }
  

}

module.exports = Employee;
