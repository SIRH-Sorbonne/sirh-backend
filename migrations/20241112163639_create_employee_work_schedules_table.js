exports.up = function(knex) {
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
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('employee_work_schedules');
  };
  