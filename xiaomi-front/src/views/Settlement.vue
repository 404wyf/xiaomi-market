<template>
  <div class="container">
    <header>
      <p>用户结算</p>
    </header>

    <section>
      <!-- 地址部分 -->
      <div style="width: 100%; height: 13.9vw"></div>
      <div class="address">
        <ul>
          <li></li>
        </ul>
        <div class="content">
          <div class="content-left">
            <h3>{{ address.contactName }} {{ address.contactTel }}</h3>
            <p>{{ address.address }}</p>
          </div>
          <div class="content-right" onclick="location.href='addressList.html'">
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
      </div>

      <!-- 购物车详情部分 -->
      <div class="detailed">
        <ul>
          <li v-for="cart in cartArr" :key="cart.cartId">
            <div class="detailed-left">
              <img :src="cart.goodsImg" />
              <p>{{ cart.goodsName }}</p>
            </div>
            <div class="detailed-right">
              <p>￥{{ cart.goodsPrice }}</p>
              <p>x {{ cart.quantity }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- 支付方式选择部分 -->
      <div class="payment">
        <ul>
          <li>
            <div class="payment-left">
              <img src="../assets/payment01.png" />
              <p>支付宝</p>
            </div>
            <input type="radio" v-model="selectedPaymentMethod" value="alipay" />
          </li>
          <li>
            <div class="payment-left">
              <img src="../assets/payment02.png" />
              <p>小米钱包</p>
            </div>
            <input type="radio" v-model="selectedPaymentMethod" value="xiaomi" />
          </li>
          <li>
            <div class="payment-left">
              <img src="../assets/payment03.png" />
              <p>微信支付</p>
            </div>
            <input type="radio" v-model="selectedPaymentMethod" value="wechat" />
          </li>
        </ul>
      </div>
      <div style="width: 100%; height: 14.4vw"></div>
    </section>

    <footer>
      <ul>
        <li>共{{ goodsTotalQuantity }}件 合计：￥{{ goodsTotalPrice }}</li>
        <li @click="toPayment">去付款</li>
      </ul>
    </footer>
  </div>
</template>
  
  <script setup>
  import { ref, inject, computed } from "vue";
  import { useRouter } from "vue-router";
  import { getSessionStorage, getCurDate, getCurTime } from "../utils/common.js";
  
  const axios = inject("axios");
  const router = useRouter();
  
  const address = ref({});
  const cartArr = ref([]);
  const customer = getSessionStorage("customer");
  
  // 当前选择的支付方式，默认为支付宝
  const selectedPaymentMethod = ref("alipay");
  
  //计算商品总数量和总金额
  const goodsTotalQuantity = computed(() => {
    let totalQuantity = 0;
    for (let i = 0; i < cartArr.value.length; i++) {
      totalQuantity += cartArr.value[i].quantity;
    }
    return totalQuantity;
  });
  
  const goodsTotalPrice = computed(() => {
    let totalPrice = 0;
    for (let i = 0; i < cartArr.value.length; i++) {
      totalPrice += cartArr.value[i].quantity * cartArr.value[i].goodsPrice;
    }
    return totalPrice;
  });
  
  //初始化
  const init = () => {
    axios
      .post("selectAddressByTelIdByDefault", {
        telId: customer.telId,
      })
      .then((response) => {
        address.value = response.data.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  
    axios
      .get("selectCartByTelId", {
        params: {
          telId: customer.telId,
        }
      })
      .then((response) => {
        let arr = response.data.data;
        for (let cart of arr) {
          if (cart.state == 1) {
            cartArr.value.push(cart);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  init();
  
  // 处理支付按钮点击
  const toPayment = () => {
    axios
      .post("insertOrders", {
        telId: customer.telId,
        orderDate: getCurDate() + ' ' + getCurTime(),
        orderTotal: goodsTotalPrice.value,
        addressId: address.value.addressId,
        orderState: 0,
        orderDetails: cartArr.value,
       // paymentMethod: selectedPaymentMethod.value, // 传递选择的支付方式
      })
      .then((response) => {
        let orderId = response.data.data;
        if (orderId != '') {
          router.push({ path: '/payment', query: { orderId: orderId } });
        } else {
          alert('生成订单失败！');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  </script>
  
  <style scoped>
  /*********************** 总容器 *********************/
  .container {
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
  
  /*********************** header 头部 *********************/
  header {
    width: 100%;
    height: 13.9vw;
  
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  
    /*box-shadow: 0 2px 4px -1px #CCC;*/
  }
  header p {
    line-height: 13.9vw;
    text-align: center;
    font-size: 4.2vw;
    color: #666;
  }
  
  /*********************** section 部分 *********************/
  section {
    width: 100%;
  }
  section .address {
    width: 100%;
    background-color: #fff;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    margin-bottom: 1.8vw;
  }
  section .address ul {
    width: 100%;
    height: 1vw;
    display: flex;
    justify-content: space-between;
  }
  section .address ul li {
    flex: 1;
    height: 1vw;
    margin: 0 0.6vw;
    transform: skew(-30deg);
  }
  section .address ul li:nth-child(odd) {
    background-color: #ff8a81;
  }
  section .address ul li:nth-child(even) {
    background-color: #8fcaf9;
  }
  section .address .content {
    width: 100%;
    box-sizing: border-box;
    padding: 5.6vw;
  
    display: flex;
    justify-content: space-between;
  }
  section .address .content .content-left {
    flex: 0 0 80vw;
  }
  section .address .content .content-left h3 {
    font-size: 4.2vw;
    color: #3c3c3c;
    margin-bottom: 2vw;
  }
  section .address .content .content-left p {
    font-size: 3.3vw;
    color: #757575;
  }
  section .address .content .content-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  
    user-select: none;
    cursor: pointer;
  }
  section .address .content .content-right i {
    font-size: 6vw;
    color: #3c3c3c;
  }
  
  section .detailed {
    width: 100%;
    margin-bottom: 1.8vw;
    background-color: #fff;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
  }
  section .detailed .info {
    width: 100%;
    box-sizing: border-box;
    padding: 3.6vw 5vw;
    font-size: 3.3vw;
    color: #3c3c3c;
  }
  
  section .detailed ul {
    width: 100%;
  }
  section .detailed ul li {
    width: 100%;
    height: 18vw;
    box-sizing: border-box;
    padding: 2vw 5vw;
    border-top: solid 1px #eee;
  
    display: flex;
    align-items: center;
    justify-content: space-between;
  
    font-size: 3.3vw;
    color: #3c3c3c;
  }
  section .detailed ul li .detailed-left {
    display: flex;
    align-items: center;
  }
  section .detailed ul li .detailed-left img {
    width: 16vw;
    height: 14vw;
    margin-right: 2vw;
  }
  section .detailed ul li .detailed-right {
    text-align: right;
  }
  section .detailed ul li .detailed-right p:last-child {
    margin-top: 2vw;
    color: #bbb;
  }
  
  section .payment {
    width: 100%;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    background-color: #fff;
  }
  section .payment ul {
    width: 100%;
  }
  section .payment ul li {
    width: 89vw;
    height: 12.5vw;
    margin: 0 auto;
    border-bottom: solid 1px #eee;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  section .payment ul li .payment-left {
    display: flex;
    align-items: center;
  }
  section .payment ul li .payment-left img {
    width: 8.9vw;
    height: 8.9vw;
    margin-right: 3vw;
  }
  section .payment ul li .payment-left p {
    font-size: 3.6vw;
    color: #333;
  }
  section .payment ul li input {
    width: 4.5vw;
    height: 4.5vw;
  }
  /*********************** footer 部分 *********************/
  footer {
    width: 100%;
    height: 14.4vw;
    background-color: #fff;
    box-shadow: 0 3px 14px 2px #ccc;
  
    position: fixed;
    left: 0;
    bottom: 0;
  
    display: flex;
  }
  footer ul {
    width: 100%;
    display: flex;
  }
  footer ul li {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.2vw;
    color: #ff6700;
  
    user-select: none;
    cursor: pointer;
  }
  footer ul li:last-child {
    background-color: #ff6700;
    color: #fff;
  }
  </style>