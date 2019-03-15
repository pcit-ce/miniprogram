export default class ParseRepo {
  static handler(username: string, repo: string) {
    return repo === '' ? username : `${username}/${repo}`;
  }
}
