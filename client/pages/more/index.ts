// pages/more/index.js

import { IMyApp } from '../../app';

const app = getApp<IMyApp>();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    alpha: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {},

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

  openFaceAI() {
    wx.navigateTo({
      url: '/pages/ai/aiface/index',
    });
  },

  openOCRAI() {
    wx.navigateTo({
      url: '/pages/ai/aiocr/index',
    });
  },

  openImageAI() {
    wx.navigateTo({
      url: '/pages/ai/image/index',
    });
  },

  openTranslateAI() {
    wx.navigateTo({
      url: '/pages/ai/translate/index',
    });
  },

  openNLPAI() {
    wx.navigateTo({
      url: '/pages/ai/nlp/index',
    });
  },

  openAudioAI() {
    wx.navigateTo({
      url: '/pages/ai/audio/index',
    });
  },

  openChat() {
    wx.showModal({
      title: '即将支持',
      content: '敬请期待',
    });
  },

  openClub() {
    wx.showModal({
      title: '即将支持',
      content: '敬请期待',
    });
  },

  openSystem() {
    wx.getSystemInfo({
      success(res) {
        wx.showModal({
          title: '系统信息',
          content: JSON.stringify(res),
          showCancel: false,
        });
      },
    });
  },

  openUpdate() {
    const um = wx.getUpdateManager();

    um.onCheckForUpdate(res => {
      console.log(res);

      if (!res.hasUpdate) {
        wx.showToast({
          title: '未发现新版本',
        });

        return;
      }

      wx.showModal({
        title: '发现新版本',
        content: '重启应用',
        success(res) {
          console.log(res);

          um.applyUpdate();
        },
      });
    });
  },

  openCXYL() {
    wx.navigateToMiniProgram({
      appId: 'wx767dab1b29691501',
      path: 'pages/index/index?from=pcitce',
      extraData: {
        foo: 'bar',
      },
      success(res) {
        console.log(res);
      },
    });
  },

  openChangelog() {
    wx.showLoading({
      title: '加载中',
    });

    (async () => {
      const result: any = await new Promise(resolve => {
        wx.request({
          url: app.globalData.PCIT_ENTRYPOINT + '/ci/changelog',
          success(res: any) {
            resolve(res.data.data);
          },
        });
      });

      app.globalData.MDData = result;

      wx.hideLoading({});

      wx.navigateTo({
        url: '../markdown/markdown',
      });
    })();
  },

  openStoreAuth() {
    (async () => {
      await new Promise((resolve, reject) => {
        wx.checkIsSoterEnrolledInDevice({
          checkAuthMode: 'fingerPrint',
          success: res => {
            console.log(res);

            if (res.isEnrolled) {
              resolve(true);
            }

            reject(false);
          },
          fail(e) {
            reject(e);
          },
        });
      });

      await new Promise((resolve, reject) => {
        wx.startSoterAuthentication({
          requestAuthModes: 'fingerPrint',
          challenge: '123', //(new Date).getTime().toString(),
          authContent: '请验证',
          success: res => {
            console.log(res);

            wx.showModal({
              title: '验证通过',
              content: JSON.stringify(res),
              showCancel: false,
            });

            resolve(res);
          },
          fail(e: any) {
            console.log(e);
            reject(e);
          },
        });
      });
    })().catch((e: any) => {
      wx.showModal({
        title: '出错啦',
        content: JSON.stringify(e),
        showCancel: false,
      });
    });
  },

  openDocker() {
    wx.navigateToMiniProgram({
      appId: 'wxb830c3abf8a658a5',
      path: '/pages/docker/index/index?from=pcit',
    });
  },

  openLaravel() {
    wx.navigateTo({
      url: '/gitbook/pages/index/index?gitbook=laravel5.5-docs.zh-cn',
    });
  },

  openKubernetes() {
    wx.navigateTo({
      url: '/gitbook/pages/index/index?gitbook=kubernetes-handbook',
    });
  },

  openPCITCluster() {
    wx.showModal({
      title: '集群监控',
      content: JSON.stringify({
        status: 'runing',
        health: true,
      }),
      showCancel: false,
    });
  },
  openVerify() {
    app.globalData.MDData = `
# PCIT 认证

如果你的项目使用了 PCIT ,请联系我们，我们会将优质开源项目展示到我们的成功案例中。

    `;

    wx.navigateTo({
      url: '../markdown/markdown',
    });
  },
  openDonate() {
    app.globalData.MDData = `
# 感谢以下赞助商

|日期|名字|金额|
| :-- | :-- | :-- |
| 2018-11-30 | \`lichnow\`   | ￥100 |
| 2018-10-26 | \`云服务推广\` | ￥50  |

> 访问 zan.khs1994.com 打赏 PCIT
    `;

    wx.navigateTo({
      url: '../markdown/markdown',
    });
  },

  openAIFaceLogin() {
    wx.showModal({
      title: '通过',
      content: '您已通过 AI 鉴权',
      showCancel: false,
    });
  },

  openSettings() {
    wx.navigateTo({
      url: '../settings/settings',
    });
  },
});
