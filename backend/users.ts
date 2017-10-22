export class User {
  constructor(public email: string, public username: string, private password: string) { }
  matches(another: User): boolean {
    return another !== undefined && another.email === this.email && another.password === this.password
  }
}

export const users: { [key: string]: User } = {
  'burro@gmail.com': new User('burro@gmail.com', 'BurroChataoDoShrek', 'burro123'),
  'marmota@gmail.com': new User('marmota@gmail.com', 'MarmotaInvader', 'marmota456'),
  'taturana@gmail.com': new User('taturana@gmail.com', 'TaturanaTatu', 'taturana789')
}
