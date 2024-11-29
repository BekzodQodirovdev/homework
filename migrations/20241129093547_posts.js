const tableName = "posts"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary()
        table.string("user_id").notNullable()
        table.string("title").notNullable()
        table.string("body").notNullable()
        table.string("category_id").notNullable()
        table.timestamps(true, true)
        table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
        table
            .foreign("category_id")
            .references("id")
            .inTable("categories")
            .onDelete("CASCADE")
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable(tableName)
}
