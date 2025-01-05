/**
   * @param {Egg.Application} app - egg application
   */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.get("/home", controller.home.home);

  router.get("/list", controller.goods.list);
/**customer */
  router.post("/register", controller.customer.register);
  router.post("/selectCustomerByTelIdByPass", controller.customer.login);


  /*goodsType*/
  router.get("/selectGoodsTypeAll", controller.goodsType.getGoodsTypeAll);
  router.get("/selectGoodsTypeAllByPC", controller.goodsType.getGoodsTypeAllByPC);



  /**goods */
  router.get("/selectGoodsByGoodsTypeId", controller.goods.getGoodsByGoodsTypeId);
  router.post("/selectGoodsById", controller.goods.getGoodsById);


  /**cart */
  router.post("/selectCartByTelIdByGoodsId", controller.cart.getCartByTelIdByGoodsId);
  router.post("/insertCart", controller.cart.insertCart);
  router.post("/updateQuantityCart", controller.cart.updateQuantityCart);
  router.get("/selectCartByTelId", controller.cart.getCartByTelId);
  router.get("/selectCartCountByTelId", controller.cart.getCartCountByTelId);
  router.post("/updateCartState", controller.cart.updateCartState);
  router.post("/deleteCartByTeldByGoodsId", controller.cart.deleteCartByTeldByGoodsId);


  /**address */
  router.post("/selectAddressByTelIdByDefault", controller.address.getAddressByTelIdByDefault);


  /**orders */
  router.post("/insertOrders", controller.orders.insertOrders);
  router.get("/selectOrdersById",controller.orders.getOrdersById);


  /**orderdetails */
  router.get("/selectOrderdetailsByOrderId",controller.orderdetails.getOrderdetailsByOrderId);
};