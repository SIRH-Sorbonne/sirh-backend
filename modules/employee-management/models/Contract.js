const { Knex } = require('knex');

class Contract {
  /**
   * @param {Knex} knex
   */
  static createTable(knex) {
    return knex.schema.createTable('contracts', (table) => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().notNullable();
      table.string('contract_type').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date');
      table.decimal('salary', 10, 2).notNullable();
      table.string('status').defaultTo('active');
      table.timestamps(true, true);

      table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
    });
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getContractById(knex, id) {
    return knex('contracts').where('id', id).first();
  }

  /**
   * @param {Knex} knex
   * @param {Object} contractData
   * @returns {Promise<number[]>}
   */
  static createContract(knex, contractData) {
    return knex('contracts').insert(contractData);
  }

  /**
   * @param {Knex} knex
   * @returns {Promise<Object[]>}
   */
  static getAllContracts(knex) {
    return knex('contracts').select('*');
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @param {Object} contractData
   * @returns {Promise<number>}
   */
  static updateContract(knex, id, contractData) {
    return knex('contracts').where('id', id).update(contractData);
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<number>}
   */
  static deleteContract(knex, id) {
    return knex('contracts').where('id', id).del();
  }
}

module.exports = Contract;