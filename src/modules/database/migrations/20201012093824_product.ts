import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Product', table => {
    table.increments('id').primary();
    table.string('description').notNullable();
    table.integer('stock').defaultTo(0);
    table.decimal('price', 15, 2).notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Product');
}
