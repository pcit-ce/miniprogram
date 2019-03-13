import { IMyApp } from '../../../app';

const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isDark: false,
    rate: 0,
    topHeight: 0,
    systemInfo: {},
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.getTheme();
    this.getRate();
    this.setData!({
      topHeight: app.globalData.topHeight,
    });

    wx.getSystemInfo({
      success: res => {
        this.setData!({
          systemInfo: res,
        });
      },
    });

    wx.getUserInfo({
      success: res => {
        this.setData!({
          userInfo: res.userInfo,
        });
      },
    });
  },

  getRate() {
    this.getStorage('rate').then((rate: any) => {
      this.setData!({
        rate,
      });
    });
  },

  getTheme() {
    wx.getStorage({
      key: 'theme',
      success: res => {
        this.setData!({
          isDark: res.data === 'dark',
        });
      },
    });
  },

  getStorage(key: string) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success(res) {
          resolve(res.data);
        },
        fail(e) {
          reject(e);
        },
      });
    });
  },

  setStorage(key: string, data: string) {
    wx.setStorage({
      key,
      data,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(): any {},

  themeChange(res: any) {
    console.log(res);
    const isDark = res.detail.value;

    this.setData!({
      isDark,
    });

    let theme = isDark ? 'dark' : 'light';

    app.globalData.theme = theme;

    wx.setStorage({
      key: 'theme',
      data: theme,
    });
  },

  rate(res: any) {
    console.log(res);

    const rate = res.detail.index;

    this.setData!({
      rate,
    });

    this.setStorage('rate', rate);
  },
});
