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
      "first_name": "Ahmad",
      "last_name": "Mahmudov",
      "role": "teacher",
      "username": "ahmad01",
      "password": bcrypt.hashSync('12345',10)
    },
    {
      "first_name": "Davron",
      "last_name": "Nazarov",
      "role": "teacher",
      "username": "davron02",
      "password": bcrypt.hashSync('12345',10)
    },
    {
      "first_name": "Davron",
      "last_name": "Nazarov",
      "role": "admin",
      "username": "davron1",
      "password": bcrypt.hashSync('12345',10)
    },
    {
      "first_name": "Davron",
      "last_name": "Nazarov",
      "role": "super_admin",
      "username": "davron3",
      "password": bcrypt.hashSync('12345',10)
    },
    {
      "first_name": "Izzat",
      "last_name": "Ikromov",
      "role": "assistent_teacher",
      "username": "izzat01",
      "password": bcrypt.hashSync('12345',10)
    },
  ]);
};
