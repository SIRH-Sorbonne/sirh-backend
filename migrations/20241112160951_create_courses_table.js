exports.up = function(knex) {
    return knex.schema.createTable('courses', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable(); // Titre du cours
      table.text('description'); // Description du cours
      table.date('start_date').notNullable(); // Date de début
      table.date('end_date'); // Date de fin (optionnelle)
      table.string('status').defaultTo('active'); // Statut du cours (par défaut "active")
      table.timestamps(true, true); // created_at et updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('courses');
  };
  