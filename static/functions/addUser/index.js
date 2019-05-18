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
    const user = await db.collection('user').where({
      user_id: event.user_id
    }).get()
    // return user
    if (!user.data.length) {
      await db.collection('user').add({
        data: {
          nickname: event.nickname,
          avatar: event.avatar,
          gender: event.gender,
          intergral: 100,
          user_id: event.user_id,
          user_name: '',
          user_type: 0,
          age: 0
        }
      })
      await db.collection('user_like').add({
        data: {
          user_id: event.user_id,
          goodsLike: [],
          dynamicLike: []
        }
      })
    } else return user
  } catch (e) {
    console.log(e)
  }
}
