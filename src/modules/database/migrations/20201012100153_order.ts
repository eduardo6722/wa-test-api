import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema
    .createTable('Order', table => {
      table.increments('id').primary();
      table.decimal('amount').notNullable();
      table
        .integer('userId')
        .notNullable()
        .references('User.id')
        .onDelete('CASCADE');
      table.dateTime('createdDate').notNullable();
      table.dateTime('updatedDate').notNullable();
    })
    .createTable('OrderProduct', table => {
      table.increments('id').primary();
      table
        .integer('orderId')
        .notNullable()
        .references('Order.id')
        .onDelete('CASCADE');

      table.integer('productId').references('Product.id');
      table.dateTime('createdDate').notNullable();
      table.dateTime('updatedDate').notNullable();
    });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Order');
  await knex.schema.dropTableIfExists('OrderProduct');
}
