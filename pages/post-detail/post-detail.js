// pages/post-detail/post-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    comments:  [],
    likePeaple: 0,
    focusIndex: 1,
    hadLike: false,
    isShowMask: false,
    replyToUserId: '',
    replyInput: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 请求获得详情页面数据
    wx.request({
      url: 'http://localhost:3000/post/get_post',
      data: {
        id: 2
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
        if (likeUidsArr.indexOf('1') != -1) {
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
   * 回复
   */
  replyTap: function () {
    var that = this;
    
    wx.request({
      url: 'http://localhost:3000/comment/create_comment',
      data: {
        from_uid: 2,
        content: that.data.replyInput,
        topic_type: 0,
        topic_id: that.data.post.id,
        to_uid: that.data.replyToUserId
      },
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
    var id = target.currentTarget.id
    var that = this;
    wx.request({
      url: 'http://localhost:3000/post/like',
      data: {
        id: id,
        type: 0,
        uid: 1
      },
      success: function (res) {
        // console.log(res.data.data.like_peaples)
        that.setData({
          likePeaple: res.data.data.like_peaples
        })

        var likeUids = res.data.data.like_uids;
        var likeUidsArr = likeUids.split(',');
        // console.log(likeUidsArr)
        if (likeUidsArr.indexOf('1') != -1) {
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