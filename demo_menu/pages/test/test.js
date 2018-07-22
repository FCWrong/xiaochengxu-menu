// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.urlTobase64();
  },

  urlTobase64: function () {
    wx.chooseImage({
      success: function(res) {
        console.log(res.tempFilePaths);
        console.log(res.tempFilePaths[0]);
        wx.request({
          url: res.tempFilePaths[0],
          responseType: 'arraybuffer',//最关键的参数，设置返回的数据格式为arraybuffer
          success: res => {
            let base64 = wx.arrayBufferToBase64(res.data);//把arraybuffer转成base64
            console.log(base64)
            base64 = 'data:image/jpeg;base64,' + base64　//不加上这串字符，在页面无法显示的哦
            console.log(base64)　//打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
          }
        });
      },
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