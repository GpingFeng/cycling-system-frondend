// pages/mine/mine.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  /**
   * 跳转到我的车协
   */
  toMyAssociation: function () {
    var from_uid = this.data.userInfo.id;
    // 我的车协接口
    wx.request({
      url: 'http://localhost:3000/users/get_association_by_user',
      data: {
        userId: from_uid
      },
      success: function (res) {
        var id = res.data.data;
        // 跳转到详情页
        wx.navigateTo({
          url: '../association-detail/association-detail?id=' + id
        })
      },
      fail: function (err) {
        console.warn(err)
      }
    })
    
  },
  /**
   * 跳转到我的活动列表页面
   */
  toMyActivities: function () {
    var from_uid = this.data.userInfo.id;
    wx.navigateTo({
      url: '../mine-activity/mine-activity?uid=' + from_uid,
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
