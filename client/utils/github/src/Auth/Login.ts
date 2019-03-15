import Request from '../Client/Request';

const fs = wx.getFileSystemManager();

export default class Login {
  public url: string;

  constructor(url: string) {
    this.url = url;
  }

  login(username: string, password: string) {
    const url = this.url + 'user';

    fs.writeFileSync(
      `${wx.env.USER_DATA_PATH}/github_token`,
      `${username}:${password}`,
      'utf-8',
    );

    const token = fs.readFileSync(
      `${wx.env.USER_DATA_PATH}/github_token`,
      'base64',
    );

    const header = {
      Authorization: 'Basic ' + token,
    };

    return new Promise((resolve, reject) => {
      Request.request(url, 'GET', header).then(
        (res: any) => {
          if (res.ok) {
            // 登录成功
            resolve(true);
          } else {
            // 登录失败
            fs.unlinkSync(`${wx.env.USER_DATA_PATH}/github_token`);
            reject(false);
          }
        },
        () => {
          // 登录失败
          // console.log(res);
          fs.unlinkSync(`${wx.env.USER_DATA_PATH}/github_token`);
          reject(false);
        },
      );
    });
  }

  logout() {
    fs.unlinkSync(`${wx.env.USER_DATA_PATH}/github_token`);
  }
}
