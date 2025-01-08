Page({
    data: {
        customer: {
            telId: '',
            password: '',
            customerName: '',
            address: ''
        }
    },

    bindTelIdInput: function (e) {
        this.setData({
            'customer.telId': e.detail.value
        });
    },

    bindPasswordInput: function (e) {
        this.setData({
            'customer.password': e.detail.value
        });
    },

    bindCustomerNameInput: function (e) {
        this.setData({
            'customer.customerName': e.detail.value
        });
    },

    bindAddressInput: function (e) {
        this.setData({
            'customer.address': e.detail.value
        });
    },

    registerCustomer: function (e) {
        if (this.data.customer.telId === '') {
            wx.showToast({
                title: '手机号码不能为空！',
                icon: 'none'
            });
            return;
        }
        if (this.data.customer.password === '') {
            wx.showToast({
                title: '密码不能为空！',
                icon: 'none'
            });
            return;
        }
        if (this.data.customer.customerName === '') {
            wx.showToast({
                title: '姓名不能为空！',
                icon: 'none'
            });
            return;
        }
        if (this.data.customer.address === '') {
            wx.showToast({
                title: '地址不能为空！',
                icon: 'none'
            });
            return;
        }

        wx.request({
            url: 'http://localhost:7001/register',
            data: {
                telId: this.data.customer.telId,
                password: this.data.customer.password,
                customerName: this.data.customer.customerName,
                address: this.data.customer.address,
                remarks: null,
                defaultState: 1
            },
            method: 'POST',
            success(res) {
               // console.log(res.data.data);
                if (res.data.data !== 1) {
                    this.miShowModal('手机号码或密码错误，登录失败');
                }
                else {
                    console.log("fddf");
                    wx.navigateBack();
                }
            }

        });

    },

    toLogin() {
        wx.navigateTo({
            url: '/pages/customer/customer',
        })
    },
    onLoad(options) {

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