//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 控制轮播组件的配置
    activities: [],
    // 指示点
    indicatorDots: true,
    // 控制自动播放
    autoplay: true,
    // 多久滚动一次
    interval: 2000,
    // 动画效果时间
    duration: 500,
    // 帖子列表
    postList: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 跳转到具体的帖子页面
  goPostItem: function (target) {
    var postId = target.currentTarget.id;
    console.log(postId)
    // 使用URL传递参数
    wx.navigateTo({
      url: '../post-detail/post-detail?id=' + postId,
    })
  },
  // 点击创建帖子
  createPostBtn: function () {
    wx.navigateTo({
      url: '../create-post/create-post',
    })
  },
  onLoad: function () {
    console.log('Gp');
    var that = this;
    wx.request({
      url: 'http://localhost:3000/post/get_all_posts',
      data: {},
      success: function (res) {
        that.setData({
          activities: res.data.data.activities,
          postList: res.data.data.posts
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
