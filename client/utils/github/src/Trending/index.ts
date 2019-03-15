import Request from '../Client/Request';

class Trending {
  get(language: string = 'php', since: string = 'today') {
    let url =
      'https://github-trending-api.now.sh/' +
      `repositories?language=${language}&since=${since}`;

    url = `https://ci.khs1994.com/api/ci/github_trending/${language}/${since}`;

    return Request.request(url);
  }
}

export default Trending;
