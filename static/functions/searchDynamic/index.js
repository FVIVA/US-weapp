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
    const dynamicInfo = await db.collection('dynamic').where({
      dynamic_content: db.RegExp({
        regexp: event.dynamic_content,
        options: 'i'
      })
    }).get()
    return dynamicInfo
  } catch (e) {
    console.log(e)
  }
}
