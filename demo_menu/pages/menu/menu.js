// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryUrl: "https://apis.juhe.cn/cook/query.php",
    categoryURL: "https://apis.juhe.cn/cook/category.php",
    indexURL: "https://apis.juhe.cn/cook/index.php",
    queryidURL:"https://apis.juhe.cn/cook/queryid.php",
    key:"f0648645e9ce62e65c0308c4ef2d0ad9"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCategory();  
    // this.getQuery("鱼"); 
  },
  //按菜谱id查看详细
  getQueryid: function (id) {
    wx.request({
      url: this.data.queryidURL,
      data: {
        "key": this.key,
        "id": id
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
      }
    })
  },
  //按标签检索菜谱
  getIndex:function(index)
  {
    wx.request({
      url: this.data.indexUrl,
      data:{
        "key":this.key,
        "cid":index
      },
      header: {
        "content-type": "application/json"
      },
      success:function(res){
        console.log(res.data);        
      }
    })
  },
  //菜谱大全
  getQuery:function(name)
  {
    wx.request({
      url: this.data.queryUrl,
      data: {
        "key": this.data.key,
        "menu":name,
        "rn":"10"
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
      }
    })
  },
  //分类标签列表
  getCategory: function () {
    wx.request({
      url: this.data.categoryURL,
      data: {
        "key": this.data.key,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
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