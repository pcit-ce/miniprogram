import Request from '../Client/Request';
import Token from '../Auth/Token';
import ParseRepo from '../Support/ParseRepo';

export default class Starring {
  public url: string;

  constructor(url: string) {
    this.url = url;
  }

  listStargazers() {}

  listRepoBeingStarred() {}

  checkIfStarringRepo() {}

  star(username: string, repo: string = '') {
    repo = ParseRepo.handler(username, repo);
    const url = this.url + 'user/starred/' + repo;
    const header = {
      Authorization: 'Basic ' + Token.get(),
    };

    return Request.request(url, 'PUT', header);
  }

  unstar(username: string, repo: string = '') {
    repo = ParseRepo.handler(username, repo);
    const url = this.url + 'user/starred/' + repo;

    return Request.request(url, 'DELETE');
  }
}
