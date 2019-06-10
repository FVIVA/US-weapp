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
    console.log(event)
    if (event.user_id && event.send_id) {
      const goodsInfo = await db.collection('chat').where(_.or([
        {
          user1: event.send_id,
          user2: event.user_id
        },
        {
          user1: event.user_id,
          user2: event.send_id
        }
      ])).get()
      console.log('info')
      return goodsInfo
    } else {
      const goodsInfo = await db.collection('chat').where(_.or([
        {
          user2: event.user_id
        },
        {
          user1: event.user_id
        }
      ])).get()
      console.log('list')
      return goodsInfo
    }
  } catch (e) {
    console.log(e)
  }
}
