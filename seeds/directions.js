/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('directions').del()
  await knex('directions').insert([
{
  name:"marketing"
},
{
  name:"dasturlash"
},
{
  name:"grafik dizayn"
}
  ]);
};
