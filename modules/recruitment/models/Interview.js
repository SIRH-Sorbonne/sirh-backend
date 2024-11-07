const { Knex } = require('knex');

class Interview {
  static createTable(knex) {
    return knex.schema.createTable('interviews', (table) => {
      table.increments('id').primary();
      table.integer('candidate_id').unsigned().references('id').inTable('candidates');
      table.integer('job_offer_id').unsigned().references('id').inTable('job_offers');
      table.dateTime('scheduled_at').notNullable();
      table.string('interviewer');
      table.string('status').defaultTo('scheduled');
      table.text('notes');
      table.timestamps(true, true);
    });
  }

  static getInterviewById(knex, id) {
    return knex('interviews').where('id', id).first();
  }

  static createInterview(knex, interviewData) {
    return knex('interviews').insert(interviewData);
  }

  static getAllInterviews(knex) {
    return knex('interviews').select('*');
  }

  static updateInterview(knex, id, interviewData) {
    return knex('interviews').where('id', id).update(interviewData);
  }

  static deleteInterview(knex, id) {
    return knex('interviews').where('id', id).del();
  }
}

module.exports = Interview;