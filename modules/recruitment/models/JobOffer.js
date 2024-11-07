const { Knex } = require('knex');

class JobOffer {
  static createTable(knex) {
    return knex.schema.createTable('job_offers', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.string('department');
      table.string('location');
      table.date('start_date');
      table.date('end_date');
      table.string('status').defaultTo('open');
      table.timestamps(true, true);
    });
  }

  static getJobOfferById(knex, id) {
    return knex('job_offers').where('id', id).first();
  }

  static createJobOffer(knex, jobOfferData) {
    return knex('job_offers').insert(jobOfferData);
  }

  static getAllJobOffers(knex) {
    return knex('job_offers').select('*');
  }

  static updateJobOffer(knex, id, jobOfferData) {
    return knex('job_offers').where('id', id).update(jobOfferData);
  }

  static deleteJobOffer(knex, id) {
    return knex('job_offers').where('id', id).del();
  }
}

module.exports = JobOffer;