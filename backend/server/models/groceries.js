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

module.exports = {
  getGroceries,
  addGrocery
}