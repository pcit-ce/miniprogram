import { IMyApp } from '../../../app';

const app = getApp<IMyApp>();

const fs = wx.getFileSystemManager();

const filePath = `${wx.env.USER_DATA_PATH}/audio.mp3`;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    input: '',
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

  bindinput(res: any) {
    this.setData!({
      input: res.detail.value,
    });
  },

  bindconfirm(res: any) {
    console.log(res);
  },

  async tta() {
    const text = this.data.input;

    try {
      let result = await app.tencentAI.speech.tta(text, 0);

      await new Promise((resolve, reject) => {
        fs.writeFile({
          filePath,
          data: result.data.voice,
          encoding: 'base64',
          success() {
            resolve(true);
          },
          fail() {
            reject(false);
          },
        });
      });

      const cia = wx.createInnerAudioContext();

      cia.src = filePath;

      cia.autoplay = true;
    } catch (e) {
      this.showModal(undefined, e);
    }
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
