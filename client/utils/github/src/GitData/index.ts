import Request from '../Client/Request';

class GitData {
  public url: string;

  constructor(url: string) {
    this.url = url;
  }

  readme(username: string, project: string = '') {
    let url = project === '' ? username : username + '/' + project;
    let branch = 'master';
    url =
      'https://ci.khs1994.com/proxy_github_raw/' +
      url +
      '/' +
      branch +
      '/README.md';

    return Request.request(url);
  }
}

export default GitData;
