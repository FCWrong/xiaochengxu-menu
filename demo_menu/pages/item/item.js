// pages/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryUrl: "https://apis.juhe.cn/cook/query.php",
    indexURL: "https://apis.juhe.cn/cook/index?",
    queryidURL: "https://apis.juhe.cn/cook/queryid?",
    key: "f0648645e9ce62e65c0308c4ef2d0ad9",

    menuItems: [],
    error:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.menuName+" "+options.cid);
    if (options.menuName != null) {
      console.log(options.menuName);
      this.getQuery(options.menuName);
    }
    else if (options.cid != null) {
      this.getIndex(options.cid);
    }
  },
  //菜谱大全
  getQuery: function (menuName) {
    var that = this;
    wx.request({
      url: this.data.queryUrl,
      data: {
        "key": this.data.key,
        "menu": menuName,
        "rn": "10"
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        if(res.data.result!=null){
          var menuList = [];
          var menuData = res.data.result.data;
          for (var i = 0; i < menuData.length; i++) {
            var obj = menuData[i];
            obj.albums[0] = obj.albums[0].replace('\\', '');
            menuList.push(obj);
          }
          that.setData({
            menuItems: menuList,
            error:""
          })
          
        }else{
          console.log(res.data);
          that.data.error = res.data.error_code+" "+ res.data.reason;
          that.setData({
            error: that.data.error
          })
        }     
      }
    })
  },
  //标签检索
  getIndex: function (cid) {
    var that = this;
    wx.request({
      url: this.data.indexURL+"cid="+cid+"&key="+this.data.key,
      // data: {
      //   "cid": this.data.key,
      //   "menu": 1,
      // },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {

        console.log(res.data);
        var menuList = [];
        var menuData = res.data.result.data;
        for (var i = 0; i < menuData.length; i++) {
          var obj = menuData[i];
          obj.albums[0] = obj.albums[0].replace('\\', '');
          menuList.push(obj);
        }
        that.setData({
          menuItems: menuList
        })
      }
    })
  },

  tapItem:function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../info/info?id=' + id,
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