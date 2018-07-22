// pages/shibie/shibie.js
// const base64=require("../../utils/base64.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baidu_apiKey:"5HIukapEXh67w1wlXs9LbjGt",
    baidu_secrectKey:"l9ADZQWGyPShdz9LiFOUnGkYmIl08Uov",
    url:"D:\LiebaoDownLoad\d043ad4bd11373f0ef902d30ae0f4bfbfaed04f5.jpg",
    shibieUrl:"https://aip.baidubce.com/rest/2.0/image-classify/v2/dish",
    getTokenUrl:"https://aip.baidubce.com/oauth/2.0/token",
    
    keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    token:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getAccessToken();
    this.shibieAPI();
  },
  // 获取百度Access_token API
  getAccessToken:function(){
    var that=this;
    wx.request({
      url: this.data.getTokenUrl,
      data:{
        grant_type:"client_credentials",
        client_id:this.data.baidu_apiKey,
        client_secret:this.data.baidu_secrectKey
      },
      success: function (res) {
        console.log(res.data)
        that.data.token=res.data.access_token;
        wx.setStorage({
          key: 'baiduApi_token',
          data: that.data.token,
        })
        that.setData({
          token:that.data.token
        })
      }
    })
  },
  // 识别图像API
  shibieAPI:function(){
    var that=this;
    wx.chooseImage({
      success: function(res1) {
        // console.log("imageUrl=" + res1.tempFilePaths[0]);
        wx.getStorage({
          key: 'baiduApi_token',
          success: function (res) {
            console.log("token=" + res.data)
            wx.request({
              
              url: that.data.shibieUrl + "?access_token=" + res.data,
              data: {
                filter_threshold: 0.95,
                baike_num: 1,
                image: encodeURI(that.urlTobase64(res1.tempFilePaths[0]))
              },
              header: {
                'content-type':"application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log(res.data);
              }
            })
          },
        })
      },
    })
    
    
  },
  urlTobase64: function (url) {

    wx.request({
      url: url,
      responseType: 'arraybuffer',//最关键的参数，设置返回的数据格式为arraybuffer
      success: res => {
        console.log(res);
        let base64 = wx.arrayBufferToBase64(res.data);//把arraybuffer转成base64
        // base64 = 'data:image/jpeg;base64,' + base64　//不加上这串字符，在页面无法显示的哦
        base64 = encodeURI(base64);
        // console.log(base64);
        return base64;
      }
    });
  },

  getBase64Image:function (img){
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
  },
  
  encode:function(input){
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = this._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        this.data.keyStr.charAt(enc1) + this.data.keyStr.charAt(enc2) +
        this.data.keyStr.charAt(enc3) + this.data.keyStr.charAt(enc4);
    }
    return output;
  },
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
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