exports.up = function(knex) {
    return knex.schema.table('employees', function(table) {
      table.date('exit_date').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('employees', function(table) {
      table.dropColumn('exit_date');
    });
  };