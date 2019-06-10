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
    await db.collection('admin').add({
      data: {
        admin_name: event.user,
        password: event.psw,
        class_num: event.class_num,
        study_num: event.study_num
      }
    })
  } catch (e) {
    console.log(e)
  }
}
