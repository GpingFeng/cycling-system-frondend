// pages/association/association.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 车协列表
    associationList: [],
    // 用户信息
    userInfo: {}
  },
  // 跳转到创建车协页面
  goCreateItem: function () {
    wx.navigateTo({
      url: '../create-association/create-association',
    })
  },
  /**
   * 点击跳转到车协详情页
   */
  goAssociationDetail: function (e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../association-detail/association-detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得全局的用户信息
    this.setData({
      userInfo: app.globalData.userInfo
    })
    var type = options.type,
        that = this,
        uid = this.data.userInfo.id;
    // 如果从‘我的’跳转过来，则只需请求用户自身的车协
    if (type == 'mine') {
      wx.request({
        url: 'http://localhost:3000/user/get_association_by_user',
        data: {
          userId: uid
        },
        success: (res) => {
          console.log(res);
          that.setData({
            associationList: res.data.data
          })
        },
        fail: (err) => {
          console.warn(err);
        }
      })
    } else {
      wx.request({
        url: 'http://localhost:3000/association/get_all_association',
        data: {},
        success: (res) => {
          console.log(res);
          that.setData({
            associationList: res.data.data
          })
        },
        fail: (err) => {
          console.warn(err);
        }
      })
    } 
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