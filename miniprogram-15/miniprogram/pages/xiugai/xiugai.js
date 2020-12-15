const db = wx.cloud.database().collection('UserData')

Page({
  data:{
    checked_value:'',
    worktype:[
      {
        value:"体力劳动者",
        checked:false
      },
      {
        value:"脑力劳动者",
        checked:false
      }
    ]
  },
  change:function(e){
    let items = this.data.worktype;
    console.log(e)
    for(let i = 0;i<items.length;i++){
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      worktype:items,
      check_value:e.detail.value
    })
    
  },
  formSubmit(e){
    wx.showToast({
      title: '修改成功',
      icon:'none',
      duration:3500
    })
    console.log(e)
    db.doc('92d9b75b5fd718b40015b2c264d1436a').update({
      data:{
        worktype:e.detail.value.worktype,
        weight:e.detail.value.input
      },
      success:function(res){
        console.log(res)
      }
    })
  },
  back:function(e)
  {
    wx.reLaunch({
      url: '../water/water',
    })
  }
})