const insertGrocery = `
      INSERT INTO groceries (item, quantity)
        VALUES ($1, $2)
      RETURNING id;
    `

const getGroceries = `SELECT * FROM groceries`;

const deleteGrocery = `DELETE FROM groceries WHERE item = $1`;

module.exports = {
  insertGrocery,
  getGroceries,
  deleteGrocery
}