const tableName = "homework"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary()
        table.text("text").unsigned().notNullable()
        table.string("grade_id").unsigned().notNullable()
        table.string("file").unsigned().notNullable()
        table.string("link").unsigned().notNullable()
        table
            .foreign("grade_id")
            .references("id")
            .inTable("grades")
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
