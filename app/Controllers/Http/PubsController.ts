import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { schema, rules } from "@ioc:Adonis/Core/Validator"
import Hash from "@ioc:Adonis/Core/Hash"
import Env from "@ioc:Adonis/Core/Env"
import jwt from "jsonwebtoken"

import Pub, { Location } from "App/Models/Pub"

export default class PubsController {
  public async index({}: HttpContextContract) {
    return Pub.all()
  }

  public async store({ request }: HttpContextContract) {
    const newStoreSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: "pubs", column: "email" }),
      ]),
      password: schema.string({}, [rules.confirmed("passwordConfirmation")]),
      description: schema.string.optional(),
      location: schema.object.optional().members({
        latitude: schema.number(),
        longitude: schema.number(),
      }),
      city: schema.string.optional(),
      country: schema.string.optional(),
    })
    const payload = await request.validate({ schema: newStoreSchema })

    return Pub.create(payload)
  }

  public async upload({ request, params }: HttpContextContract) {
    const uploadSchema = schema.create({
      cover: schema.file(),
      logo: schema.file(),
    })
    const payload = await request.validate({ schema: uploadSchema })

    const cover = payload.cover
    const logo = payload.logo

    await cover?.moveToDisk("./")
    await logo?.moveToDisk("./")

    const pub = (await Pub.find(params.id)) as Pub
    pub.cover = cover?.fileName as string
    pub.logo = logo?.fileName as string
    return pub.save()
  }

  public async update({ request, params }: HttpContextContract) {
    const updateStoreSchema = schema.create({
      name: schema.string.optional({ trim: true }),
      password: schema.string.optional(),
      description: schema.string.optional(),
      location: schema.object.optional().members({
        latitude: schema.number(),
        longitude: schema.number(),
      }),
      city: schema.string.optional(),
      country: schema.string.optional(),
    })

    const payload = await request.validate({ schema: updateStoreSchema })
    const pub = (await Pub.find(params.id)) as Pub
    pub.name = payload.name as string
    pub.password = payload.password as string
    pub.description = payload.description as string
    pub.location = payload.location as Location
    pub.city = payload.city as string
    pub.country = payload.country as string
    return await pub.save()
  }

  public async show({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async login({ request, response }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.exists({ table: "pubs", column: "email" }),
      ]),
      password: schema.string(),
    })
    const { email, password } = await request.validate({ schema: loginSchema })
    const pub = (await Pub.findBy("email", email)) as Pub

    if (!(await Hash.verify(pub.password, password))) {
      return response.badRequest("Invalid credentials")
    }

    return jwt.sign(
      {
        sub: pub.id,
        name: pub.name,
        type: "pub",
      },
      Env.get("JWT_SECRET")
    )
  }
}
