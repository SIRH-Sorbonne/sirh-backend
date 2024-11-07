exports.up = function(knex) {
    return knex.schema.createTable('job_offers', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.string('department');
      table.string('location');
      table.date('start_date').notNullable();
      table.date('end_date');
      table.string('status').defaultTo('open');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('job_offers');
  };