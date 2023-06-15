/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('stuff', (table) => {
        table.increments('id').primary(),
            table.string('first_name').notNullable(),
            table.string('last_name').notNullable(),
            table.enum('role', ['teacher', 'admin', 'assistent_teacher', 'super_admin']),
            table.string('username', 10).unique(),
            table.string('password', 300)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('stuff')
};
