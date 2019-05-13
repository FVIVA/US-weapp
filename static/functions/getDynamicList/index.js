// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'us-eb3d12',
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const id = event._id
  try {
    console.log('aaa')
    const dynamicInfo = await db.collection('dynamic').where({
      _id: id,
      user_id: event.user_id
    }).get()
    return dynamicInfo
  } catch (e) {
    console.log(e)
  }
}
