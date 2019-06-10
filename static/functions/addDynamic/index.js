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
    const createTime = new Date()
    await db.collection('dynamic').add({
      data: {
        dynamic_content: event.dynamic_content,
        dynamic_img: event.dynamic_img,
        nickname: event.nickname,
        avatar: event.avatar,
        create_time: createTime,
        like_count: 0,
        user_id: event.user_id,
        location: event.location
      }

    })
  } catch (e) {
    console.log(e)
  }
}
