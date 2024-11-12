exports.up = function(knex) {
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
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('absences');
  };
  