// 云函数入口文件
const cloud = require('wx-server-sdk');
const rq = require('request-promise');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }

  // https://developers.weixin.qq.com/community/develop/doc/000c82801a45e8ca18c7e8fba51800

  return await rq({
      method: 'POST',
      uri: event.uri,
      headers: event.headers ? event.headers : {},
      body: event.body
  }).then(body => {
      return body
  }).catch(err => {
      return err
  });
}
