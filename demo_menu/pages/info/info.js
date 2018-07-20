// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryUrl: "https://apis.juhe.cn/cook/query.php",
    queryidURL: "https://apis.juhe.cn/cook/queryid?",
    key: "f0648645e9ce62e65c0308c4ef2d0ad9",
    menuInfo:{},
    menuItems: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getData(options.id);    
  },

  getData:function(id){
    var that=this;
    wx.request({
      url: this.data.queryidURL+"id="+id+"&key="+this.data.key,
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        that.data.menuInfo=res.data.result.data[0];
        var obj=[];
        var strList = that.data.menuInfo.burden.split(";");
        var peiliaos=[];
        for(var i=0;i<strList.length;i++){
          var str1 = strList[i].split(",")[0];
          var str2 = strList[i].split(",")[1];
          var peiliao=[];
          peiliao.push(str1);
          peiliao.push(str2);
          peiliaos.push(peiliao);
        }
        that.data.menuInfo.peiliaos=peiliaos;


        console.log(that.data.emnuInfo);
        that.setData({
          menuInfo:that.data.menuInfo
        })
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})