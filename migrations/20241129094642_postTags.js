const tableName = "post_tags"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary()
        table.string("post_id").notNullable()
        table.string("tag_id").notNullable()
        table.timestamps(true, true)
        table
            .foreign("post_id")
            .references("id")
            .inTable("posts")
            .onDelete("CASCADE")
        table
            .foreign("tag_id")
            .references("id")
            .inTable("tags")
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
