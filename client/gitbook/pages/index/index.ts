// pages/docker/index.js

import { IMyApp } from '../../../app';

const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: '',
    gitbook: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options: any) {
    this.setData!({
      gitbook: options.gitbook,
    });
  },

  request(url: string): any {
    return new Promise((resolve: any, reject: any) => {
      wx.request({
        url,
        success(res: any) {
          resolve(res.data);
        },
        fail(e) {
          reject(e);
        },
      });
    });
  },

  show() {
    let summary_url = `https://gitee.com/pcit-ce/gitbook/raw/master/${
      this.data.gitbook
    }/SUMMARY.md`;
    let summary_json_url = `https://gitee.com/pcit-ce/gitbook/raw/master/${
      this.data.gitbook
    }/SUMMARY.json`;

    Promise.all([
      this.request(summary_url),
      this.request(summary_json_url),
    ]).then(res => {
      // console.log(res);

      const data = app.towxml.toJson(res[0], 'markdown');

      data.theme = 'light';

      this.setData!({
        data,
      });

      app.globalData.summaryData = res[1];
    });

    // wx.setNavigationBarColor({
    //   backgroundColor: theme === 'dark' ? '#000000': '#ffffff',
    //   frontColor: theme === 'dark' ? '#ffffff': '#000000',
    //   animation: {},
    // });

    setTimeout(() => wx.hideLoading({}), 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.show();
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
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(): any {
    return {
      title: '开始 Docker 之旅~',
      imageUrl:
        'https://gitee.com/docker_practice/docker_practice/raw/master/_images/cover.jpg',
      success() {
        console.log(1);
        wx.showToast({
          title: '感谢支持',
        });
      },
      fail() {
        wx.showToast({
          title: '转发失败',
          icon: 'success',
        });
      },
    };
  },
  __bind_touchend() {},
  __bind_touchstart() {},

  __bind_tap() {},

  __bind_touchmove() {},

  __bind_touchcancel() {},
});
