const db = wx.cloud.database().collection("SetTime")
var tm = ""
Page({
  data:{
    time:'00:00',
    times:[{
      "times":'00:00',
    }],
    currenTime:'',
    lists:[],
    currenHour:'',
  },
  /*打印当前时间*/
  onLoad: function (options) {
    var util = require('../util/util.js'); //参数是util.js所在的路径，参照自个儿的
    var currenTime= util.formatTime(new Date());
var currenHour= util.Hour(new Date());
var currenMinute= util.Minute(new Date());
    let that = this;
    var currenHour = this.data.currenHour
   setInterval(function(){
      that.setData({
        currenTime:util.formatTime(new Date()),
      });
    },1000)
    setInterval(function(){
      that.setData({
        currenHour:util.Hour(new Date()),
      });
    },5000)
    wx.cloud.callFunction({
      name:'bool',
      data:{
        tag:''
      },
      success:function(res){
        console.log(res.result.data[0].time)
        
      }
    })
  },

 /***增加组件 */
 onTapAdd:function(e){
  var util = require('../util/util.js'); //参数是util.js所在的路径，参照自个儿的
  var currenTime= util.formatTime(new Date());
var currenHour= util.Hour(new Date());
var currenMinute= util.Minute(new Date());
   console.log(e)
  var times = this.data.times;
  var newTime = {
    "times":'00:00',
  }
  times.push(newTime);
 
  this.setData({
   times:times,
  })
  console.log(times)
 },
 /***** 删除最后一个组件，也可以修改删除指定组件*/
 onTapDel:function(e){
  var util = require('../util/util.js'); //参数是util.js所在的路径，参照自个儿的
  var currenTime= util.formatTime(new Date());
var currenHour= util.Hour(new Date());
var currenMinute= util.Minute(new Date());
  var temp = this.data.times;
  temp.pop(this.data.times.length);
  this.setData({
   times: temp
  })
 },
//设定时间功能
 TimeChange:function(e){
  var util = require('../util/util.js'); //参数是util.js所在的路径，参照自个儿的
  var currenTime= util.formatTime(new Date());
var currenHour= util.Hour(new Date());
var currenMinute= util.Minute(new Date());
   var that = this
  var nowIdx=e.currentTarget.dataset.idx;//获取时间数组下标
  this.data.times[nowIdx] = e.detail.value
  console.log(this.data.times[nowIdx])
 this.setData({
    ['times['+nowIdx+'].times']:e.detail.value
 })
 db.doc('time'+nowIdx).update({
   data:{
     time:e.detail.value,
   }
 })
 setInterval(function(){
  var bool=0
  var currenHour = that.data.currenHour
 if(e.detail.value === currenHour){
   bool=1
 }
 else if(e.detail.value !== currenHour){
   bool=0
 }
 if(bool){
   wx.showToast({
     title: '到喝水时间了！！',
     icon:'none',
     duration:5000
   })
   wx.vibrateLong({
     success: (res) => {},
   })
 }
},20000)
 },

  bindTimeChange:function(e)
  {
    var util = require('../util/util.js'); //参数是util.js所在的路径，参照自个儿的
    var currenTime= util.formatTime(new Date());
var currenHour= util.Hour(new Date());
var currenMinute= util.Minute(new Date());
    var that = this
   console.log(e.detail.value)
   tm=e.detail.value
   this.setData({
     time:e.detail.value
   })
   setInterval(function(){
     var bool=0
     var currenHour = that.data.currenHour
    if(e.detail.value === currenHour){
      bool=1
    }
    else if(e.detail.value !== currenHour){
      bool=0
    }
    if(bool){
      wx.showToast({
        title: '到喝水时间了！！',
        icon:'none',
        duration:5000
      })
      wx.vibrateLong({
        success: (res) => {},
      })
    }
   },20000)
  db.doc("time-1").update({
    data:{
      time:tm,
    },
    success:function(res){
      console.log(res)
    }
  })
  },
  /*获取所设置的时间*/
  SetTime:function(e){
    var util = require('../util/util.js'); //参数是util.js所在的路径，参照自个儿的
    var currenTime= util.formatTime(new Date());
var currenHour= util.Hour(new Date());
var currenMinute= util.Minute(new Date());
    console.log(e.detail.value)
    let data={
      "datastreams": [
        {"id": "time1","datapoints":[{"value": e.detail.value}]},
        {"id": "time2","datapoints":[{"value": e.detail.value}]},
      ]
    }
    wx.request({
      url:"http://api.heclouds.com/devices/" + deviceid + "/datapoints",
      method:'POST',
      header:{
        "content-type": 'application/json',
        "api-key": apikey
      },
      data:JSON.stringify(data),
      success(res){

      }
    })
  },
})