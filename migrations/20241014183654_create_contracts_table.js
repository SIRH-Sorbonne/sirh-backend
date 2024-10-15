/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('contracts', table => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().references('id').inTable('employees').onDelete('CASCADE');
      table.string('contract_type').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date');
      table.decimal('salary', 14, 2).notNullable();
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('contracts');
  };
  