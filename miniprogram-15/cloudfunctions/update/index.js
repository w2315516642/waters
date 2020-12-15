// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
const _ = db.command
  
// 云函数入口函数
exports.main = async (event, context) => {
 try {
  return await db.collection('SetTime').doc('ob5_05ErHOh2bOfYs3lCHHFGgfi4').update({
   // data 传入需要局部更新的数据
   data: {
    isHave: true,
   }
  })
 } catch (e) {
  console.error(e)
 }
}