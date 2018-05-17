//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://localhost:3000/users/login',
          data: {
            code: res.code
          },
          method: 'POST',
          success: function (res) {
            var userSecretObj = JSON.parse(res.data.data);
            var openid = userSecretObj.openid;
            that.globalData.userId = openid;
            that.globalData.secretId = userSecretObj.session_key;
            that.updateUser(openid);
          },
          fail: function (err) {
            console.warn(err);
          }
        })
      },
      fail: (err) => {
        console.warn(err)
      }
    })
  },
  updateUser: function (openid) {
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials: true,
            lang: '',
            success: (res) => {
              var avatar = res.userInfo.avatarUrl;
              var username = res.userInfo.nickName;
              that.globalData.userInfo = Object.assign({}, that.globalData.userInfo, res.userInfo, {
                id: openid
              })
              // 更新用户，如果没有则新增用户，如存在就更新
              wx.request({
                url: 'http://localhost:3000/users/update_user',
                data: {
                  id: openid,
                  avatar: avatar,
                  username: username
                },
                method: 'POST',
                success: (res) => {
                  console.log('登录成功');
                  //写入缓存
                  wx.setStorage({
                    key: 'userInfo',
                    data: that.globalData.userInfo,
                    success: function (res) {
                      console.log('insert')
                    }
                  })
                },
                fail: (err) => {
                  console.warn(err)
                }
              })
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: '',
    secretId: ''
  }
})