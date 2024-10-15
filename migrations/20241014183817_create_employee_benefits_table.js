/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employee_benefits', table => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().references('id').inTable('employees').onDelete('CASCADE');
      table.integer('benefit_id').unsigned().references('id').inTable('benefits').onDelete('CASCADE');
      table.date('start_date');
      table.date('end_date');
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('employee_benefits');
  };
  