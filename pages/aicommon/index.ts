export function takePhoto(){
  const ctx = wx.createCameraContext();

  return new Promise((resolve, reject) => {
    ctx.takePhoto({
      quality: 'high',
      success(res) {
        resolve(res.tempImagePath);
      },
      fail(e) {
        reject(e);
      },
    });
  });
};

export function choosePhoto() {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      success(res:any) {
        resolve(res.tempFiles[0].path);
      },
      fail(e) {
        reject(e);
      },
    });
  });
};

export function getImage(src:any) {

  if (!src) {
    // 返回顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000,
    });

    wx.showModal({
      title: '提示',
      content: "请先拍摄"
    });

    return '';
  }

  return src;
};
