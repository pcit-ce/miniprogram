//logs.js
import util from '../../utils/util';

Page({
  data: {
    logs: [],
  },
  onLoad: function() {
    this.setData!({
      logs: (wx.getStorageSync('logs') || []).map((log:any) => {
        return util.formatTime(new Date(log));
      }),
    });
  },
});
