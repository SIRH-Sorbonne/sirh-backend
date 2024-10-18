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

}

module.exports = Employee;