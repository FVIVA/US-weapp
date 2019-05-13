// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // return 'lallala'
  // const db = wx.cloud.database({ env: 'us-eb3d12' })
  // db.collection('us-demo').get().then(res => {
  //   // res.data 包含该记录的数据
  //   console.log(res.data)
  //   return res.data
  // })
  return event.userInfo
}
