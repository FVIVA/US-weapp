// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'us-eb3d12',
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const createTime = new Date()
  try {
    await db.collection('chat').add({
      data: {
        user1: event.user1,
        user2: event.user2,
        user2_avatar: event.user2_avatar,
        user1_avatar: event.user1_avatar,
        content: event.content,
        time: createTime
      }
    })
    console.log(event)
  } catch (e) {
    console.log(e)
  }
}
