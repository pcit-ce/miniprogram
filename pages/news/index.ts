// pages/news/index.js
let common = require('common.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    news: [
      {
        id: 100,
        type: 'success',
        title: '2018 年余额已不足',
        desc: 'Add oil',
      },
      {
        id: 1000,
        type: 'info',
        title: 'tool + social',
        desc: 'pcit based ai',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    common.sayHello();
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

  close(res: any) {
    console.log(res);
  },
});
