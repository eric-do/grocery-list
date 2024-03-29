const { query } = require('../../db');

const getGroceries = async (
  limit = 10,
  types,
  lengths
) => {
  const q = `SELECT * FROM groceries`;

  const groceries = await query(q);
  return groceries;
}

const addGrocery = async (grocery) => {
  const q = `
    INSERT INTO groceries (item, quantity)
      VALUES ($1, $2)
    RETURNING id
  `

  const rows = await query(q, [grocery.item, grocery.quantity]);
  return rows[0];
}

const deleteGrocery = async (id) => {
  const q = `
    DELETE FROM groceries
    WHERE id = $1
  `

  const rows = await query(q, [id]);
  return rows[0];
}

const resetGroceries = async () => {
  const groceries = [
    {
      item: 'apple',
      quantity: 5
    },
    {
      item: 'banana',
      quantity: 6
    }
  ]

  await query(`TRUNCATE TABLE groceries`);
  await Promise.all(groceries.map(grocery => addGrocery(grocery)))
}

module.exports = {
  getGroceries,
  addGrocery,
  deleteGrocery,
  resetGroceries
}