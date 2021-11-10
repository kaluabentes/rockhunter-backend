import { DateTime } from "luxon"
import { BaseModel, column, beforeSave } from "@ioc:Adonis/Lucid/Orm"
import Hash from "@ioc:Adonis/Core/Hash"

export default class Pub extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public logo: string

  @column()
  public cover: string

  @column()
  public description: string

  @column()
  public coordinates: object

  @column()
  public city: string

  @column()
  public country: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(pub: Pub) {
    if (pub.$dirty.password) {
      pub.password = await Hash.make(pub.password)
    }
  }
}