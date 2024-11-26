const tableName = "users"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.string("email").unique().notNullable()
        table.string("password").notNullable()
        table.enum("role", ["admin", "user"]).notNullable().defaultTo("user")
        table.boolean("is_active").defaultTo(false)
        table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable(tableName)
}
