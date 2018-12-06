// pages/profile/index.js

import { IMyApp } from '../../app';

const app = getApp<IMyApp>();
const fs = wx.getFileSystemManager();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pic: '',
    git_type: '',
    orgs: [],
    login_tips: true,
    show_logout: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.login();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onshow');
    // this.login();
  },

  logout() {
    let git_type = 'github';

    this.setData!({
      login_tips: true,
    });

    fs.unlinkSync(`${wx.env.USER_DATA_PATH}/token_${git_type}`);

    app.globalData.PCIT_TOKEN = '';
  },

  login() {
    let git_type = 'github';

    // 读取 token 文件
    try {
      app.globalData.PCIT_TOKEN = fs.readFileSync(
        `${wx.env.USER_DATA_PATH}/token_${git_type}`,
        'utf8',
      );
    } catch (e) {
      console.log(e);
    }

    console.log(app.globalData.PCIT_TOKEN);

    // token 不存在
    if (!app.globalData.PCIT_TOKEN) {
      // 登录模态窗
      wx.stopPullDownRefresh({});
      wx.showModal({
        title: '登录',
        content: '立即使用 GitHub 账号登录',
        success(res: wx.ShowModalSuccessCallbackResult) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/profile/login',
            });
          } else {
          }
        },
      });

      return;
    }

    this.setData!({
      login_tips: false,
    });

    // TODO 检查 token 过期
    const pcit = new app.pcit.PCIT(
      app.globalData.PCIT_TOKEN,
      app.globalData.PCIT_ENTRYPOINT,
    );

    const pcit_user = pcit.user;
    const pcit_org = pcit.org;

    wx.showLoading({
      title: '加载中',
    });

    wx.showNavigationBarLoading({});

    // 展示用户界面
    pcit_user.current().then((res: any) => {
      console.log(res);
      let { username, git_type, pic } = res.data[0];

      pic = pic.replace(
        /a.*?com/g,
        app.globalData.PCIT_HOST + '/proxy_github_image',
      );

      this.setData!({ username, git_type, pic });
    });

    // 展示用户组织列表
    pcit_org.list().then((res: any) => {
      console.log(res);
      let orgs = res.data;

      for (let item in orgs) {
        let pic = orgs[item]['pic'];
        let new_pic = pic.replace(
          /a.*?com/g,
          app.globalData.PCIT_HOST + '/proxy_github_image',
        );

        console.log(new_pic);

        orgs[item]['pci'] = new_pic;
      }

      this.setData!({ orgs });

      setTimeout(() => {
        wx.hideLoading({});
        wx.hideNavigationBarLoading({});
        wx.stopPullDownRefresh({});
        this.setData!({
          show_logout: true,
        });
      }, 600);
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading({
      success() {
        console.log('success');
      },
    });

    this.login();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(): any {},

  toRepo(event: any) {
    let username = event.currentTarget.dataset.username;
    wx.navigateTo({
      url: `/pages/repo/repo?git_type=${
        this.data.git_type
      }&username=${username}`,
    });
  },
});
