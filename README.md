# PCIT WeChat Miniprogram

<p align="center">
<img width="200" src="https://user-images.githubusercontent.com/16733187/49062650-de41ea00-f24f-11e8-9f22-99b5cd3d0195.jpg">
</p>

<p align="center"><strong>微信扫码 立即体验</strong></p>

## ENTRYPOINT

`app.js`

### khs1994.com dev

```js
App({
  globalData: {
    PCIT_ENTRYPOINT: 'https://ci2.khs1994.com:10000/api',
  },
});
```

### PCIT CE

```js
App({
  globalData: {
    PCIT_ENTRYPOINT: 'https://ci.khs1994.com/api',
  },
});
```

### PCIT EE

```js
App({
  globalData: {
    PCIT_ENTRYPOINT: 'https://ci.domain.com/api',
  },
});
```

## 致谢

- https://github.com/pcit-ce/miniprogram/network/dependencies
