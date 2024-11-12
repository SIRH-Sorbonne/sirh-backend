exports.up = function(knex) {
    return knex.schema.createTable('work_schedules', (table) => {
      table.increments('id').primary();
      table.string('schedule_name').notNullable(); // Nom de l'horaire (par exemple, "39 heures")
      table.integer('hours_per_week').notNullable(); // Heures par semaine
      table.string('description'); // Description de l'horaire
      table.timestamps(true, true); // created_at et updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('work_schedules');
  };
  