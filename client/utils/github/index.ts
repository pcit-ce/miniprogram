import Trending from './src/Trending/index';
import GitData from './src/GitData/index';
import Auth from './src/Auth/index';
import Activity from './src/Activity/index';

class GitHub {
  public activity: Activity;
  public trending: Trending;
  public gitData: GitData;
  public auth: Auth;

  constructor(
    url: string = 'https://ci.khs1994.com/proxy_github_api/',
    public token?: string,
  ) {
    this.activity = new Activity(url);
    this.trending = new Trending();
    this.gitData = new GitData(url);
    this.auth = new Auth(url);
  }
}

export default GitHub;
