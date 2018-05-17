// pages/create-post/create-post.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 选择的图片
    imageList: [],
    // 输入的文本
    inputText: '',
    // 用户信息
    userInfo: {}
  },
  /**
   * 点击选择图片
   */
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.data.imageList.push(res.tempFilePaths[0]);
        var temp = that.data.imageList;
        that.setData({
          imageList: temp
        })
      },
    })
  },
  /**
   * 点击预览图片
   */
  previewImage: function (e) {
    var current = e.target.dataset.src
    var temp = this.data.imageList
    wx.previewImage({
      current: current,
      urls: temp
    })
  },
  /**
   * 用户输入文本
   */
  inputText: function (e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  /**
   * 发表帖子接口
   */
  publishPost: function () {
    var that = this;
    var uid = this.data.userInfo.id;
    // 创建帖子
    wx.request({
      url: 'http://localhost:3000/post/create_post',
      data: {
        uid: uid,
        content_text: that.data.inputText
      },
      method: 'PUT',
      success: function (res) {
        var postId = res.data.data.id;
        // 图片上传
        if (that.data.imageList.length == 0) {
          // 发表成功后跳转
          wx.switchTab({
            url: '../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
        that.data.imageList.forEach((image) => {
          wx.uploadFile({
            url: 'http://localhost:3000/images/create_image',
            filePath: image,
            name: 'image',
            header: {
              'Content-Type': 'multipart/form-data'
            }, // 设置请求的 header
            method: 'POST',
            formData: {
              target_id: postId,
              target_type: 0
            },
            success: function (res) {
              console.log(res);
              // 发表成功后跳转
              wx.switchTab({
                url: '../index/index',
                success: function (e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })
            },
            fail: function (err) {
              console.warn(err);
            }
          })
        })
      },
      fail: function (err) {
        console.warn(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res)
        // 获得全局的用户信息
        that.setData({
          userInfo: res.data
        })
      },
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