// pages/create-association/create-association.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageList: []
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