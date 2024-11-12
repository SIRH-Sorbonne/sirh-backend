const { Knex } = require('knex');

class EmployeeSkill {
  /**
   * @param {Knex} knex
   */
  static createTable(knex) {
    return knex.schema.createTable('employee_skills', (table) => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().notNullable();
      table.string('skill').notNullable(); // Nom de la compétence
      table.string('level').notNullable(); // Niveau de compétence (par exemple, "Débutant", "Intermédiaire", "Expert")
      table.timestamps(true, true); // created_at et updated_at

      // Clé étrangère vers la table employees
      table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
    });
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getEmployeeSkillById(knex, id) {
    return knex('employee_skills').where('id', id).first();
  }

  /**
   * @param {Knex} knex
   * @param {Object} employeeSkillData
   * @returns {Promise<number[]>}
   */
  static createEmployeeSkill(knex, employeeSkillData) {
    return knex('employee_skills').insert(employeeSkillData);
  }

  /**
   * @param {Knex} knex
   * @returns {Promise<Object[]>}
   */
  static getAllEmployeeSkills(knex) {
    return knex('employee_skills').select('*');
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @param {Object} employeeSkillData
   * @returns {Promise<number>}
   */
  static updateEmployeeSkill(knex, id, employeeSkillData) {
    return knex('employee_skills').where('id', id).update(employeeSkillData);
  }

  /**
   * @param {Knex} knex
   * @param {number} id
   * @returns {Promise<number>}
   */
  static deleteEmployeeSkill(knex, id) {
    return knex('employee_skills').where('id', id).del();
  }
}

module.exports = EmployeeSkill;
