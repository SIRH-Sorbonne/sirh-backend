const { Knex } = require('knex');

class Candidate {
  static createTable(knex) {
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
  }

  static getCandidateById(knex, id) {
    return knex('candidates').where('id', id).first();
  }

  static createCandidate(knex, candidateData) {
    return knex('candidates').insert(candidateData);
  }

  static getAllCandidates(knex) {
    return knex('candidates').select('*');
  }

  static updateCandidate(knex, id, candidateData) {
    return knex('candidates').where('id', id).update(candidateData);
  }

  static deleteCandidate(knex, id) {
    return knex('candidates').where('id', id).del();
  }

  static getCandidateByEmail(knex, email) {
    return knex('candidates').where('email', email).first();
  }
}

module.exports = Candidate;