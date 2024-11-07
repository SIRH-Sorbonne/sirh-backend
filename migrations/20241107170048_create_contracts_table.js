exports.up = function(knex) {
    return knex.schema.createTable('contracts', (table) => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().notNullable();
      table.string('contract_type').notNullable(); // e.g., "CDI", "CDD", etc.
      table.date('start_date').notNullable();
      table.date('end_date'); // Optionnel pour les CDD
      table.decimal('salary', 10, 2).notNullable(); // Salaire
      table.string('status').defaultTo('active'); // Statut du contrat
      table.timestamps(true, true); // created_at et updated_at
  
      table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('contracts');
  };