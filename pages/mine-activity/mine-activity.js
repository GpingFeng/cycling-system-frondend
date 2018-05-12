// pages/mine-activity/mine-activity.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 活动列表
    activityList: []
  },
  goActivityDetail: function (e) {
    console.log(e.currentTarget.id);
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../activity-detail/activity-detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var uid = options.uid;
    console.log(uid)
    wx.request({
      url: 'http://localhost:3000/useractivity/get_activity_by_user',
      data: {
        id: uid
      },
      success: (res) => {
        console.log(res.data)
        that.setData({
          activityList: res.data.data
        })
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
