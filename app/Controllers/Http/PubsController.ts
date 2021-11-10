import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { schema, rules } from "@ioc:Adonis/Core/Validator"
import Pub from "App/Models/Pub"

export default class PubsController {
  public async index({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const newStoreSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: "pubs", column: "email" }),
      ]),
      password: schema.string({}, [rules.confirmed("passwordConfirmation")]),
      description: schema.string.optional(),
      coordinates: schema.object.optional().members({
        latitude: schema.number(),
        longitude: schema.number(),
      }),
      city: schema.string.optional(),
      country: schema.string.optional(),
    })
    const payload = await request.validate({ schema: newStoreSchema })

    return Pub.create(payload)
  }

  public async upload({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
