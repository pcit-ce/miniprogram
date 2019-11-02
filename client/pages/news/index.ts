import { IMyApp } from '../../app';
const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    topHeight: 0,
    news: [
      {
        id: 100,
        type: 'success',
        title: '2019 年余额已不足',
        desc: 'Add oil',
      },
      {
        id: 1000,
        type: 'info',
        title: 'tool + social',
        desc: 'pcit based ai',
      },
    ],
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
  onPullDownRefresh: function() {
    let news = this.data.news;

    // 从服务器获取新消息
    let news_new_id = 1011;

    for (let item of this.data.news) {
      if (item.id === news_new_id) {
        console.log(item);
        console.log('消息已存在');
        wx.stopPullDownRefresh({});
        return;
      }
    }

    news.unshift({
      id: news_new_id,
      type: 'info',
      title: 'new message',
      desc: 'pull down refresh',
    });

    console.log(this.data.news);

    this.setData!({
      news,
    });

    wx.stopPullDownRefresh({});
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('onReachBottom');

    let news = this.data.news;
    let news_old_id = 1;

    for (let item of news) {
      if (item.id === news_old_id) {
        console.log('到底啦');
        return;
      }
    }

    news.push({
      id: news_old_id,
      type: 'warning',
      title: 'old message',
      desc: 'reach bottom',
    });

    this.setData!({
      news,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(): any {},

  close(res: any) {
    console.log(res);
  },
});
