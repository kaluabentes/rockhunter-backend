import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Events extends BaseSchema {
  protected tableName = "events"

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table
        .integer("pub_id")
        .unsigned()
        .references("pubs.id")
        .onDelete("CASCADE")
      table.string("name")
      table.text("description")
      table.string("flyer")
      table.string("schedule")
      table.date("date")
      table.timestamp("created_at", { useTz: true })
      table.timestamp("updated_at", { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
