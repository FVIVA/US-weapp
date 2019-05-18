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
    const admin = await db.collection('admin').where({
      admin_name: event.user
    }).get()
    console.log(admin, event)
    if (admin.data[0].password === event.psw) {
      return 'success'
    } else {
      return 'error'
    }
  } catch (e) {
    console.log(e)
  }
}
