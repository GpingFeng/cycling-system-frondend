//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 控制轮播组件的配置
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    // 指示点
    indicatorDots: true,
    // 控制自动播放
    autoplay: true,
    // 多久滚动一次
    interval: 2000,
    // 动画效果时间
    duration: 500,
    // 帖子列表
    postList: [{
      avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523337445308&di=7417f0d3f80e31be606b03fcdb2cd21f&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2FVWS-eq4UdnSFTy0CkNGi2g%3D%3D%2F2040693581252325900.jpg',
      posttime: '昨天4：00',
      username: 'Gping',
      textContent: '下午五点半广工正门来骑车吧下午五点半广工正门来骑车吧下午五点半广工正门来骑车吧下午五点半广工正门来骑车吧下午五点半广工正门来骑车吧下午五点半广工正门来骑车吧下午五点半广工正门来骑车吧下午五点半广工正门来骑车吧',
      images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523337445308&di=7417f0d3f80e31be606b03fcdb2cd21f&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2FVWS-eq4UdnSFTy0CkNGi2g%3D%3D%2F2040693581252325900.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523337445308&di=e5122717bedc0c7a7f0fc4fc5c946308&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2FIKvyfJe_vflCL4ni3bFrGQ%3D%3D%2F3159838088654158691.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523337445308&di=a8a04172fb5b2d71715d98b3f630fcdc&imgtype=0&src=http%3A%2F%2Fnews.youth.cn%2Fzc%2F201607%2FW020160725354447402027.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523337445308&di=064cbdee94025c548dbde8fe2361cb05&imgtype=0&src=http%3A%2F%2Fc2.biketo.com%2Fd%2Ffile%2Fracing%2FEvents%2F2016-07-25%2Fc89e74f28d4b3a135a791811f5f85089.jpg'],
      comments: [{
        avatar: 'http://cdnq.duitang.com/uploads/item/201504/04/20150404H3338_N8Wir.jpeg',
        posttime: '昨天4：00',
        username: '炎帝',
        replyMsg: '好啊，不见不散'
      },
      {
        avatar: 'http://cdnq.duitang.com/uploads/item/201504/04/20150404H3338_N8Wir.jpeg',
        posttime: '昨天4：00',
        username: '黄帝',
        replyMsg: '好啊，到时见'
      }],
      likePeaple: ['冯光平', '黄帝']
    },
      {
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523337445308&di=a8a04172fb5b2d71715d98b3f630fcdc&imgtype=0&src=http%3A%2F%2Fnews.youth.cn%2Fzc%2F201607%2FW020160725354447402027.jpg',
        posttime: '今天9：00',
        username: '黄帝',
        textContent: '来啊快活啊来啊快活啊来啊快活啊来啊快活啊来啊快活啊来啊快活啊来啊快活啊来啊快活啊',
        images: [],
        comments: [{
          avatar: 'http://cdnq.duitang.com/uploads/item/201504/04/20150404H3338_N8Wir.jpeg',
          posttime: '昨天4：00',
          username: '炎帝',
          replyMsg: '好啊，不见不散'
        },
        {
          avatar: 'http://cdnq.duitang.com/uploads/item/201504/04/20150404H3338_N8Wir.jpeg',
          posttime: '昨天4：00',
          username: '黄帝',
          replyMsg: '好啊，到时见'
        }],
        likePeaple: ['冯光平', '黄帝','宝宝']
      }],
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
  onLoad: function () {
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
