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
    const a = await db.collection('advert').where({
      _id: event.ad_id
    }).remove()
    return a
  } catch (e) {
    console.log(e)
  }
}
