// pages/ai/translate/index.js

import { IMyApp } from '../../../app';
const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    source: 0,
    target: 1,
    sourceAvailable: ['中文', '英文'],
    targetAvailable: ['中文', '英文'],
    topHeight: 0,
  },

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

  textTranslate() {
    console.log(this.data.input);

    (async () => {
      const result = await app.tencentAI.translate.texttranslate(
        this.data.input,
      );

      this.setData!({
        input: result.data.target_text,
      });
    })().catch(e => this.showModal(undefined, e));
  },

  selectSource(res: any) {
    this.setData!({
      source: res.detail.value,
    });
  },

  selectTarget(res: any) {
    console.log(res);
  },

  bindinput(res: any) {
    this.setData!({
      input: res.detail.value,
    });
  },

  showModal(
    title: string = '出错啦',
    content: any,
    isJson: boolean = true,
    showCancel: boolean = false,
  ) {
    wx.showModal({
      title,
      content: isJson ? JSON.stringify(content) : content,
      showCancel,
    });
  },
});
