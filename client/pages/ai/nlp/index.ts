// pages/ai/nlp/index.js

import { IMyApp } from '../../../app';

const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    input: '',
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

  wordseg() {
    (async () => {
      const result = await app.tencentAI.nlp.wordseg(this.data.input);

      console.log(result);

      this.setData!({
        input: JSON.stringify(result.data),
      });
    })().catch(e => this.showModal(undefined, e));
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
