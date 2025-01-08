// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      //购物车列表信息
      cartArr:[],
      //商品总数量
      goodsCount: 0,
      //商品总金额
      goodsPrice: 0
    },

    toIndex() {
        wx.switchTab({
            url: '/pages/index/index',  // TabBar 页面路径
          });
      },


    toSettle() {
      if(this.data.goodsCount>0) {
        wx.navigateTo({
          url: '/pages/settlement/settlement',
        });
      } else {
        this.miShowModal('您还没有选择宝贝哦！');
      }
    },
    //初始化全查询cart表
    init() {
      let _this = this;
      let customer = wx.getStorageSync('customer');
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
         for(let i=0; i<arr.length; i++) {
           if(arr[i].state==1) {
             totalQuantity += arr[i].quantity;
             totalPrice += arr[i].quantity*arr[i].goodsPrice;
           }
         }
         //给data中的变量赋值
         _this.setData ({
            //购物车列表信息
            cartArr: res.data.data,
            //商品总数量
            goodsCount: totalQuantity,
            //商品总金额
            goodsPrice: totalPrice
         });
        }
      });
    },
    isSelect(e) {
      let goodsId = e.currentTarget.dataset['goodsid'];
      let state = e.currentTarget.dataset['state'];
      let _this = this;
      let customer = wx.getStorageSync('customer');
      wx.request({
        url: 'http://localhost:7001/updateCartState',
        data: {
          telId: customer.telId,
          goodsId: goodsId,
          state: state==1?0:1
        },
        method: 'POST',
        success(res) {
          if(res.data.data.affectedRows==1) {
            _this.init();
          } else {
            _this.miShowModal("选择商品失败");
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
    subQuantity(e) {
      let goodsId = e.currentTarget.dataset['goodsid'];
      let quantity = e.currentTarget.dataset['quantity'];
      if(quantity<=1) {
        return;
      } 
      let _this = this;
        let customer = wx.getStorageSync('customer');
        wx.request({
          url: 'http://localhost:7001/updateQuantityCart',
          data: {
            telId: customer.telId,
            goodsId: goodsId,
            quantity: -1
          },
          method: 'POST',
          success(res) {
           if(res.data.data.affectedRows == 1) {
              _this.init();
           } else {
              _this.miShowModal("更新失败");
           }
          }
        });
    },
    addQuantity(e) {
      let goodsId = e.currentTarget.dataset['goodsid'];
      let quantity = e.currentTarget.dataset['quantity'];
      let _this = this;
        let customer = wx.getStorageSync('customer');
        wx.request({
          url: 'http://localhost:7001/updateQuantityCart',
          data: {
            telId: customer.telId,
            goodsId: goodsId,
            quantity: 1
          },
          method: 'POST',
          success(res) {
           if(res.data.data.affectedRows == 1) {
              _this.init();
           } else {
              _this.miShowModal("更新失败");
           }
          }
        });
    },
    deleteCart(e) {
      let goodsId = e.currentTarget.dataset['goodsid'];
      let _this = this;
        let customer = wx.getStorageSync('customer');
        wx.showModal({
          content: '确认删除该宝贝？',
          showCancel: true,
          cancelText: '我再想想',
          cancelColor: '#888888',
          confirmText: '删除',
          confirmColor: '#FF6700',
          complete: (res) => {
            if (res.cancel) {
              wx.switchTab({
                url: '/pages/cart/cart',
              })
            }
            if (res.confirm) {
              wx.request({
                url: 'http://localhost:7001/deleteCartByTeldByGoodsId',
                data: {
                  telId: customer.telId,
                  goodsId: goodsId,
                },
                method: 'POST',
                success(res) {
                 if(res.data.data.affectedRows == 1) {
                   _this.init();
                 } else {
                    _this.miShowModal("删除失败");
                 }
                }
              });
            }
          }
        })
      
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      //登录验证
      let _this=this
      let customer = wx.getStorageSync('customer');
      if(customer=='') {
        wx.navigateTo({
            url: '/pages/customer/customer'
          });
      } else {
        _this.init();
      }
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