// pages/ocrai/index.js

import { IMyApp } from '../../app';

const app = getApp<IMyApp>();

const aiCommon = require('../aicommon/index');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    template_data: {
      src: '',
      device_position: 'back',
    },
    data: '',
    text: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(): any { },

  general() {
    let image = this.getImage();

    if (!image) {
      return;
    }

    (async () => {
      wx.showLoading({
        title: '处理中'
      });

      let result = await app.tencentAI.ocr.generalocr(image);
      let data: Array<string> | string = [];

      for (let item of result.data.item_list) {
        data.push(item.itemstring);
      }

      // ocr 结果
      data = data.join('');

      this.setData!({
        data,
        text: data,
      });

      wx.hideLoading({});

      this.showModal();

      // result = await app.tencentAI.nlp.wordseg(data);

      // console.log(result);

      data = data.slice(0, 50);

      console.log(data);

      let speaker_list:any = [1,5,6,7];
      let key = Math.floor(Math.random()*4);
      console.log(key);
      let speaker = speaker_list[key];

      console.log(speaker);

      result = await app.tencentAI.speech.tts(data, speaker, 3);

      console.log(result);
      const ciac = wx.createInnerAudioContext();
      const fs = wx.getFileSystemManager();

      fs.writeFileSync(
        `${wx.env.USER_DATA_PATH}/ocr.mp3`,
        result.data.speech,
        'base64',
      );

      ciac.src = `${wx.env.USER_DATA_PATH}/ocr.mp3`;

      ciac.autoplay = true;
      ciac.play();
      ciac.onPlay(res => {
        console.log(res);
      });

      ciac.onError(e => {
        console.log(e);
      });
    })().catch((e:any)=>{
      console.log(e);
      wx.hideLoading({});
      wx.showModal({
        title: "出错啦",
        content: JSON.stringify(e),
      });
    });
  },

  tapOCROutput(){
    wx.setClipboardData({
      data: this.data.text,
    })
  },

  takePhoto() {
    aiCommon.takePhoto().then((res: any) => {
      this.setData!({
        src: res,
        template_data: {
          src: res,
          'device-position': 'back',
        },
      });
    });
  },

  choosePhoto() {
    aiCommon.choosePhoto().then((res: any) => {
      this.setData!({
        src: res,
        template_data: {
          src: res,
          'device-position': 'back',
        },
      });
    });
  },

  getImage() {
    if (!this.data.src) {
      // 返回顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 1000,
      });

      this.setData!({
        data: '请先拍摄',
      });

      this.showModal();
    }

    return this.data.src;
  },

  showModal() {
    wx.showModal({
      title: '提示',
      content: this.data.data,
    });

    // 清空数据
    this.setData!({
      data: '',
    });
  },
});
