// pages/login.js

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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

  formSubmit(event) {
    console.log(event);

    let { git_type = 'github', username, password } = event.detail.value;

    console.log(username, password);

    let pcit = new app.pcit.PCIT('', app.globalData.PCIT_ENTRYPOINT);

    let pcit_user = pcit.user;

    pcit_user.getToken(git_type, username, password).then(res => {
      console.log(res);

      let token = res.data.token;

      // token 写入文件
      wx.getFileSystemManager().writeFileSync(
        `${wx.env.USER_DATA_PATH}/token_${git_type}`,
        token,
        'utf8',
      );

      app.globalData.PCIT_TOKEN = token;

      // 跳转页面
      wx.switchTab({
        url: '/pages/profile/index',
      });
    });
  },
});
