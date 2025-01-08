// pages/myInformation/myInformation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        customer: null,
        address: null
    },

    Logout() {
        // 获取存储的数据
        let customer = wx.getStorageSync('customer');
       // console.log(customer);
        // 移除存储的数据
        wx.removeStorageSync('customer');
        this.setData({
            customer: {
              customerName: '',
              telId: '',
              address: ''
            }
          });

          wx.switchTab({
            url: '/pages/index/index',
        })
    },

    init() {
        let _this = this;
        let customer = wx.getStorageSync('customer');
        //  console.log(customer);
        wx.request({
            url: 'http://localhost:7001/selectAddressByTelIdByDefault',
            data: {
                telId: customer.telId
            },
            method: 'POST',
            success(res) {
                //   console.log("fdfdf");
                //给data中的变量赋值
                _this.setData({
                    address: res.data.data[0]
                });
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _this = this;
        let mycustomer = wx.getStorageSync('customer');
        if (mycustomer == '') {
            wx.showModal({
                content: '请先登录',
                showCancel: false,
                complete: (res) => {
                    if (res.confirm) {
                        wx.reLaunch({
                            url: '/pages/customer/customer',
                        })
                    }
                }
            })
        } else {
            _this.setData({ customer: mycustomer });
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
        let _this = this;
        let mycustomer = wx.getStorageSync('customer');
        if (mycustomer == '') {
            wx.showModal({
                content: '请先登录',
                showCancel: false,
                complete: (res) => {
                    if (res.confirm) {
                        wx.reLaunch({
                            url: '/pages/customer/customer',
                        })
                    }
                }
            })
        } else {
            _this.setData({ customer: mycustomer });
            _this.init();
        }
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