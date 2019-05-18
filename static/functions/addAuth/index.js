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
    await db.collection('auth').add({
      data: {
        user_id: event.user_id,
        user_name: event.user_name,
        school: event.school,
        class_num: event.class_num,
        study_num: event.study_num
      }
    })
  } catch (e) {
    console.log(e)
  }
}
