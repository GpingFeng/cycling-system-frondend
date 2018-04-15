// pages/association/association.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 车协列表
    associationList: [{
      title: '广工车协',
      intro: '广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？',
      contentText: '我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦',
      image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2631750191,2248479165&fm=27&gp=0.jpg'
    },
    {
      title: '广工车协',
      intro: '广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？',
      contentText: '我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦',
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523784862558&di=bba79678439e02367275a51e1e436094&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2FQ_xcvdEnqkYrN3YsgNB14g%3D%3D%2F6597201708052102870.jpg'
    },
    {
      title: '广工车协',
      intro: '广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？',
      contentText: '我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦',
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523784929007&di=4de9c049477ae8c74521ad57cea702a8&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01437d57d5030a0000018c1b1dcbd2.jpg%401280w_1l_2o_100sh.png'
    },
    {
      title: '广工车协',
      intro: '广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？',
      contentText: '我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦',
      image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=581475525,2963838037&fm=27&gp=0.jpg'
    },
    {
      title: '广工车协',
      intro: '广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？',
      contentText: '我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦',
      image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2631750191,2248479165&fm=27&gp=0.jpg'
    },
    {
      title: '广工车协',
      intro: '广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？广工车协了解一下？',
      contentText: '我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦我们是广工车协哦',
      image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1650950783,4007799540&fm=27&gp=0.jpg'
    }]
  },
  // 跳转到创建车协页面
  goCreateItem: function () {
    wx.navigateTo({
      url: '../create-association/create-association',
    })
  },
  goAssociationDetail: function () {
    wx.navigateTo({
      url: '../association-detail/association-detail',
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