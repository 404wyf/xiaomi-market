const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //购物车列表
    cartArr: [],
    //收货地址信息
    address: {},
    //购物车商品总数量
    goodsCount: 0,
    //购物车商品总价
    goodsPrice: 0
  },
toIndex() {
  wx.switchTab({
    url: '/pages/index/index',
  })
},
toPay() {
  let _this = this;
  let customer = wx.getStorageSync('customer');
  //console.log(_this.data.cartArr)
  wx.request({
    url: 'http://localhost:7001/insertOrders',
    data: {
        telId: customer.telId,
        orderDate: util.formatTime(new Date()),
        orderTotal: _this.data.goodsPrice,
        addressId: _this.data.address.addressId,
        orderState: 0,
        orderDetails:_this.data.cartArr
    },
    method: 'POST',
    success(res) {
     let orderId = res.data.data;
     if(orderId!='') {
       wx.reLaunch({
         url: '/pages/payment/payment?orderId='+orderId
       })
     } else {
       _this.miShowModal("失败");
     }
   
    }
  });
},
miShowModal(msg) {
  wx.showModal({
    content: msg,
    showCancel: false,
    confirmColor: '#FF6700',
  })
},
//初始化
init() {
  let _this = this;
  let customer = wx.getStorageSync('customer');
  //地址信息
  wx.request({
    url: 'http://localhost:7001/selectAddressByTelIdByDefault',
    data: {
      telId: customer.telId,
    },
    method: 'POST',
    success(res) {
     //给data中的变量赋值
     _this.setData ({
        address: res.data.data[0],
     });
    }
  });
  //购物车信息
  wx.request({
    url: 'http://localhost:7001/selectCartByTelId',
    data: {
      telId: customer.telId,
    },
    method: 'GET',
    success(res) {
     let totalQuantity = 0;
     let totalPrice = 0;
     let arr = res.data.data;
     let rsArr = [];
     for(let i=0; i<arr.length; i++) {
       if(arr[i].state==1) {
         rsArr.push(arr[i]);
         totalQuantity += arr[i].quantity;
         totalPrice += arr[i].quantity*arr[i].goodsPrice;
       }
     }
    // console.log(customer.telId);
     //console.log(arr)
     //给data中的变量赋值
     _this.setData ({
        cartArr: rsArr,
        goodsCount: totalQuantity,
        goodsPrice: totalPrice
     });
    }
  });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
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
    this.init();
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