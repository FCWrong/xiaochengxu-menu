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
    isY:true,

    todolist:null

  },
  //获取分组方法
  getToDoList:function(){
    try {
      var key ="ToDoList"
      var value = wx.getStorageSync(key)
      if (value) {
        console.log("getGroupList:", value)
        this.setData({
          todolist:value
        })
      }
    } catch (e) {
      console.log("Error-getGroupList:",e)
    }
  },
  setinfo:function(){
    var info = [
      [{
        title: 1540475683,
        todoList: [{
          id: 1540475683,
          time: 1540475683,
          content: "啊飒飒阿三",
          isDone: false
        }]
      },
      {
        title: 1540475683,
        todoList: [{
          id: 1540475683,
          time: 1540475683,
          content: "啊飒飒阿三",
          isDone: false
        }]
      },
      {
        title: 1540475683,
        todoList: [{
          id: 1540475683,
          time: 1540475683,
          content: "啊飒飒阿三",
          isDone: false
        }]
      }
      ],
      [{
        title: 1540475683,
        todoList: [{
          id: 1540475683,
          time: 1540475683,
          content: "啊飒飒阿三",
          isDone: false
        }]
      },
      {
        title: 1540475683,
        todoList: [{
          id: 1540475683,
          time: 1540475683,
          content: "啊飒飒阿三",
          isDone: false
        }]
      }
      ]
    ];

    try {
      wx.setStorageSync('ToDoList', info)
    } catch (e) { 
      console.log("error",e);
    }
  },

  onLoad: function (options) {
    // this.setinfo();
    this.getToDoList();
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