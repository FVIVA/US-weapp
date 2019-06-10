// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'us-eb3d12',
  traceUser: true
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('chat').where(_.or([
      {
        user1: event.send_id,
        user2: event.user_id
      },
      {
        user1: event.user_id,
        user2: event.send_id
      }])).remove()
  } catch (e) {
    console.log(e)
  }
}
