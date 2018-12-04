// pages/aiface/camera.js

const aicommon = require('../aicommon/index.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cache_file: false,
    template_data: {
      device_position: 'back',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options: any) {
    console.log(options);

    let { device_position = 'front', cache_file = false } = options;

    this.setData!({
      cache_file,
      template_data: {
        device_position,
      },
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

  takePhoto() {
    (async () => {
      let filePath = await aicommon.takePhoto();

      console.log(filePath);

      const fs = wx.getFileSystemManager();
      const srcPath = `${wx.env.USER_DATA_PATH}/src.jpg`;
      const desDir = `${wx.env.USER_DATA_PATH}/aiface`;

      fs.renameSync(filePath, srcPath);

      // 创建文件夹
      try {
        fs.mkdirSync(desDir);
      } catch (e) {
        console.log(e);
      }

      // 缓存原始文件
      this.data.cache_file &&
        fs.copyFile({
          srcPath,
          destPath: desDir + '/' + new Date().getTime().toString(),
          fail(e) {
            console.log(e);
          },
          success(e) {
            console.log(e);
          },
        });

      // 返回上一页面
      wx.navigateBack({
        delta: 1,
      });
    })();
  },
});
