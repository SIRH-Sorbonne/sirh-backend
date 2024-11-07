exports.up = function(knex) {
    return knex.schema.createTable('interviews', (table) => {
      table.increments('id').primary();
      table.integer('candidate_id').unsigned().notNullable();
      table.integer('job_offer_id').unsigned().notNullable();
      table.dateTime('scheduled_at').notNullable();
      table.string('interviewer');
      table.string('status').defaultTo('scheduled');
      table.text('notes');
      table.timestamps(true, true);
  
      table.foreign('candidate_id').references('id').inTable('candidates').onDelete('CASCADE');
      table.foreign('job_offer_id').references('id').inTable('job_offers').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('interviews');
  };