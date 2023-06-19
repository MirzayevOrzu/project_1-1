/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('groups_students').del()
  await knex('groups_students').insert([
    {
      "student_id":1,
      "group_id":1
    }
  ]);
};
