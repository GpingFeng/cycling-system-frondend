// pages/join-association/join-association.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    // 要加入的车协的Id
    associationId: '',
    // 真实姓名
    realname: '',
    // 联系电话
    phone: '',
    // 联系邮箱
    mail: ''
  },
  inputname: function (e) {
    this.setData({
      realname: e.detail.value
    })
  },
  inputmail: function (e) {
    this.setData({
      mail: e.detail.value
    })
  },
  inputphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 加入车协
   */
  joinAssociation: function () {
    var that = this;
    var associationId = this.data.associationId;
    var warn = "";//弹框时提示的内容  
    var flag = true;//判断信息输入是否完整  
    //判断的顺序依次是：姓名-手机号-邮箱
    if (that.data.realname == "") {
      warn = "请填写您的真实姓名！";
    } else if (that.data.phone == "") {
      warn = "请填写您的手机号！";
    } else if (!/^1(3|4|5|7|8)\d{9}$/.test(that.data.phone)) {
      warn = "手机号码格式不正确"
    } else if (that.data.mail == ""){
      warn = "请填写您的邮箱"
    } else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(that.data.mail) ) {
      warn = "邮箱格式不正确"
    } else {
      flag = false;
    }

    if (flag) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '是否加入该车协',
        success: function (res) {
          // 确认加入
          if (res.confirm) {
            var userId = that.data.userInfo.id;
            // 用户加入车协接口
            wx.request({
              url: 'http://localhost:3000/users/join_association',
              data: {
                associationId: associationId,
                userId: userId,
                realname: that.data.realname,
                mail: that.data.mail,
                phone: that.data.phone
              },
              method: 'PUT',
              success: (res) => {
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
          }
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var associationId = options.id;
    this.setData({
      associationId: associationId,
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