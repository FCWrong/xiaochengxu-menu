// miniprogram/pages/qingdan/qingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    isShowDemo: false,
    isTop: false,
    isY: true,
    upper: -50,

    todolist: null,

    pageIndex: 0

  },
  //切换分组
  swiperChange: function (e) {
    console.log("swiperChange:", e);
    this.setData({
      pageIndex: e.detail.current
    })
  },

  //时间戳转日期
  timeToData: function (e) {
    var date = new Date(e);
    return (date.getMonth() + 1) + "-" + (date.getDate())
  },
  //是否是同一天
  isSameDay: function (now, value) {
    return this.timeToData(now) == value
  },

  //改变状态
  checkboxChange: function (e) {
    console.log("checkbox:",e.detail.value)
    var arr = e.currentTarget.dataset.grouptgroup.split(";");

    var values = e.detail.value;
    var todolist = this.data.todolist;
    var items = todolist[arr[0]][arr[1]].todoList;

    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].isDone = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].id == values[j]) {
          items[i].isDone = true;
          break;
        }
      }
    }

    this.setData({
      todolist: todolist
    });

    try {
      wx.setStorageSync('ToDoList', this.data.todolist)
    } catch (e) { }
  },
  //获取分组方法
  getToDoList: function () {
    try {
      var key = "ToDoList"
      var value = wx.getStorageSync(key)
      if (value) {
        console.log("getGroupList:", value)
        this.setData({
          todolist: value
        })
      } else {
        var now = Date.now()
        var time = this.timeToData(Date.now())
        var todolist = [
          [
            {
              title: "10-25",
              time: now,
              todoList: [
                {
                  "id": now + 1,
                  "time": now + 1,
                  "content": "下划创建 清单",
                  "isDone": false
                },
                {
                  "id": now,
                  "time": now,
                  "content": "长按删除 清单",
                  "isDone": false
                },
                {
                  "id": now - 1,
                  "time": now - 1,
                  "content": "右划创建 分组",
                  "isDone": false
                }
              ]
            },
            {
              title: "10-24",
              time: now - 1,
              todoList: [
                {
                  "id": now + 1,
                  "time": now + 1,
                  "content": "下划创建 清单",
                  "isDone": false
                },
                {
                  "id": now,
                  "time": now,
                  "content": "长按删除 清单",
                  "isDone": false
                },
                {
                  "id": now - 1,
                  "time": now - 1,
                  "content": "右划创建 分组",
                  "isDone": false
                }
              ]
            }
          ]
        ]

        this.setData({
          todolist: todolist
        })

        try {
          wx.setStorageSync('ToDoList', this.data.todolist)
        } catch (e) { }
      }
    } catch (e) {
      console.log("Error-getGroupList:", e)
    }
  },

  onLoad: function (options) {

    try {
      wx.clearStorageSync()
    } catch (e) {
      // Do something when catch error
    }
    this.getToDoList();
  },

  onTop: function (e) {
    console.log("OnTop:", e)
    this.setData({
      isTop: true,
    });
  },
  touchStart: function (e) {
    console.log("toucheStart", e);

    this.setData({
      isTop: false
    });
  },
  touchEnd: function (e) {
    console.log("toucheEnd", e);
    if (this.data.isTop) {

      var time = this.timeToData(Date.now());
      var todolist = this.data.todolist;
      var groupList = todolist[this.data.pageIndex];

      if (!this.isSameDay(Date.now(), groupList[0].title)) {
        var group = {
          title: time,
          time: Date.now(),
          todoList: [
            {
              id: Date.now(),
              time: Date.now(),
              content: "",
              isDone: false
            }
          ]
        }
        groupList.unshift(group);

        this.setData({
          todolist: todolist,
        });
      } else {
        var todo = {
          id: Date.now(),
          time: Date.now(),
          content: "",
          isDone: false
        }

        groupList[0].todoList.unshift(todo);

        this.setData({
          todolist: todolist,
        });
      }

      this.setData({
        isShowDemo: true,
        isY: false,
        upper: -5000
      })

    }
  },
  //提交todo
  confirm: function (e) {
    console.log("confirm:", e);
    var time = Date.now();
    var value = e.detail.value;

    if(value==""){
      this.inputBlur(e)
      return
    }

    var arr = e.currentTarget.dataset.grouptgroup.split(";");
    var todolist = this.data.todolist;
    var firstTitle = todolist[arr[0]][arr[1]].title;

    if (this.isSameDay(time, firstTitle)) {

      todolist[arr[0]][arr[1]].todoList[arr[2]].content = value

      this.setData({
        todolist: todolist,
      })

      try {
        wx.setStorageSync('ToDoList', this.data.todolist)
      } catch (e) { }
    }

    this.setData({
      isShowDemo: false,
      isY: true,
      upper: -50
    })

  },
  inputBlur: function (e) {
    console.log("Blur:", e)

    var time = this.timeToData(Date.now());
    var todolist = this.data.todolist;
    var groupList = todolist[this.data.pageIndex];

    var item = groupList[0];
    if (item != null) {
      if (item.todoList.length == 1){
        groupList.splice(0,1)  
      }else{
        item.todoList.splice(0,1)
      } 

      this.setData({
        todolist: todolist,
      })    
    }

    this.setData({
      isShowDemo: false,
      isY: true,
      upper: -50
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