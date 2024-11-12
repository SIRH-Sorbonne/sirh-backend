const { Knex } = require('knex');

class Course {
  /**
   * @param {Knex} knex
   */
  static createTable(knex) {
    return knex.schema.createTable('courses', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable(); // Titre du cours
      table.text('description'); // Description du cours
      table.date('start_date').notNullable(); // Date de début
      table.date('end_date'); // Date de fin (optionnelle)
      table.string('status').defaultTo('active'); // Statut du cours (par défaut "active")
      table.timestamps(true, true); // created_at et updated_at
    });
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getCourseById(knex, id) {
    return knex('courses').where('id', id).first();
  }

  /**
   * @param {Knex} knex
   * @param {Object} courseData
   * @returns {Promise<number[]>}
   */
  static createCourse(knex, courseData) {
    return knex('courses').insert(courseData);
  }

  /**
   * @param {Knex} knex
   * @returns {Promise<Object[]>}
   */
  static getAllCourses(knex) {
    return knex('courses').select('*');
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @param {Object} courseData
   * @returns {Promise<number>}
   */
  static updateCourse(knex, id, courseData) {
    return knex('courses').where('id', id).update(courseData);
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<number>}
   */
  static deleteCourse(knex, id) {
    return knex('courses').where('id', id).del();
  }
}

module.exports = Course;
