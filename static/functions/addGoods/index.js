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
    // let createTime = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    await db.collection('goods').add({
      data: {
        goods_img: event.goods_img,
        user_avatar: event.user_avatar,
        create_time: createTime,
        like_count: 0,
        user_id: event.user_id,
        goods_id: Math.random() * 1000000,
        location: event.location,
        price: Number(event.price),
        remark: event.remark,
        goods_name: event.goods_name
      }
    })
  } catch (e) {
    console.log(e)
  }
}
