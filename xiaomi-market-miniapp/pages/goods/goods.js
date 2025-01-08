// pages/goods/goods.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      goods: {}
    },
    toCart() {
      let customer = wx.getStorageSync('customer');
      if(customer=='') {
        wx.switchTab({
          url: '/pages/customer/customer',
        })
      } else {
        wx.switchTab({
          url: '/pages/cart/cart',
        })
      }
    },
    addCart() {
      //登录验证
      //取本地存储的用户信息,为空则未登录
      let customer = wx.getStorageSync('customer');
      if(customer=='') {
        wx.switchTab({
          url: '/pages/customer/customer',
        })
      } else {
        let _this = this;
        wx.request({
        url: 'http://localhost:7001/selectCartByTelIdByGoodsId',
        data: {
          telId: customer.telId,
          goodsId: _this.data.goods.goodsId
        },
        method: 'POST',
        success(res) {
          //判断返回的行数res.data是否为空
          if(res.data.data==0) {
             // console.log("fdfd");
            _this.insertCart();
          } else {
            _this.updateCart();
          }
        }
      });      
      }
    },
    insertCart() {
      let _this = this;
      let customer = wx.getStorageSync('customer');
      wx.request({
        url: 'http://localhost:7001/insertCart',
        data: {
          telId: customer.telId,
          goodsId: _this.data.goods.goodsId,
          quantity: 1,
          state: 1
        },
        method: 'POST',
        success(res) {
         if(res.data.data.affectedRows == 1) {
            _this.miShowModal('加入购物车成功');
            
         } else {
            _this.miShowModal('加入购物车失败');
         }
        }
      });
    },
    updateCart() {
        let _this = this;
        let customer = wx.getStorageSync('customer');
        wx.request({
          url: 'http://localhost:7001/updateQuantityCart',
          data: {
            telId: customer.telId,
            goodsId: _this.data.goods.goodsId,
            quantity: 1
          },
          method: 'POST',
          success(res) {
            // console.log(res.data.affectedRows)
           if(res.data.data.affectedRows == 1) {
              _this.miShowModal('加入购物车成功');
           } else {
              _this.miShowModal('加入购物车失败');
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      let _this = this;
      wx.request({
        url: 'http://localhost:7001/selectGoodsById',
        data: {
          goodsId: options.goodsId
        },
        method: 'POST',
        success(res) {
          _this.setData({
            goods: res.data.data[0]
          });
        //  console.log(res.data.data[0]);
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