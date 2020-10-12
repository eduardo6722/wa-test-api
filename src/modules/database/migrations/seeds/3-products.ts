import * as Knex from 'knex';
import * as faker from 'faker/locale/pt_BR';

import { IS_DEV } from 'settings';
import { IProduct } from 'modules/database/interfaces/product';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const products = await knex
    .count()
    .from('Product')
    .first();

  if (Number(products.count) > 0) return;

  for (let x = 0; x < 20; x++) {
    const product: IProduct = {
      description: faker.commerce.productName(),
      price: faker.random.number(20) + 0.99,
      stock: 100,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(product).into('Product');
  }
}
