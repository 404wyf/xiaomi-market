// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      customer: {
        telId:'',
        password:''
      }
    },

    toRegister() {
       wx.navigateTo({
         url: '/pages/register/register',
       })
      },
    logIn(e) {
      let form = e.detail.value;
      //表单验证
      if(form.telId=='' || form.password=='' ) {
        this.miShowModal('输入不能为空');
        return;
      }
      if(form.telId.length!=11) {
        this.miShowModal('手机号码必须为11位');
        return;
      }
      let _this = this;
      wx.request({
        url: 'http://localhost:7001/selectCustomerByTelIdByPass',
        data: {
          telId: form.telId,
          password: form.password
        },
        method: 'POST',
        success(res) {
          //判断返回的数据是否是数组（查询失败返回为空）且数组内有数据
          if((res.data.data instanceof Array)&&(res.data.data.length>0)) {
            //将返回的数组里面的对象放入本地存储中
            wx.setStorageSync('customer', res.data.data[0]);
            _this.successShowModal();
          } else {
            _this.miShowModal('手机号码或密码错误，登录失败');
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
    successShowModal() {
      wx.showModal({
        content: '登录成功',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
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