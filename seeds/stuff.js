const bcrypt=require('bcrypt')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('stuff').del()
  await knex('stuff').insert([
    {
      "first_name": "Alisher",
      "last_name": "Abdullayev",
      "role": "teacher",
      "username": "alisher11",
      "password": bcrypt.hashSync('12345',10)
    },
    {
      "first_name": "Alisher",
      "last_name": "Abdullayev",
      "role": "teacher",
      "username": "alisher12",
      "password": bcrypt.hashSync('12345',10)
    },
  ]);
};
