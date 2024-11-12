exports.up = function(knex) {
    return knex.schema.createTable('employee_skills', (table) => {
      table.increments('id').primary();
      table.integer('employee_id').unsigned().notNullable();
      table.string('skill').notNullable(); // Nom de la compétence
      table.string('level').notNullable(); // Niveau de compétence
      table.timestamps(true, true); // created_at et updated_at
  
      // Clé étrangère vers la table employees
      table.foreign('employee_id').references('id').inTable('employees').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('employee_skills');
  };
  