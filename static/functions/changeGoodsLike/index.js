// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'us-eb3d12',
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const userId = event.user_id
  const id = event._id
  const goodsInfo = await db.collection('goods').where({
    _id: id
  }).get()
  const state = event.state
  let count = goodsInfo.data[0].like_count
  if (state) {
    count += 1
  } else {
    count -= 1
  }
  try {
    await db.collection('goods').where({
      _id: id
    }).update({
      data: {like_count: count}
    })
    const likeGoods = await db.collection('user_like').where({
      user_id: userId
    }).update({
      data: {
        goodsLike: event.goodsLike
      }
    })
    return likeGoods
  } catch (e) {
    console.log(e)
  }
}
