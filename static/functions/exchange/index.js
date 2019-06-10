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
    const owner = await db.collection('user').where({
      user_id: event.owner
    }).get()
    const exer = await db.collection('user').where({
      user_id: event.exer
    }).get()
    await db.collection('user').where({
      user_id: event.owner
    }).update({
      data: {
        intergral: owner.data[0].intergral + event.price,
        change_time: owner.data[0].change_time + 1
      }
    })
    await db.collection('user').where({
      user_id: event.exer
    }).update({
      data: {
        intergral: exer.data[0].intergral - event.price,
        change_time: exer.data[0].change_time + 1
      }
    })
    await db.collection('goods').where({
      _id: event.goods_id
    }).update({
      data: {
        state: 1
      }
    })
    console.log(owner, 'owner')
    console.log(exer, 'exer')
  } catch (e) {
    console.log(e)
  }
}
