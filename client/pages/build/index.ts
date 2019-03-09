// pages/upload/index.js

import { IMyApp } from '../../app';
const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData!({
      topHeight: app.globalData.topHeight,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.startSoterAuthentication({
      requestAuthModes: 'fingerPrint',
      challenge: '123456',
      authContent: '请用指纹解锁',
      success(res) {
        console.log(res);
      },
      fail(e) {
        console.log(e);
      },
    });
  },

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
});
