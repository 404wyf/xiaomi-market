const util = require('../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartArr: [], // 购物车列表
    address: {}, // 收货地址信息
    goodsCount: 0, // 购物车商品总数量
    goodsPrice: 0, // 购物车商品总价
    selectedPayment: '', // 当前选择的支付方式
  },

  toIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },

  toPay() {
    let _this = this;
    let customer = wx.getStorageSync('customer');
    let paymentMethod = _this.data.selectedPayment; // 获取当前选择的支付方式

    if (!paymentMethod) {
      _this.miShowModal("请选择支付方式");
      return;
    }

    // 发送请求，生成订单
    wx.request({
      url: 'http://localhost:7001/insertOrders',
      data: {
        telId: customer.telId,
        orderDate: util.formatTime(new Date()),
        orderTotal: _this.data.goodsPrice,
        addressId: _this.data.address.addressId,
        orderState: 0,
        orderDetails: _this.data.cartArr,
      //  paymentMethod: paymentMethod, // 传递支付方式
      },
      method: 'POST',
      success(res) {
        let orderId = res.data.data;
        if (orderId != '') {
          wx.reLaunch({
            url: '/pages/payment/payment?orderId=' + orderId,
          });
        } else {
          _this.miShowModal("生成订单失败");
        }
      }
    });
  },

  miShowModal(msg) {
    wx.showModal({
      content: msg,
      showCancel: false,
      confirmColor: '#FF6700',
    });
  },

  init() {
    let _this = this;
    let customer = wx.getStorageSync('customer');

    // 获取地址信息
    wx.request({
      url: 'http://localhost:7001/selectAddressByTelIdByDefault',
      data: {
        telId: customer.telId,
      },
      method: 'POST',
      success(res) {
        _this.setData({
          address: res.data.data[0],
        });
      }
    });

    // 获取购物车信息
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
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].state == 1) {
            rsArr.push(arr[i]);
            totalQuantity += arr[i].quantity;
            totalPrice += arr[i].quantity * arr[i].goodsPrice;
          }
        }

        _this.setData({
          cartArr: rsArr,
          goodsCount: totalQuantity,
          goodsPrice: totalPrice
        });
      }
    });
  },

  // 监听支付方式选择变化
  onPaymentChange(e) {
    this.setData({
      selectedPayment: e.detail.value, // 获取选择的支付方式
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.init();
  },
});
