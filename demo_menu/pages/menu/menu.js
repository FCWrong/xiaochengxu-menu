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
    key:"f0648645e9ce62e65c0308c4ef2d0ad9",
    menuData: [],
    menuItems:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory();  
    this.getQuery("鱼"); 
    // this.getQueryid(100);
  },
  //按菜谱id查看详细
  getQueryid: function (id) {

  
    wx.request({
      url: this.data.queryidURL,
      data: {
        // "key": this.key,
        // "id": id
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
    var that=this;
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
        var menuList=[];
        var menuData=res.data.result.data;
        for (var i = 0; i < menuData.length;i++)
        {
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
  //分类标签列表
  getCategory: function () {
    var that = this;
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
        
        that.data.menuData=res.data.result;
        console.log("menu cid=" + that.data.menuData);
        that.setData({
          menuData: that.data.menuData
        })
      }
    })
  },

  tapItem:function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../info/info?id='+id,
    })
  },
  tapIndex: function (e) {
    var cid = e.currentTarget.dataset.cid;
    console.log("cid="+cid);
    wx.navigateTo({
      url: '../item/item?cid=' + cid,
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