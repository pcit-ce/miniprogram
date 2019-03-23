// pages/tools/github_hot/index.js
import GitHub from '../../../utils/github/index';

import { IMyApp } from '../../../app';
const app = getApp<IMyApp>();
const topHeight = app.globalData.topHeight;
const gh = new GitHub();
import swipeoutActions from './data/swipeoutActions';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    topHeight,
    sinceList: ['today', 'week', 'month'],
    since: 'today',
    language: 'php',
    swipeoutActions,
  },

  openProject(res: any) {
    // console.log(res);
    const project = res.currentTarget.dataset.project;

    wx.showLoading({
      title: '快马加鞭请求中',
    });

    gh.gitData.readme(project).then((res: any) => {
      if (!res.ok) {
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          title: '未找到描述文件！',
        });
        return;
      }

      app.globalData.MDData = res.body;

      wx.navigateTo({
        url: '/pages/markdown/markdown',
      });
    });
  },

  selectSince() {
    wx.showActionSheet({
      itemList: ['today', 'this week', 'this month'],
      success: res => {
        let sinceIndex = res.tapIndex;
        const since =
          sinceIndex === 0 ? 'today' : sinceIndex === 1 ? 'week' : 'month';
        this.setData!({
          since,
        });
        wx.showLoading({ title: '加载中' });
        this.request();
      },
    });
  },

  selectLanguage() {},

  request() {
    const language: string = this.data.language;
    let since: string = this.data.since;
    since =
      since === 'today' ? 'daily' : since === 'week' ? 'weekly' : 'monthly';
    gh.trending
      .get(language, since)
      .then(
        (res: any) => {
          this.setData!({
            list: JSON.parse(res.body),
          });
          wx.hideLoading();

          wx.showToast({
            title: '成功',
          });
        },
        () => {
          wx.hideLoading();

          wx.showToast({
            title: '失败',
          });
        },
      )
      .finally(() => {
        wx.hideLoading();
      });
  },

  bindAction(res: any) {
    // console.log(res);

    const index = res.detail.index;
    const project = res.target.dataset.project;

    if (index === 0) {
      // console.log('star');
      wx.showLoading({
        title: 'staring ...',
      });

      (async () => {
        try {
          await gh.activity.staring.star(project);

          wx.showToast({
            title: '成功',
          });
        } catch (e) {
          setTimeout(() => {
            wx.showToast({
              icon: 'none',
              title: '失败，请先登录 GitHub 账号',
            });
          }, 500);
        } finally {
          wx.hideLoading();
        }
      })();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.showLoading({ title: '加载中' });
    this.request();
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
