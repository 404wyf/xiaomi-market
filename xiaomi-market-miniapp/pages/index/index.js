Page({

    /**
     * 页面的初始数据
     */
    data: {
      goodsTypeArr: [],
      goodsType: {},
      goodsArr: []
    },
  toGoods(event) {
    let goodsId = event.currentTarget.dataset['goodsid'];
    wx.navigateTo({
      url: '/pages/goods/goods?goodsId='+goodsId,
    })
  },
  selectGoodsByGoodsTypeId(goodsTypeId) {
    let _this = this;
      wx.request({
        url: 'http://localhost:7001/selectGoodsByGoodsTypeId',
        data: {
          goodsTypeId: goodsTypeId
        },
        method: 'GET',
        success(res) {
          //  console.log(res.data.data);
          _this.setData({
            goodsArr: res.data.data
          });
          // console.log(_this.data.goodsArr);
        }
      });
  },
  selectGoodsType(event) {
    let index = event.currentTarget.dataset['index'];
    this.setData({
      goodsType: this.data.goodsTypeArr[index]
    });
    this.selectGoodsByGoodsTypeId(this.data.goodsType.goodsTypeId);
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      let _this = this;
      wx.request({
        url: 'http://localhost:7001/selectGoodsTypeAll',
        method: 'GET',
        header: {
            'content-type': 'application/json' // 默认值
          },
        success(res) {
          //  console.log(res.data);
          _this.setData({
            goodsTypeArr: res.data.data,
            goodsType: res.data.data[0]
         });
        _this.selectGoodsByGoodsTypeId(res.data.data[0].goodsTypeId);
        //   console.log(_this.data.goodsTypeArr);
        //   console.log(_this.data.goodsType);
        }
      });
    }
  
  })