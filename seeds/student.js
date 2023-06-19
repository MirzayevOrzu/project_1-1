/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('students').del()
  await knex('students').insert([
    {
      "first_name": "Farangiz",
      "last_name": "Ismatova"
    },
    {
      "first_name": "Iroda",
      "last_name": "Muminova"
    },
    {
      "first_name": "Hilola",
      "last_name": "Rustamova"
    },
    {
      "first_name": "Dilnoza",
      "last_name": "Sunnatova"
    }
  ]);
};
