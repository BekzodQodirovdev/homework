const tableName = "otp";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("user_id").notNullable();
        table.integer("otp_code").notNullable();
        table.timestamp("expires_at").defaultTo(knex.fn.now().plus(15 * 60 * 1000));
        table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable(tableName);
}
