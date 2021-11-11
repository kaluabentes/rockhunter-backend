import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { schema, rules } from "@ioc:Adonis/Core/Validator"
import Event from "App/Models/Event"

export default class EventsController {
  public async index({}: HttpContextContract) {
    return Event.all()
  }

  public async store({ request }: HttpContextContract) {
    const createEventSchema = schema.create({
      name: schema.string(),
      description: schema.string(),
      schedule: schema.string(),
      date: schema.string({}, [rules.regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)]),
    })
    const payload = await request.validate({
      schema: createEventSchema,
      messages: {
        "date.regex": "Format invalid, please follow the format YYYY-MM-DD",
      },
    })

    return await Event.create({
      ...payload,
      pub_id: request.pub.sub,
    })
  }

  public async upload({ request, params }: HttpContextContract) {
    const uploadSchema = schema.create({
      flyer: schema.file(),
    })
    const { flyer } = await request.validate({ schema: uploadSchema })

    await flyer.moveToDisk("./")

    const event = (await Event.find(params.id)) as Event
    event.flyer = flyer.fileName as string
    return await event?.save()
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
