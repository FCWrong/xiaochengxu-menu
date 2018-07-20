// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryURL: "https://apis.juhe.cn/cook/category.php",
    key: "f0648645e9ce62e65c0308c4ef2d0ad9",
    menuData: [],
    sousuoData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory();
    this.getMenuStorage();
  },
  //获取菜单缓存
  getMenuStorage:function(){
    var that=this;
    wx.getStorage({
      key: 'sousuoData',
      success: function(res) {
        that.setData({
          sousuoData:res.data
        })
      },
    })
  },
  setMenuStorage:function(e){
    if (e.detail.value==="") return;
    var that=this;
    var sousuoList=[];
    sousuoList = that.data.sousuoData;
    sousuoList.unshift(e.detail.value); 
    if (sousuoList.length>12){     
      sousuoList.pop();
    } 
    that.setData({
      sousuoData: sousuoList
    });
    wx.setStorage({
      key: 'sousuoData',
      data: that.data.sousuoData,
    })
    this.getMenuStorage(); 
    // console.log("menuName=" + e.currentTarget.id);
    wx.navigateTo({
      url: '../item/item?menuName=' + e.detail.value,
    })
  },

  OnClear:function(e){
    wx.setStorage({
      key: 'sousuoData',
      data: [],
    })
    this.getMenuStorage();
  },
  tapIndex: function (e) {
    var cid = e.currentTarget.dataset.cid;
    console.log("cid=" + cid);
    wx.navigateTo({
      url: '../item/item?cid=' + cid,
    })
  },
  tapMenu:function(e){
    var menuName = e.currentTarget.id;
    console.log("menuName=" + e.currentTarget.id);
    wx.navigateTo({
      url: '../item/item?menuName=' + menuName,
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
        that.data.menuData = res.data.result;
        // for(var i=0;i<4;i++)
        // {
        //   that.data.menuData.push(res.data.result[i]);
        // }
        that.setData({
          menuData: that.data.menuData
        })

        console.log(that.data.menuData);
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