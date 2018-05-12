// pages/create-association/create-association.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    nicknameInput: '',
    fullnameInput: '',
    introInput: ''
  },
  /**
   * 用户输入文本
   */
  nicknameInput: function (e) {
    this.setData({
      nicknameInput: e.detail.value
    })
  },
  fullnameInput: function (e) {
    this.setData({
      fullnameInput: e.detail.value
    })
  },
  introInput: function (e) {
    this.setData({
      introInput: e.detail.value
    })
  },
  /**
   * 提交
   */
  submit: function () {
    var that = this;
    console.log(this.data.userInfo.id)
    var uid = this.data.userInfo.id;
    wx.request({
      url: 'http://localhost:3000/association/create_association',
      data: {
        uid: uid,
        nickname: that.data.nicknameInput,
        fullname: that.data.fullnameInput,
        intro: that.data.introInput,
      },
      method: 'PUT',
      success: function (res) {
        console.log(res);
        console.log(res.data.data.id);
        var postId = res.data.data.id;
        that.data.imageList.forEach((image) => {
          wx.uploadFile({
            url: 'http://localhost:3000/images/create_image',
            filePath: image,
            name: 'image111',
            header: {
              'content-type': 'multipart/form-data'
            }, // 设置请求的 header
            method: 'POST',
            formData: {
              target_id: postId,
              target_type: 1
            },
            success: function (res) {
              console.log(res);
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
  // 点击选择图片
  chooseImage: function () {
    console.log('choose')
    var that = this;
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.data.imageList.push(res.tempFilePaths[0]);
        var temp = that.data.imageList;
        that.setData({
          imageList: temp
        })
      },
    })
  },
  // 点击预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    var temp = this.data.imageList
    wx.previewImage({
      current: current,
      urls: temp
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    // 获得全局的用户信息
    this.setData({
      userInfo: app.globalData.userInfo
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