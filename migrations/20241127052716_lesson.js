const tableName = "lesson"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary()
        table.string("lesson").unsigned().notNullable()
        table.integer("homework_id").unsigned().notNullable()
        table.integer("wideo_id").unsigned().notNullable()
        table.string("homework").unsigned().notNullable()
        table.string("room").unsigned().notNullable()
        table.date("start_at").unsigned().notNullable()
        table.date("end_at").unsigned().notNullable()
        table.string("grads").unsigned().notNullable()
        table
            .foreign("homework_id")
            .references("id")
            .inTable("homework")
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
