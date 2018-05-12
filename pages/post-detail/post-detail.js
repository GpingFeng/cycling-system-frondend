// pages/post-detail/post-detail.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 帖子
    post: {},
    // 评论
    comments:  [],
    // 喜欢人数
    likePeaple: 0,
    // 是否点赞
    hadLike: false,
    // 是否显示遮罩层
    isShowMask: false,
    // 被回复人的Id
    replyToUserId: '',
    // 回复框输入的信息
    replyInput: '',
    // 用户信息
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得全局的用户信息
    this.setData({
      userInfo: app.globalData.userInfo
    })
    var that = this;
    var from_uid = this.data.userInfo.id;
    // 请求获得详情页面数据
    wx.request({
      url: 'http://localhost:3000/post/get_post',
      data: {
        id: options.id
      },
      success: function(res) {
        that.setData({
          post: res.data.data,
          likePeaple: res.data.data.like_peaples,
          comments: res.data.data.comments
        })
        var likeUids = res.data.data.like_uids;
        var likeUidsArr = likeUids.split(',');
        // 根据返回的点赞用户判断是否已经点赞
        if (likeUidsArr.indexOf(from_uid) != -1) {
          that.setData({
            hadLike: true
          })
        } else {
          that.setData({
            hadLike: false
          })
        }
      },
      fail: function (err) {
        console.warn(err);
      }
    })
  },
  /**
   * 用户输入回复框 
   */
  replyInput: function (e) {
    this.setData({
      replyInput: e.detail.value
    })
  },
  /**
   * 弹出回复框
   */
  replyUser: function (target) {
    this.setData({
      isShowMask: true,
      replyToUserId: target.currentTarget.id
    })
  },
  /**
   * 预览图片
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var tempImages = [];
    this.data.post.images.forEach((img) => {
      tempImages.push(img.address)
    })
    
    wx.previewImage({
      current: current,
      urls: tempImages
    })
  },
  /**
   * 回复
   */
  replyTap: function () {
    var that = this;
    var from_uid = this.data.userInfo.id;
    wx.request({
      url: 'http://localhost:3000/comment/create_comment',
      data: {
        from_uid: from_uid,
        content: that.data.replyInput,
        topic_type: 0,
        topic_id: that.data.post.id,
        to_uid: that.data.replyToUserId
      },
      method: 'POST',
      success: function (res){
        that.data.comments.push(res.data.data);
        that.setData({
          comments: that.data.comments
        })
      }, 
      fail: function (err) {
        console.warn(err)
      }
    })
    this.setData({
      isShowMask: false
    })
  },
  /**
   * 评论
   */
  commentTap: function () {
    this.setData({
      isShowMask: true,
      replyToUserId: ''
    })
  },
  /**
   * 关闭弹窗
   */
  closeMask: function () {
    this.setData({
      isShowMask: false
    })
  },
  /**
   * 点赞
   */
  likeTap: function (target) {
    var from_uid = this.data.userInfo.id;
    var id = target.currentTarget.id
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
        // console.log(res.data.data.like_peaples)
        that.setData({
          likePeaple: res.data.data.like_peaples
        })

        var likeUids = res.data.data.like_uids;
        var likeUidsArr = likeUids.split(',');
        // console.log(likeUidsArr)
        if (likeUidsArr.indexOf(from_uid) != -1) {
          that.setData({
            hadLike: true
          })
        } else {
          that.setData({
            hadLike: false
          })
        }
        
      },
      fail: function (err) {
        console.log(err)
      }
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