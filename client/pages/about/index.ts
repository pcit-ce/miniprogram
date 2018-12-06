// pages/about/index.js

import { IMyApp } from '../../app';

const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    about_data: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.main();
  },

  main() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });

    const pcit = new app.pcit.PCIT('', app.globalData.PCIT_ENTRYPOINT);

    const pcit_system = pcit.system;

    pcit_system.about().then(
      (res: any) => {
        let data = app.towxml.toJson(res.data.data, 'markdown');

        data.theme = 'light';

        this.setData!({
          about_data: data,
        });

        setTimeout(() => wx.hideLoading({}), 900);
      },
      (e: any) => {
        console.log(e);

        wx.hideLoading({});

        wx.showModal({
          title: '出错啦',
          content: JSON.stringify(e),
        });
      },
    );
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

  __bind_touchend() {},
  __bind_touchstart() {},

  __bind_tap() {},

  __bind_touchmove() {},

  __bind_touchcancel() {},

  copy(e: any) {
    console.log(e);
    wx.setClipboardData({
      data: e._relatedInfo.anchorTargetText,
      success() {
        wx.showModal({
          title: '复制成功',
          content: '粘贴到浏览器访问',
          showCancel: false,
        });
      },
    });
  },
});
