// pages/more/index.js

import { IMyApp } from '../../app';

const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    alpha: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {},

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

  openFaceAI() {
    wx.navigateTo({
      url: '/pages/aiface/index',
    });
  },

  openOCRAI() {
    wx.navigateTo({
      url: '/pages/aiocr/index',
    });
  },

  openChat() {
    wx.showModal({
      title: '即将支持',
      content: '敬请期待',
    });
  },

  openClub() {
    wx.showModal({
      title: '即将支持',
      content: '敬请期待',
    });
  },

  openSystem() {
    wx.getSystemInfo({
      success(res) {
        wx.showModal({
          title: '系统信息',
          content: JSON.stringify(res),
        });
      },
    });
  },

  openUpdate() {
    const um = wx.getUpdateManager();

    um.onCheckForUpdate(res => {
      console.log(res);

      if (!res.hasUpdate) {
        wx.showToast({
          title: '未发现新版本',
        });

        return;
      }

      wx.showModal({
        title: '发现新版本',
        content: '重启应用',
        success(res) {
          console.log(res);

          um.applyUpdate();
        },
      });
    });
  },

  openCXYL() {
    wx.navigateToMiniProgram({
      appId: 'wx767dab1b29691501',
      path: 'pages/index/index?from=pcitce',
      extraData: {
        foo: 'bar',
      },
      success(res) {
        console.log(res);
      },
    });
  },

  openChangelog() {
    wx.showLoading({
      title: '加载中',
    });

    (async () => {
      const result: any = await new Promise(resolve => {
        wx.request({
          url: app.globalData.PCIT_ENTRYPOINT + '/ci/changelog',
          success(res: any) {
            resolve(res.data.data);
          },
        });
      });

      app.globalData.MDData = result;

      wx.hideLoading({});

      wx.navigateTo({
        url: './markdown',
      });
    })();
  },
});