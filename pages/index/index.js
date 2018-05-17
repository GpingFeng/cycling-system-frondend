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
    // 用户相关信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 第几次分页请求
    pageIndex: 1,
    // 每页应该拥有
    pageNum: 10,
    // 所有的帖子信息
    allPostList: [],
    hasMore: true,
    // 是否进行评论
    iscomment: false,
    // 目前对哪个帖子进行评论
    currentPostId: '',
    // 第几个
    postIndex: ''
  },
  /**
   * 点击轮播图
   */
  goActivityDetail: function (e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../activity-detail/activity-detail?id=' + id,
    })
  },
  /**
   * 跳转到具体的帖子页面
   */
  goPostItem: function (target) {
    var postId = target.currentTarget.id;
    console.log(postId)
    // 使用URL传递参数
    wx.navigateTo({
      url: '../post-detail/post-detail?id=' + postId,
    })
  },
  /**
   * 点击创建帖子
   */
  createPostBtn: function () {
    wx.navigateTo({
      url: '../create-post/create-post',
    })
  },
  /**
   * 点赞
   */
  likeTap: function (target) {
    var from_uid = this.data.userInfo.id;
    var id = target.currentTarget.id;
    var index = target.currentTarget.dataset.id
    var posts = this.data.postList;
    var that = this;
    wx.request({
      url: 'http://localhost:3000/post/like',
      data: {
        id: id,
        type: 0,
        uid: from_uid
      },
      method: 'POST',
      success: function (res) {
        // console.log(res.data.data.like_peaples);
        posts[index].hasLike = !posts[index].hasLike;
        posts[index].like_peaples = res.data.data.like_peaples;
        that.setData({
          postList: posts
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 评论
   */
  commentTap: function (e) {
    var currentPostId = e.currentTarget.id;
    var postIndex = e.currentTarget.dataset.id;
    var that = this;
    that.setData({
      iscomment: true,
      currentPostId: currentPostId,
      postIndex: postIndex
    })
  },
  /**
   * 评论框失去焦点
   */
  commentBlur: function () {
    var that = this;
    that.setData({
      iscomment: false
    })
  },
  /**
   * 提交评论
   */
  submitComment: function (e) {
    console.log(e)
    var content = e.detail.value;
    var from_uid = this.data.userInfo.id;
    var that = this;
    if (!content) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return 
    }
    wx.request({
      url: 'http://localhost:3000/comment/create_comment',
      data: {
        from_uid: from_uid,
        content: content,
        topic_type: 0,
        topic_id: that.data.currentPostId,
        to_uid: null
      },
      method: 'POST',
      success: function (res) {
        var postIndex = that.data.postIndex;
        var posts = that.data.postList;
        posts[postIndex].comments.push(res.data.data);
        that.setData({
          postList: posts
        })
      },
      fail: function (err) {
        console.warn(err)
      }
    })
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        var userInfo = res.data;
        that.setData({
          userInfo: userInfo
        })
        
        // 首次加载的时候获取数据
        that.getData();
      }
    })
  },
  /**
   * 实现下拉刷新功能
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    // 请求重新刷新数据
    that.getData();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  /**
   * 实现上拉加载
   */
  onReachBottom: function () {
    var that = this;
    // 显示正在加载中
    wx.showLoading({
      title: '拼命加载中'
    })
    // 第几次请求数据
    var pageIndex = that.data.pageIndex + 1;
    that.setData({
      pageIndex: pageIndex
    })
    // 计算要获得的数据量
    var page = that.data.pageIndex * that.data.pageNum;
    console.log(page)
    // 判断是否已经全部加载完成
    console.log(that.data.allPostList.length)
    if (page >= that.data.allPostList.length) {
      var postsArr = that.data.allPostList;
      that.setData({
        hasMore: false
      })
    } else {
      var postsArr = that.data.allPostList.slice(0, page);
    }
    that.setData({
      postList: postsArr
    })
    // 关闭提示框
    wx.hideLoading()
  },
  /**
   * 点击预览图片
   */
  previewImage: function (e) {
    var srcArr = []
    srcArr.push(e.currentTarget.id);
    wx.previewImage({
      urls: srcArr,
      success: function() {
        console.log('success')
      },
      fail: function () {
        console.warn('ddd')
      }
    })
  },
  getData: function () {
    var that = this;
    // 请求获得所有的帖子
    wx.request({
      url: 'http://localhost:3000/post/get_all_posts',
      data: {},
      success: function (res) {
        var posts = res.data.data.posts;
        var activities = res.data.data.activities;
        // 首次取得数据中，页数*每页的数量
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            that.setData({
              userInfo: res.data
            })
            var userId = res.data.id;
  
            posts.forEach((post, index) => {
              // 说明用户没有给该贴点赞过
              var likeUids = post.like_uids;
              if (likeUids) {
                if (likeUids.indexOf(userId) == -1) {
                  post.hasLike = false;
                } else {
                  post.hasLike = true;
                }
              }
            })
            var page = that.data.pageIndex * that.data.pageNum;
            var postsArr = posts.slice(0, page);
            console.log(posts)

            that.setData({
              activities: activities,
              postList: postsArr,
              allPostList: posts
            })

          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})
