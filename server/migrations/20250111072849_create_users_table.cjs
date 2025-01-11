exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('username').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};