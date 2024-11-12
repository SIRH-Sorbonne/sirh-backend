exports.up = function(knex) {
    return knex.schema.createTable('sessions', (table) => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().notNullable();
      table.integer('course_id').unsigned().notNullable(); // Lien avec le cours
      table.dateTime('start_time').notNullable(); // Heure de début de la session
      table.dateTime('end_time'); // Heure de fin de la session (optionnelle)
      table.string('topic'); // Sujet de la session
      table.string('status').defaultTo('scheduled'); // Statut de la session
      table.timestamps(true, true); // created_at et updated_at
  
      // Clés étrangères vers les tables employees et courses
      table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
      table.foreign('course_id').references('id').inTable('courses').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sessions');
  };
  