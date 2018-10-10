// pages/yun/yun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dnName:"yun_demo"
  },

  add:function(){
    const db=wx.cloud.database();
    db.collection(this.data.dnName).add({
      data:{
        name:"fc1",
        des:"des_fc1"
      },
      success:res=>{
        console.log(res);
        wx.showToast({
          title: JSON.stringify(res,null,2),
        })
      }
    })
  },
  del:function(){

  },
  update:function(){

  },
  cha:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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