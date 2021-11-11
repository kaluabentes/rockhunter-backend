declare module "@ioc:Adonis/Core/Request" {
  interface RequestContract {
    pub: {
      sub: number
      type: string
    }
  }
}
