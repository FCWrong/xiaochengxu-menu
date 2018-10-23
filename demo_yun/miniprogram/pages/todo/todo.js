// miniprogram/pages/todo/todo.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {

    title: "项目（点击编辑；长按删除）",
    items: [{ name: '第一条清单（点击完成）', value: '0', checked: true },
    { name: '第二条清单（长按删除）', value: '1' },
    { name: '第三条清单（点击添加更多，添加新的清单）', value: '2' },
    { name: '第四条清单（拉下创建新的项目）', value: '3' },
    { name: '第五条清单（欢迎加入QQ群：12456789）', value: '4' }],

    startX: 0, //开始坐标

    startY: 0,

    tabs: ["待办", "完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    projectTemp: {},
    isShowTemp: false,

    isHaveTodo: false,
    isHaveToDay:true,
    todoProjects: [],
    doneProjects: [],


  },
  //获取todoList
  getToList: function () {
    try {
      const res = wx.getStorageInfoSync()

      var todoProjects = [];
      var doneProjects = [];
      var keys = res.keys;
      var count = keys.length;
      for (var i = 0; i < count; i++) {
        var value = wx.getStorageSync(keys[i]);
        console.log('value值为：', value);
        if(value.name=="今天"){
          value.name = timeToData(value.createTime);
          if(value.name=="今天");
          this.setData({
            isHaveToDay:true
          })
        }

        if (value.isDone) {
          doneProjects.push(value);
        } else {
          todoProjects.push(value);
        }
      }

      var isHaveTodo = todoProjects.length > 0;
      console.log('isHaveTodo值为：', isHaveTodo);
      console.log('todoProjects.length值为：', todoProjects.length);
      this.setData({
        isHaveTodo: isHaveTodo,
        todoProjects: todoProjects,
        doneProjects: doneProjects
      })
    } catch (e) {
      console.log('error  获取所有缓存：', e);
    }
  },
  //是否是今天
  isToDay:function(e){
    return new Date(e).toDateString() === new Date().toDateString()
  },
  //事件戳转日期
  timeToData:function(e){
    var date=new Date(e);
    // console.log("date : ", (date.getMonth() + 1) + "-" + (date.getDate()))
    if (isToDay(e)){
      return "今天"
    }else{
      return (date.getMonth() + 1) + "-" + (date.getDate())
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
    this.getToList();
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

    var project = {};
    project.id = Date.now()
    project.name = "今天";
    project.createTime = project.id;
    project.isTop = false;
    project.isDone = false;
    project.todoList = [];

    this.setData({
      projectTemp: project,
      isShowTemp: true
    })


    wx.stopPullDownRefresh();
  },

  touchStart:function(e){
    console.log("touchStart",e)
    this.setData({
      startY: e.changedTouches[0].clientY,
    })
  },
  touchEnd:function(e){
    console.log("touchEnd", e)
    var endY = e.changedTouches[0].clientY;
    var y=endY-this.data.startY;
    if(y<-100){
      console.log("y<-100");
      this.setData({
        isShowTemp: false
      })
    }
  },

  addToDoTemp:function(){

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})