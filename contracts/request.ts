declare module "@ioc:Adonis/Core/Request" {
  interface RequestContract {
    pub: {
      id: number
      name: string
    }
  }
}
