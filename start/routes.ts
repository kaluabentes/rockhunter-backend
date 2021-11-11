/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route"

Route.get("/api/v1/pubs", "PubsController.index")
Route.post("/api/v1/pubs", "PubsController.store")
Route.get("/api/v1/pubs/:id", "PubsController.show")
Route.patch("/api/v1/pubs/:id", "PubsController.update").middleware("pubAuth")
Route.delete("/api/v1/pubs/:id", "PubsController.destroy")
Route.post("/api/v1/pubs/:id/upload", "PubsController.upload")
Route.post("/api/v1/pubs/login", "PubsController.login")

Route.get("/api/v1/events", "EventsController.index")
Route.post("/api/v1/events", "EventsController.store").middleware("pubAuth")
Route.post("/api/v1/events/:id", "EventsController.upload").middleware(
  "pubAuth"
)
