//app.js

import TencentAI from '@khs1994/tencent-ai';

const Towxml = require('/towxml/main');
const PCIT = require('@pcit/pcit-js');

export interface IMyApp {
  userInfoReadyCallback?(res: wx.UserInfo): void;

  globalData: {
    userInfo?: wx.UserInfo;
    PCIT_HOST: string;
    PCIT_ENTRYPOINT: string;
    PCIT_TOKEN: any;
    TENCENT_AI_APP_KEY: any;
    TENCENT_AI_APP_ID: any;
    tencentAI: any;
    cloudEnv: string;
    MDData: string;
  };
  towxml: any;
  pcit: any;
  tencentAI: any;
  getSecret(): void;
}

App<IMyApp>({
  getSecret(): void {
    // 云函数
    wx.cloud.init({
      env: this.globalData.cloudEnv,
    });

    const db = wx.cloud.database();
    const secrets = db.collection('secrets');

    secrets
      .where({ app: 'tencent_ai' })
      .get()
      .then(
        res => {
          console.log(res);
          let { app_key, app_id } = res.data[0];

          console.log(app_key, app_id);

          this.globalData.TENCENT_AI_APP_ID = app_id;
          this.globalData.TENCENT_AI_APP_KEY = app_key;

          this.tencentAI = new TencentAI(
            this.globalData.TENCENT_AI_APP_KEY,
            this.globalData.TENCENT_AI_APP_ID,
          );

          console.log(this.tencentAI);
        },
        e => console.log(e),
      );
  },

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: (res: any) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        // 获取密钥
        this.getSecret();
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res: any) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
  globalData: {
    userInfo: undefined,
    PCIT_HOST: 'ci.khs1994.com',
    PCIT_ENTRYPOINT: 'https://ci.khs1994.com/api',
    // PCIT_HOST: 'ci.khs1994.com:10000',
    // PCIT_ENTRYPOINT: 'https://ci2.khs1994.com:10000/api',
    PCIT_TOKEN: '',
    TENCENT_AI_APP_KEY: '',
    TENCENT_AI_APP_ID: '',
    tencentAI: TencentAI,
    cloudEnv: 'pro-1e94dd',
    MDData: '',
  },
  towxml: new Towxml(),
  pcit: PCIT,
  tencentAI: new TencentAI('x', 'x'),
});
