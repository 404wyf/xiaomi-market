<template>
    <div class="container">
  
          <header>
              <p>支付平台页面</p>
          </header>
  
          <section>
              <div style="width: 100%;height: 13.9vw;"></div>
              <div class="payment-info">第三方支付平台页面</div>
              <div class="order-info">
                  <p>订单编号：{{orders.orderId}}</p>
                  <p>订单金额：{{orders.orderTotal}}￥</p>
                  <p>客户编号：{{orders.telId}}</p>	
                  <p>客户名称：{{orders.contactName}}</p>			
                  <p>订单状态：等待付款</p>
                  <p>收货地址：{{orders.address}}</p>
                  <p>联 系 人：{{orders.contactName}}</p>
                  <p>联系电话：{{orders.contactTel}}</p>
                  <p>订购商品：</p>
                  <p v-for="(od,index) in orderdetailsArr" :key="od.odId">
                      {{index+1}}、{{od.goodsName}} x {{od.quantity}}
                  </p>
              </div>
              <div style="width: 100%; height: 14.4vw;"></div>
          </section>
  
          <Footer></Footer>
  
      </div>
  </template>
  
  <script setup>
  import Footer from "@/components/Footer.vue";
  import { useRoute } from "vue-router";
  import { ref, inject } from "vue";
  
  const axios = inject("axios");
  const route = useRoute();
  
  const orders = ref({});
  const orderdetailsArr = ref([]);
  
  //初始化
  const init = () => {
    axios
      .get("selectOrdersById", {
        params:
        {
          orderId: route.query.orderId
        }
       
      })
      .then((response) => {
        orders.value = response.data.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  
    axios
      .get("selectOrderdetailsByOrderId", {
        params:{
          orderId: route.query.orderId
        }
        
      })
      .then((response) => {
        orderdetailsArr.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  init();
  
  </script>
  
  <style scoped>
  /*********************** 总容器 *********************/
  .container{
      width: 100%;
      height: 100%;
  }
  
  /*********************** header 头部 *********************/
  header{
      width: 100%;
      height: 13.9vw;
      background-color: #EEE;
  
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
  }
  header p{
      line-height: 13.9vw;
      text-align: center;
      font-size: 4.2vw;
      color: #666;
  }
  
  /*********************** section 部分 *********************/
  section{
      width: 100%;
  }
  section .payment-info{
      width: 80vw;
      margin: 0 auto;
      font-size: 5vw;
      line-height: 30vw;
      text-align: center;
  }
  section .order-info {
    width: 80vw;
    margin: 0 auto;
    font-size: 3.6vw;
    color: #333;
  }
  section .order-info p{
    margin-bottom: 1vw;
  }
  </style>