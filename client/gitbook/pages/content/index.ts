import { IMyApp } from '../../../app';

const app = getApp<IMyApp>();
import { next, before } from './lib/next_page';
// const MenuData = require('../index/summary.js');

let MDData = '';

Page({
  data: {
    useWemark: false,
    wemarkType: 'rich-text', // wemark
    data: '',
    key: '',
    next_key: '',
    before_key: '',
    // startX: '',
    // startY: '',
    // endX: '',
    // endY: '',
    // percent: 0,
    intervalNum: 0,
    progressColor: '#36a1f0',
    showMenu: false,
    // MDData: '',
    folder: '',
    showNotice: true,
    noticeBGColor: '#fff',
    tabbarMode: 'light',
    gitbook: '',
    branch: 'master',
    theme: 'light',
    cache: true,
    mdCacheKey: '',
    wxMarkdownRichtext: true,
  },
  onUnload() {
    app.globalData.MDData = '';
  },
  onLoad(options: any) {
    console.log('onload');

    let { gitbook, branch } = options;
    console.log(gitbook, branch);
    // let useWemark = app.globalData.mdEngine === 'wemark';
    let mdEngine = wx.getStorageSync('system/md-engine');
    let useWemark = false;
    let wemarkType = 'rich-text';
    let wxMarkdownRichtext = true;

    if (mdEngine === 'wemark') {
      useWemark = true;
      wemarkType = 'wemark';
    } else if (mdEngine === 'wemark-richtext') {
      useWemark = true;
    } else if (mdEngine === 'wx-markdown') {
      wxMarkdownRichtext = false;
    }

    let theme: any = app.globalData.theme;

    const noticeBGColor = theme === 'dark' ? '#000000' : '#ffffff';

    if (noticeBGColor === '#000000') {
      wx.setBackgroundColor({
        backgroundColor: noticeBGColor,
      });
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: noticeBGColor,
        animation: {},
      });
    } else {
      wx.setBackgroundTextStyle({
        textStyle: 'dark',
      });
    }

    this.setData!({
      gitbook,
      useWemark,
      wemarkType,
      wxMarkdownRichtext,
      noticeBGColor,
      tabbarMode: theme,
      branch,
    });

    this.load(options);
  },
  onPullDownRefresh() {
    this.request(this.data.key, false);

    setTimeout(() => wx.stopPullDownRefresh({}), 2000);
  },
  load(options: any) {
    wx.showLoading({
      title: '加载中',
    });

    this.setData!({
      // percent: 0,
      progressColor: '#36a1f0',
      showNotice: true,
    });

    let { key } = options;

    let folder = this.getFolder(key);

    this.setData!({
      folder,
    });

    let next_key = next(key);
    let before_key = before(key);

    console.log(next_key, before_key);

    next_key = next_key ? next_key : '';
    before_key = before_key ? before_key : '';

    this.setData!({
      key,
      next_key,
      before_key,
      // intervalNum,
    });

    console.log(before_key, key, next_key);

    this.request(key);
  },

  getFolder(key: string) {
    let key_array = key.split('/');
    let key_array_length = key_array.length;

    if (key_array_length === 1) {
      return '/';
    }

    key_array.length = key_array.length - 1;

    return key_array.join('/') + '/';
  },

  show(key: string, isCache: boolean = false) {
    let data;
    let mdCacheKey = `${this.data.gitbook}_${this.data.branch}_${key}`;

    this.setData({
      cache: isCache,
    });

    if (isCache) {
      data = wx.getStorageSync(mdCacheKey);
    } else {
      data = MDData;

      wx.setStorageSync(mdCacheKey, data);
    }

    const theme = app.globalData.theme;

    this.setData!({
      // cache: isCache,
      mdCacheKey,
      data,
      theme,
    });

    wx.pageScrollTo({
      scrollTop: 0,
      duration: 700,
    });

    wx.hideLoading();
  },
  onShareAppMessage: function(): any {
    return {
      title: this.data.gitbook,
      path: '/pages/docker/index/index',
      imageUrl:
        'https://gitee.com/docker_practice/docker_practice/raw/master/_images/cover.jpg',
      fail() {
        wx.showToast({
          title: '转发失败',
          icon: 'success',
        });
      },
    };
  },
  tabbar(res: any) {
    const key = res.detail.key;
    switch (key) {
      case 'next':
        this.next();
        break;
      case 'before':
        this.before();
        break;
      default:
        this.menu();
    }
  },
  next() {
    const [, next_key] = <any>this.data.next_key;

    // wx.redirectTo({
    //   url: './content?key='+ next_key,
    // });
    this.load({ key: next_key });

    if (!next_key) {
      wx.showToast({
        title: '没有了',
      });
      return;
    }
  },
  before() {
    const [, before_key] = <any>this.data.before_key;

    if (!before_key) {
      wx.showToast({
        title: '没有了',
      });
      return;
    }

    // wx.redirectTo({
    //   url: './content?key='+ before_key,
    // });
    this.load({ key: before_key });
  },

  menu() {
    // this.setData!({
    //   MenuData,
    //   showMenu: true,
    // });

    wx.navigateBack({
      delta: 1,
    });
  },

  menuClose() {
    this.setData!({
      showMenu: false,
    });
  },

  request(key: any, cache: boolean = true) {
    if (!key) {
      return;
    }

    console.log(key);

    wx.getStorageInfo({
      success(res) {
        console.log(res);
      },
    });

    if (
      cache &&
      wx.getStorageSync(`${this.data.gitbook}_${this.data.branch}_${key}`)
    ) {
      this.show(key, true);

      return;
    }

    // @ts-ignore
    // wx.reportAnalytics('pages', {
    //   page: key,
    // });

    // const base_url = 'https://gitee.com/docker_practice/docker_practice/raw/master';

    // const base_url = app.globalData.baseUrl;

    // let url = `https://ci.khs1994.com/proxy_github_raw/yeasy/docker_practice/master/${key}`;

    // let url = `${base_url}/${key}`;

    // if (key === 'README.md' || key === 'miniprogram.md') {
    //   // url = 'https://ci.khs1994.com/proxy_github_raw/khs1994-docker/docker_practice/master/README.md';
    //   url = `https://gitee.com/khs1994-docker/docker_practice/raw/master/${key}`;
    // }

    let { gitbook, branch } = this.data;

    branch = branch || 'master';

    let url = `https://gitee.com/khs1994-website/${gitbook}/raw/${branch}/${key}`;

    // url 解码
    // url = decodeURIComponent(url);

    wx.request({
      url,
      success: (res: any) => {
        MDData = res.data;

        async function requestImg(folder: string) {
          await new Promise((resolve, reject) => {
            wx.getNetworkType({
              success(res) {
                const networkType = res.networkType;

                // if (networkType !== 'wifi') {
                //   wx.showToast({
                //     title: '无图模式',
                //   });
                //
                //   reject('not wifi');
                // }

                resolve(networkType);
              },
              fail(e) {
                reject(e);
              },
            });
          });

          let result = MDData.match(/\!\[.*?\)/g);

          if (result) {
            for (let item of result) {
              // let img = item.split('(')[1].split(')')[0];
              // let new_item = `![](${base_url}/${folder}${img})`;
              folder = folder;
              // console.log(item, new_item);
              MDData = MDData.replace(item, '');
            }
          }

          return MDData;
        }
        requestImg(this.data.folder)
          .then(res => {
            // this.setData!({
            //   MDData,
            // });
            MDData = res;
            this.show(key);
          })
          .catch(() => {
            // this.setData!({
            //   MDData,
            // });
            this.show(key);
          });
      },
      fail() {
        wx.showToast({
          title: '网络连接失败',
          icon: 'loading',
        });
      },
    });
  },
  __bind_touchend() {
    // console.log('触摸结束');
    // console.log(res);
    // let endX= res.changedTouches[0].pageX;
    // let endY = res.changedTouches[0].pageY;
    //
    // let diff_y = endY - <any>this.data.startY;
    // let diff_x = endX - <any>this.data.startX;
    //
    // console.log(diff_x,diff_y);
    //
    // if(Math.abs(diff_y) > 10 ){
    //   return;
    // }
    //
    // diff_x > 40 && this.before();
    // diff_x < -40 && this.next();
  },
  __bind_touchstart() {
    // console.log('触摸开始');
    // console.log(res);
    // let startX=res.touches[0].pageX;
    // let startY = res.changedTouches[0].pageY;
    //
    // this.setData!({
    //   startX,
    //   startY,
    // });
  },

  __bind_touchmove() {
    // console.log('触摸中');
    // console.log(res);
  },

  __bind_tap() {
    console.log(111);
  },

  __bind_touchcancel() {},
});
