import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Pubs extends BaseSchema {
  protected tableName = "pubs"

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")

      table.string("name", 50)
      table.string("email")
      table.string("password")
      table.string("logo")
      table.string("cover")
      table.text("description")
      table.json("location")
      table.string("country")
      table.string("city")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true })
      table.timestamp("updated_at", { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
