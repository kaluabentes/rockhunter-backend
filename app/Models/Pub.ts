import { DateTime } from "luxon"
import {
  BaseModel,
  column,
  beforeSave,
  afterFind,
  afterFetch,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm"
import Hash from "@ioc:Adonis/Core/Hash"
import Drive from "@ioc:Adonis/Core/Drive"

import Event from "./Event"

export interface Location {
  longitude: number
  latitude: number
}

export default class Pub extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Event)
  public events: HasMany<typeof Event>

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
  public location: Location

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
