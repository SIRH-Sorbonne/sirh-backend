exports.up = function(knex) {
    return knex.schema.createTable('candidates', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').unique().notNullable();
      table.string('phone');
      table.string('resume_url');
      table.string('status').defaultTo('new');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('candidates');
  };