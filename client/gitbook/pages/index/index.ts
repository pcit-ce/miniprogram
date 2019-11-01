// pages/docker/index.js

import { IMyApp } from '../../../app';
const app = getApp<IMyApp>();
import fetch from 'wx-fetch';
import SummaryHandler from './SummaryHandler';

Page({
  data: {
    data: '',
    gitbook: '',
    topHeight: 0,
    branch: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options: any) {
    let { gitbook, branch } = options;
    this.setData!({
      gitbook,
      branch,
    });

    wx.getSystemInfo({
      success: res => {
        this.setData!({
          topHeight: res.statusBarHeight,
        });
      },
    });

    this.show();
  },

  show() {
    wx.showLoading({
      title: '加载中',
    });

    let { gitbook, branch } = this.data;

    console.log(gitbook);

    const summary_url = `https://gitee.com/khs1994-website/${gitbook}/raw/${branch}/SUMMARY.md`;

    Promise.all([fetch(summary_url).then((e: any) => e.text())]).then(
      res => {
        // console.log(res);

        let [data, summaryJson] = SummaryHandler(res[0], gitbook, branch);

        let theme = 'light';

        this.setData!({
          data,
          theme,
        });

        app.globalData.summaryData = summaryJson;

        wx.showToast({
          title: '成功',
        });
      },
      () => {
        wx.showToast({
          icon: 'none',
          title: '加载失败',
        });
      },
    );
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
  onShareAppMessage: function() {
    return {
      title: this.data.gitbook,
      imageUrl:
        'https://gitee.com/docker_practice/docker_practice/raw/master/_images/cover.jpg',
      fail() {
        wx.showToast({
          title: '转发失败',
          icon: 'success',
        });
      },
    };
  },
  __bind_touchend() {},
  __bind_touchstart() {},

  __bind_tap() {},

  __bind_touchmove() {},

  __bind_touchcancel() {},
});
