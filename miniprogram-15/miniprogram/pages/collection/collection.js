const db = wx.cloud.database().collection("UserData")

Page({
  data:{
    age:'',
    height:'',
    x:false,
    weight:'',
    worktype:''
  },
  onLoad:function(){
    var that = this
   wx.cloud.callFunction({
     name:'search',
     data:{
       tag:''
     },
     success:function(res){
       var _that = that
       console.log(res)
       console.log(res.result.data[0].worktype)
       that.setData({
         weight:res.result.data[0].weight,
         worktype:res.result.data[0].worktype,
         height:res.result.data[0].height,
         age:res.result.data[0].age
       })
     }
   })
   
  },
  show:function(e){
    this.setData({
      x:e.detail.value
    })
  }
})