// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'us-eb3d12',
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.user_id
  try {
    const goodsInfo = await db.collection('user').where({
      user_id: id
    }).get()
    return goodsInfo
  } catch (e) {
    console.log(e)
  }
}
