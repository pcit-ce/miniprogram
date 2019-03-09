// pages/nfc/nfc.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topHeight: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.getSystemInfo({
      success: res => {
        this.setData!({
          topHeight: res.statusBarHeight,
        });
      },
    });
  },

  stopHCE() {
    wx.stopHCE({
      success(res) {
        wx.showModal({
          title: '',
          content: JSON.stringify(res),
        });
      },
      fail(res) {
        wx.showModal({
          title: '',
          content: JSON.stringify(res),
        });
      },
    });
  },

  startHCE() {
    wx.startHCE({
      aid_list: ['F222222222'],
      success(res) {
        wx.showModal({
          title: '',
          content: JSON.stringify(res),
        });
      },
      fail(res) {
        wx.showModal({
          title: '',
          content: JSON.stringify(res),
        });
      },
    });
  },

  getHCEState() {
    wx.getHCEState({
      success(res) {
        wx.showModal({
          title: '',
          content: JSON.stringify(res),
        });
      },
      fail(res) {
        wx.showModal({
          title: '',
          content: JSON.stringify(res),
        });
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
  // onShareAppMessage: function () {
  //
  // }
});
