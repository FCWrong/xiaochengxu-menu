// miniprogram/pages/qingdan/qingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' },
      { name: 'standard is dealicient for u.standard is dealicient for u.standard is dealicient for u.standard is dealicient for u.', value: '1' },
      { name: 'A5空白素描本欧美圣经本超厚笔记本文具加厚大号A4日记本记事本子白纸速写本手绘画画简约复古手账本手帐本', value: '1' },
    ],

    isShowDemo:false,
    isY:true
  },

  onTop:function(e){
    console.log("OnTop:",e)
    this.setData({
      isShowDemo:true,
      isY:false
    });
  },
  inputBlur:function(e){
    console.log("Blur:", e)
    this.setData({
      isShowDemo: false,
      isY:true
    });
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