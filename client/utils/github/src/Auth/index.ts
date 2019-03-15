import Login from './Login';
import Token from './Token';

export default class Auth {
  public login: Login;
  public token: Token;

  constructor(public url: string) {
    this.login = new Login(url);
    this.token = new Token(url);
  }
}
