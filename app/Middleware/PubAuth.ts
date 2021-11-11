import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import jwt from "jsonwebtoken"
import Env from "@ioc:Adonis/Core/Env"

export default class PubAuth {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (!request.header("Authorization")) {
      response.unauthorized({ error: "Unauthorized" })
      return
    }

    const authHeader = request.header("Authorization")
    const token = authHeader?.replace("Bearer ", "")

    try {
      const payload = jwt.verify(token, Env.get("JWT_SECRET"))

      if (!payload) {
        response.unauthorized({ error: "Unauthorized" })
        return
      }

      request.pub = payload
    } catch (error) {
      response.unauthorized(error.message)
      return
    }

    await next()
  }
}
