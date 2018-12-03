import { IMyApp } from '../../app';

const app = getApp<IMyApp>();
const aiCommon = require('../aicommon/index.js');
const fs = wx.getFileSystemManager();

Page({
  data: {
    src: '',
    target_src: '',
    template_data: {
      'device-position': 'front',
      src: '',
    },
    dirPath: `${wx.env.USER_DATA_PATH}/aiface`,
  },

  onShow(): void {
    console.log(app.tencentAI);
  },

  onUnload() {},

  onLoad() {},

  clear() {
    try {
      fs.rmdir({
        dirPath: this.data.dirPath,
        recursive: true,
        success(res) {
          console.log(res);
        },
        fail(e) {
          console.log(e);
        },
      });

      wx.showToast({
        title: '缓存清理成功',
      });
    } catch (e) {
      console.log(e);

      wx.showModal({
        title: '出错啦',
        content: JSON.stringify(e),
      });
    }
  },

  takePhoto() {
    (async () => {
      let result = await aiCommon.takePhoto();

      this.setData!({
        src: result,
        template_data: {
          src: result,
          'device-position': 'front',
        },
      });
    })();
  },

  choosePhoto() {
    (async () => {
      let result = await aiCommon.choosePhoto();

      this.setData!({
        src: result,
        template_data: {
          src: result,
          'device-position': 'front',
        },
      });
    })();
  },

  getImage() {
    return aiCommon.getImage(this.data.src);
  },

  save() {
    let choose = new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: ['原图', '特效图'],
        success(res: wx.ShowActionSheetSuccessCallbackResult) {
          resolve(res.tapIndex);
        },
        fail(e) {
          reject(e);
        },
      });
    });

    (async () => {
      let result = await choose;

      let filePath = result === 0 ? this.data.src : this.data.target_src;

      wx.saveImageToPhotosAlbum({
        filePath,
        success() {
          wx.showToast({
            title: '保存成功，请到系统相册查看',
          });
        },
        fail(e: any) {
          console.log(e);

          wx.showModal({
            title: '出错啦',
            content: JSON.stringify(e),
          });
        },
      });
    })();
  },

  preview() {
    let urls = [this.data.src, this.data.target_src];

    let caches: string[] = [];

    try {
      let dir = `${wx.env.USER_DATA_PATH}/aiface`;

      let result = fs.readdirSync(dir);

      for (let item of result) {
        caches.push(dir + '/' + item);
      }
    } catch (e) {
      console.log(e);
    }

    urls = [...urls, ...caches];

    let url_list: string[] = [];

    urls.map(
      (v): any => {
        if (v) {
          url_list.push(v);
        }
      },
    );

    if (JSON.stringify(url_list) === '[]') {
      wx.showModal({
        title: '出错啦',
        content: '没找到图片😂',
      });

      return;
    }

    wx.previewImage({
      current: this.data.src,
      urls: url_list,
    });
  },

  upload() {
    let choose = new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: ['原图', '特效图'],
        success(res: wx.ShowActionSheetSuccessCallbackResult) {
          resolve(res.tapIndex);
        },
        fail(e) {
          reject(e);
        },
      });
    });

    (async () => {
      let result = await choose;

      let filePath = result === 0 ? this.data.src : this.data.target_src;

      wx.cloud.init({
        env: 'pro-1e94dd',
      });

      let cloudPath = new Date().getTime().toString() + '.jpg';

      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success() {
          wx.showModal({
            title: '上传成功',
            content: '请到控制台查看',
          });
        },
        fail(e) {
          wx.showModal({
            title: '出错啦',
            content: JSON.stringify(e),
          });
        },
      });
    })();
  },

  writeTargetFile(image: string) {
    const file_path = `${
      wx.env.USER_DATA_PATH
    }/aiface/${new Date().getTime()}.jpg`;

    try {
      fs.mkdirSync(`${wx.env.USER_DATA_PATH}/aiface`);
    } catch (e) {}

    fs.writeFileSync(file_path, image, 'base64');

    this.setData!({
      target_src: file_path,
    });
  },

  // 人脸美妆
  facecosmetic() {
    let image = this.getImage();

    if (!image) {
      return;
    }

    let mode = Math.ceil(Math.random() * 23);

    wx.showLoading({
      title: `模式 ${mode} 处理中`,
    });

    this.setData!({
      target_src: '',
    });

    (async () => {
      let result = await app.tencentAI.imageSpecialEffects.facecosmetic(
        image,
        mode,
      );

      this.writeTargetFile(result.data.image);

      wx.hideLoading({});
    })().catch(e => {
      wx.hideLoading({});
      console.log(e);
      wx.showModal({
        title: '发生错误',
        content: JSON.stringify(e),
      });
    });
  },

  // 人脸变妆
  facedecoration() {
    let image = this.getImage();

    if (!image) {
      return;
    }

    let mode = Math.ceil(Math.random() * 22);

    this.setData!({
      target_src: '',
    });

    wx.showLoading({
      title: `模式 ${mode} 处理中`,
    });

    (async () => {
      console.log(mode);

      let result = await app.tencentAI.imageSpecialEffects.facedecoration(
        image,
        mode,
      );

      this.writeTargetFile(result.data.image);

      wx.hideLoading({});

      // TODO 滚到结果图处
      // wx.pageScrollTo({
      //   scrollTop: 184,
      // })
    })().catch(e => {
      wx.hideLoading({});

      wx.showModal({
        title: '错误发生',
        content: JSON.stringify(e),
      });
    });
  },

  // 图片滤镜
  ptuimgfilter() {
    let image = this.getImage();

    if (!image) {
      return;
    }

    this.setData!({
      target_src: '',
    });

    let filter = Math.ceil(Math.random() * 32);

    wx.showLoading({
      title: `模式 ${filter} 处理中`,
    });

    (async () => {
      let result = await app.tencentAI.imageSpecialEffects.ptuimgfilter(
        image,
        filter,
      );

      this.writeTargetFile(result.data.image);

      wx.hideLoading({});
    })().catch(() => {
      wx.hideLoading({});
    });
  },

  // 图片滤镜 AI LAB
  visionimgfilter() {
    let image = this.getImage();

    if (!image) {
      return;
    }

    let filter = Math.ceil(Math.random() * 65);

    wx.showLoading({
      title: `模式 ${filter} 处理中`,
    });

    (async () => {
      let result = await app.tencentAI.imageSpecialEffects.visionimgfilter(
        image,
        filter,
        new Date().getTime().toString(),
      );

      this.writeTargetFile(result.data.image);

      wx.hideLoading({});
    })().catch(() => {
      wx.hideLoading({});
    });
  },

  // 人脸融合

  // 大头贴
  facesticker() {
    let image = this.getImage();

    if (!image) {
      return;
    }

    let sticker = Math.ceil(Math.random() * 31);

    wx.showLoading({
      title: `模式 ${sticker} 加载中`,
    });

    this.setData!({
      target_src: '',
    });

    (async () => {
      let result = await app.tencentAI.imageSpecialEffects.facesticker(
        image,
        sticker,
      );

      this.writeTargetFile(result.data.image);

      wx.hideLoading({});
    })().catch(e => {
      wx.hideLoading({});

      wx.showModal({
        title: '错误发生',
        content: JSON.stringify(e),
      });
    });
  },

  // 颜龄检测
  faceage() {
    let image = this.getImage();

    if (!image) {
      return;
    }

    wx.showLoading({
      title: '加载中',
    });

    this.setData!({
      target_src: '',
    });

    async function faceAge(image: string) {
      return await app.tencentAI.imageSpecialEffects.faceage(image);
    }

    faceAge(image)
      .then((res: any) => {
        this.writeTargetFile(res.data.image);
        wx.hideLoading({});
      })
      .catch(e => {
        wx.hideLoading({});

        wx.showModal({
          title: '错误发生',
          content: JSON.stringify(e),
        });
      });
  },
});
