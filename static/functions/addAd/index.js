// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'us-eb3d12',
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('advert').add({
      data: {
        ad_url: event.url
      }
    })
  } catch (e) {
    console.log(e)
  }
}
