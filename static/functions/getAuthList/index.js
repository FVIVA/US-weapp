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
    if (event.user_name) {
      const authInfo = await db.collection('auth').where({
        user_name: db.RegExp({
          regexp: event.user_name,
          options: 'i'
        })
      }).get()
      return authInfo
    } else {
      const authInfo = await db.collection('auth').get()
      return authInfo
    }
  } catch (e) {
    console.log(e)
  }
}
