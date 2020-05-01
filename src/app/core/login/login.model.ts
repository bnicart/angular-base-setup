export class LoginDetail {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export interface LoginReponse {
  token: string;
}
