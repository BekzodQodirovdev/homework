const tableName = "comments"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary()
        table.string("post_id").notNullable()
        table.string("user_id").notNullable()
        table.text("body").notNullable()
        table.timestamps(true, true)
        table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
        table
            .foreign("post_id")
            .references("id")
            .inTable("posts")
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
