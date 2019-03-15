const fs = wx.getFileSystemManager();

export default class Token {
  public url: string;

  constructor(url: string) {
    this.url = url;
  }

  static store() {}

  static get() {
    return fs.readFileSync(`${wx.env.USER_DATA_PATH}/github_token`, 'base64');
  }
}
