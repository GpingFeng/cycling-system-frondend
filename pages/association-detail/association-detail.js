// pages/association-detail/association-detail.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 帖子
    association: {},
    // 用户信息
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    // 获得全局的用户信息
    this.setData({
      userInfo: app.globalData.userInfo
    })
    var that = this;
    // 请求获得详情页面数据
    wx.request({
      url: 'http://localhost:3000/association/get_association_by_id',
      data: {
        id: options.id
        // id: 2
      },
      success: function(res) {
        that.setData({
          association: res.data.data
        })
      },
      fail: function (err) {
        console.warn(err);
      }
    })
  },
  joinassociation: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否加入该车协',
      success: function (res) {
        if (res.confirm) {
          // 确认加入
          var associationId = that.data.association.id,
              userId = that.data.userInfo.id;
          wx.request({
            url: 'http://localhost:3000/users/join_association',
            data: {
              associationId: associationId,
              userId: userId
            },
            method: 'PUT',
            success: (res) => {
              console.log(res);
              if (res.data.data) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'success'
                })
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none'
                })
              }
            },
            fail: (err) => {
              console.warn(err)
            }
          })
        } else {
          // 取消加入
        }
      }
    })
  },
  /**
   * 预览图片
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var tempImages = [];
    console.log(this.data.association.images)
    this.data.association.images.forEach((img) => {
      tempImages.push(img.address)
    })
    
    wx.previewImage({
      current: current,
      urls: tempImages
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