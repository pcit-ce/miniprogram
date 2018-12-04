// pages/repo/repo.wxml.js

import { IMyApp } from '../../app';

let app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    repos: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options: any) {
    let { git_type, username } = options;

    let pcit = new app.pcit.PCIT(
      app.globalData.PCIT_TOKEN,
      app.globalData.PCIT_ENTRYPOINT,
    );

    const pcit_repo = pcit.repo;

    pcit_repo.listByOwner(git_type, username).then((res: any) => {
      let repos = res.data;
      this.setData!({
        repos,
      });
      console.log(this.data.repos);
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
});
