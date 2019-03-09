import { IMyApp } from '../../../app';

const app = getApp<IMyApp>();
const fs = wx.getFileSystemManager();
const filePath = `${wx.env.USER_DATA_PATH}/src.jpg`;

import * as aicommon from '../aicommon/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: '',
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
  onShow: function() {
    try {
      fs.accessSync(filePath);

      this.setData!({
        src: '',
      });

      this.setData!({
        src: filePath,
      });
    } catch (e) {
      this.setData!({
        src: '',
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    fs.unlink({ filePath });

    this.setData!({
      src: '',
    });
  },

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

  takephoto() {
    wx.navigateTo({
      url: '../aicamera/backcamera',
    });
  },

  imagetotext() {
    let image = this.data.src;

    image = aicommon.getImage(image);

    if (!image) {
      return;
    }

    (async () => {
      const session = new Date().getTime.toString();
      const result = await app.tencentAI.image.imgtotext(image, session);

      console.log(result);

      this.setData!({
        output: result.data.text,
      });
    })();
  },
});
