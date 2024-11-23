const tableName = "assignment"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary()
        table.integer("course_id").unsigned().notNullable()
        table.integer("student_id").unsigned().notNullable()
        table.integer("teacher_id").unsigned().notNullable()
        table
            .foreign("course_id")
            .references("id")
            .inTable("courses")
            .onDelete("CASCADE")
        table
            .foreign("student_id")
            .references("id")
            .inTable("students")
            .onDelete("CASCADE")
        table
            .foreign("teacher_id")
            .references("id")
            .inTable("teachers")
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
