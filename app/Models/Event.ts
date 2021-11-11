import { DateTime } from "luxon"
import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm"
import Pub from "./Pub"

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Pub)
  public pub: HasOne<typeof Pub>

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public flyer: string

  @column()
  public schedule: string

  @column.dateTime()
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
