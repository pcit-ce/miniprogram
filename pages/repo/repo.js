// pages/repo/repo.wxml.js

let app = getApp();

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
  onLoad: function(options) {
    let { git_type, username } = options;

    let pcit = require('@pcit/pcit-js');

    let pcit_repo = new pcit.Repo(
      app.globalData.PCIT_TOKEN,
      app.globalData.PCIT_ENTRYPOINT,
    );

    pcit_repo.listByOwner(git_type, username).then(res => {
      let repos = res.data;
      this.setData({
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
  onShareAppMessage: function() {},
});
