// pages/profile/index.js

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '10',
    pic: '',
    git_type: '',
    orgs: [],
  },

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
  onShow: function() {
    let git_type = 'github';

    // 读取 token 文件
    try {
      app.globalData.PCIT_TOKEN = wx
        .getFileSystemManager()
        .readFileSync(`${wx.env.USER_DATA_PATH}/token_${git_type}`, 'utf8');
    } catch (e) {
      console.log(e);
    }

    // token 不存在，跳转到登录页面
    if (!app.globalData.PCIT_TOKEN) {
      wx.navigateTo({
        url: '/pages/login/login',
      });

      return;
    }

    // TODO 检查 token 过期
    const pcit = new app.pcit.PCIT(
      app.globalData.PCIT_TOKEN,
      app.globalData.PCIT_ENTRYPOINT,
    );

    const pcit_user = pcit.user;
    const pcit_org = pcit.org;

    // 展示用户界面
    pcit_user.findByCurrent().then(res => {
      console.log(res);
      let { username, git_type, pic } = res.data[0];
      this.setData({ username, git_type, pic });
    });

    // 展示用户组织列表
    pcit_org.list().then(res => {
      console.log(res);
      let orgs = res.data;

      this.setData({ orgs });
    });
  },

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

  toRepo(event) {
    let username = event.currentTarget.dataset.username;
    wx.navigateTo({
      url: `/pages/repo/repo?git_type=${
        this.data.git_type
      }&username=${username}`,
    });
  },
});
