// miniprogram/pages/todo/todo.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {

    title:"项目（点击编辑；长按删除）",
    items: [{ name: '点击完成；长按删除', value: '0', checked: true },
    { name: 'standard is dealicient for u.standard is dealicient for u.standard is dealicient for u.standard is dealicient for u.standard is dealicient for u.', value: '1' }],

    startX: 0, //开始坐标

    startY: 0,

    tabs: ["待办", "完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    isToday:true,
    isHaveTodo:false,
    todoProjects:[],
    doneProjects:[],

  },
  //获取todoList
  getToList:function(){
    try {
      const res = wx.getStorageInfoSync()

      var todoList;
      var doneList;
      var count = keys.length;
      for (var i = 0; i < count; i++) {
        var value = wx.getStorageSync(keys[i]);

      }
    } catch (e) {
      console.log('error  获取所有缓存：', e);
    }
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var items = this.data.items, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      items: items
    });
  },

  onDel: function (e) {
    console.log('onDel，携带value值为：', e);

    var that = this;
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: "#e64340",
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      },
      fail: function (res) {
     
      },
      complete: function (res) {
       
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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

  },
})