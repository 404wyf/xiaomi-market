// pages/payment/payment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      orders: {},
      orderdetailsArr: []
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      let _this = this;
      //订单信息
      wx.request({
        url: 'http://localhost:7001/selectOrdersById',
        data: {
          orderId: options.orderId
        },
        method: 'GET',
        success(res) {
          _this.setData ({
            orders: res.data.data[0],
          });
         // console.log(res.data[0])
        }
      });
 
      //订单明细信息
      wx.request({
        url: 'http://localhost:7001/selectOrderdetailsByOrderId',
        data: {
          orderId: options.orderId
        },
        method: 'GET',
        success(res) {
          _this.setData ({
            orderdetailsArr: res.data.data,
          });
        }
      });
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
  
    }
  })