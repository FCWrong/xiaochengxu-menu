// miniprogram/pages/qingdan/qingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    isIOS: true,

    isShowDemo: false,
    isTop: false,
    isY: true,
    upper: -50,
    isfocus: false,

    todolist: null,

    pageIndex: 0,
    curIndex: 1,

    newGroupInput: "",

    isTap: false,

    height: 0,

    topNum:0

  },
  //切换分组
  swiperChange: function (e) {
    // console.log("swiperChange:", e);

    this.setData({
      pageIndex: e.detail.current - 1
    })

    var todolist = this.data.todolist;
    var group = todolist[this.data.pageIndex];
    if (group) {
      var title = todolist[this.data.pageIndex].gName;
      wx.setNavigationBarTitle({
        title: title
      })
    } else {
      wx.setNavigationBarTitle({
        title: "清单"
      })
    }

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
    // console.log("checkbox:", e.detail.value)
    var arr = e.currentTarget.dataset.grouptgroup.split(";");

    var values = e.detail.value;
    var todolist = this.data.todolist;
    var items = todolist[arr[0]].gtList[arr[1]].todoList;

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
      var todolist;
      if (value) {
        // console.log("getGroupList:", value)
        this.setData({
          todolist: value
        })
      } else {
        var now = Date.now()
        // var time = this.timeToData(Date.now())
        if (this.data.isIOS) {
          todolist = [
            {
              gName: "日常",
              time: now,
              index: now,
              gtList: [{
                title: "说明",
                time: now,
                todoList: [
                  {
                    "id": now,
                    "time": now,
                    "content": "「点击」完成任务",
                    "isDone": false
                  }, {
                    "id": now - 1,
                    "time": now - 1,
                    "content": "「下拉」添加任务",
                    "isDone": false
                  },
                  {
                    "id": now - 2,
                    "time": now - 2,
                    "content": "「长按」删除任务",
                    "isDone": false
                  },
                  {
                    "id": now - 3,
                    "time": now - 3,
                    "content": "「右划」创建清单",
                    "isDone": false
                  }
                ]
              }]
            }
          ]
        } else {
          todolist = [
            {
              gName: "日常",
              time: now,
              index: now,
              gtList: [{
                title: "说明",
                time: now,
                todoList: [
                  {
                    "id": now,
                    "time": now,
                    "content": "「点击」完成任务",
                    "isDone": false
                  }, {
                    "id": now - 1,
                    "time": now - 1,
                    "content": "「加号」添加任务",
                    "isDone": false
                  },
                  {
                    "id": now - 2,
                    "time": now - 2,
                    "content": "「长按」删除任务",
                    "isDone": false
                  },
                  {
                    "id": now - 3,
                    "time": now - 3,
                    "content": "「右划」创建清单",
                    "isDone": false
                  }
                ]
              }]
            }
          ]
        }


        this.setData({
          todolist: todolist
        })

        try {
          wx.setStorageSync('ToDoList', this.data.todolist)
        } catch (e) { }
      }

      var todolist = this.data.todolist;

      var group = todolist[this.data.pageIndex];
      // console.log("this index:", this.data.pageIndex, group)
      if (group) {
        var title = todolist[this.data.pageIndex].gName;
        wx.setNavigationBarTitle({
          title: title
        })
      }

    } catch (e) {
      console.log("Error-getGroupList:", e)
    }
  },

  onLoad: function (options) {

    // try {
    //   wx.clearStorageSync()
    // } catch (e) {
    //   // Do something when catch error
    // }
    this.isIOS();
    this.getToDoList();
    // this.setHight()

  },
  //下拉
  onTop: function (e) {
    // console.log("OnTop:", e)
    this.setData({
      isTop: true,
    });
  },
  //开始触摸
  touchStart: function (e) {
    // console.log("toucheStart", e);
    if (this.data.isfocus) { return }

    this.setData({
      isTop: false
    });
  },
  //结束触摸
  touchEnd: function (e) {
    // console.log("toucheEnd", e, this.data.isTop);
    if (this.data.isfocus) { return }

    if (this.data.isTop) {

      var time = this.timeToData(Date.now());
      var todolist = this.data.todolist;
      var groupList = todolist[this.data.pageIndex].gtList;

      if (groupList.length == 0 || !this.isSameDay(Date.now(), groupList[0].title)) {
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
  //添加新任务
  addNewRenwu: function () {
    this.goTop(0);
    this.onTop(0);
    this.touchEnd(0)
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    this.setData({
      topNum: this.data.topNum = 0
    });
  },
  //输入框调起
  focus: function (e) {
    // console.log("bindfocus", e)
    this.setData({
      isfocus: true
    })
  },

  //提交todo
  confirm: function (e) {
    // console.log("confirm:", e);
    var time = Date.now();
    var value = e.detail.value;

    this.setData({
      isfocus: false
    })

    if (value == "") {
      this.inputBlur(e)
      return
    }

    var arr = e.currentTarget.dataset.grouptgroup.split(";");
    var todolist = this.data.todolist;
    var firstTitle = todolist[arr[0]].gtList[arr[1]].title;

    if (this.isSameDay(time, firstTitle)) {

      todolist[arr[0]].gtList[arr[1]].todoList[arr[2]].content = value

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
  //取消输入
  inputBlur: function (e) {
    // console.log("Blur:", e)

    this.setData({
      isShowDemo: false,
      isY: true,
      upper: -50
    });

    var time = this.timeToData(Date.now());
    var todolist = this.data.todolist;
    var groupList = todolist[this.data.pageIndex].gtList;

    var item = groupList[0];
    if (item != null) {
      if (item.todoList.length == 1) {
        groupList.splice(0, 1)
      } else {
        item.todoList.splice(0, 1)
      }

      this.setData({
        todolist: todolist,
      })
    }
  },
  //删除
  onDel: function (e) {
    // console.log('onDel，携带value值为：', e);

    var that = this;

    var arr = e.currentTarget.dataset.delvalue.split(";");


    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: "#e64340",
      success: function (res) {
        if (!res.cancel && res.tapIndex == 0) {
          // console.log(res.tapIndex)
          that.delTodo(arr);
        }
      },
      fail: function (res) {
        // console.log("fail",res)
      },
      complete: function (res) {
        // console.log("cancle",res)
      }
    });
  },
  //删除todo
  delTodo: function (e) {
    if (e) {
      var todolist = this.data.todolist;
      if (todolist[e[0]] && todolist[e[0]].gtList[e[1]] && todolist[e[0]].gtList[e[1]].todoList[e[2]]) {
        if (todolist[e[0]].gtList[e[1]].todoList.length > 1) {
          todolist[e[0]].gtList[e[1]].todoList.splice(e[2], 1)
        } else {
          todolist[e[0]].gtList.splice(e[1], 1)
        }
      }

      this.setData({
        todolist: todolist
      })

      try {
        wx.setStorageSync('ToDoList', this.data.todolist)
      } catch (e) { }
    }
  },
  //删除清单
  onDelZu: function (e) {
    // console.log('onDel，携带value值为：', e);
    var that = this;
    var value = e.currentTarget.dataset.delvalue;
    wx.showActionSheet({
      itemList: ['删除清单'],
      itemColor: "#e64340",
      success: function (res) {
        if (!res.cancel && res.tapIndex == 0) {
          // console.log(res.tapIndex)
          that.delZu(value);
        }
      },
      fail: function (res) {
        // console.log("fail",res)
      },
      complete: function (res) {
        // console.log("cancle",res)
      }
    });
  },
  //删除清单
  delZu: function (e) {

    // console.log("e", e)
    if (e != null) {
      if (e != 0) {
        var todolist = this.data.todolist;
        // console.log("e1", todolist[e])
        if (todolist[e]) {
          // console.log("e", todolist[e])
          todolist.splice(e, 1)
        }

        this.setData({
          todolist: todolist
        })

        try {
          wx.setStorageSync('ToDoList', this.data.todolist)
        } catch (e) { }
      } else {
        wx.showToast({
          title: '「日常」无法被删除',
          icon: "none",

        })
      }
    }
  },
  //新建清单
  confirGroup: function (e) {
    // console.log("新建分组", e);
    var now = Date.now();
    var value = e.detail.value;

    if (value == "") {
      return
    } else {
      var todolist = this.data.todolist;
      var group = {
        gName: value,
        time: now,
        index: now,
        gtList: []
      }

      todolist.push(group);

      this.setData({
        todolist: todolist,
        curIndex: todolist.length,
        pageIndex: todolist.length - 1,
        newGroupInput: ""
      })

      try {
        wx.setStorageSync('ToDoList', this.data.todolist)
      } catch (e) { }

      var todolist = this.data.todolist;
      var group = todolist[this.data.pageIndex];
      if (group) {
        var title = todolist[this.data.pageIndex].gName;
        wx.setNavigationBarTitle({
          title: title
        })
      } else {
        wx.setNavigationBarTitle({
          title: "清单"
        })
      }

      // console.log("todolist", this.data.todolist)
    }
  },
  //页面跳转
  goto: function (e) {
    // console.log("goto",e)
    var value = e.currentTarget.dataset.delvalue
    if (value != null) {
      this.setData({
        curIndex: value + 1,
        pageIndex: value,
      })
    }
  },
  //点击加号清单
  tapjiahao: function (e) {
    this.setData({
      isTap: true
    })
  },
  //取消新建清单
  blurXinjian: function (e) {
    this.setData({
      isTap: false
    })
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

  isIOS: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var isIOS
        if (res.platform == "devtools") {
          isIOS = false;
        } else if (res.platform == "ios") {
          isIOS = true;
        } else if (res.platform == "android") {
          isIOS = false;
        }

        that.setData({
          isIOS: isIOS
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log("OnTop:")
    // wx.stopPullDownRefresh();
    // this.setData({
    //   isTop: true,
    // });

    // this.touchEnd(2)
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