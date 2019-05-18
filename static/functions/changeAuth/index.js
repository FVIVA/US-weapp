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
    let authInfo = {}
    if (event.pass) {
      authInfo = await db.collection('auth').where({
        user_id: event.user_id
      }).get()
      console.log(authInfo)
      await db.collection('user').where({
        user_id: event.user_id
      }).update({
        data: {
          school: authInfo.data[0].school,
          user_name: authInfo.data[0].user_name,
          user_type: 1
        }
      })
    } else {
      // await db.collection('user').where({
      //   _id: event.user_id
      // }).update({
      //   data: {
      //     age: event.age,
      //     nickname: event.nickname,
      //     gender: event.gender
      //   }
      // })
    }
    await db.collection('auth').where({
      user_id: event.user_id
    }).remove()
  } catch (e) {
    console.log(e)
  }
}
