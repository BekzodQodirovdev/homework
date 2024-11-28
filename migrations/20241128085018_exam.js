const tableName = "exam"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary()
        table.string("title").notNullable()
        table.string("file").notNullable()
        table.integer("course_id").notNullable()
        table
            .foreign("course_id")
            .references("id")
            .inTable("courses")
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
