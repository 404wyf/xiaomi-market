<template>
    <div class="container">
      <header>
        <p>购物车</p>
      </header>
  
      <section>
        <div style="width: 100%; height: 13.9vw"></div>
        <img
          class="cart-null"
          v-if="cartArr.length == 0"
          src="../assets/cartnull.png"
        />
        <ul>
          <li v-for="cart in cartArr" :key="cart.cartId">
            <div>
              <i
                class="fa fa-check-circle"
                v-show="cart.state == 1"
                @click="isSelect(cart.goodsId, cart.state)"
              ></i>
              <i
                class="fa fa-circle-o"
                v-show="cart.state == 0"
                @click="isSelect(cart.goodsId, cart.state)"
              ></i>
            </div>
            <div>
              <img :src="cart.goodsImg" />
            </div>
            <div>
              <h3>{{ cart.goodsName }}</h3>
              <p>售价：{{ cart.goodsPrice }}元</p>
              <div class="quantity-box">
                <div class="quantity-box-left">
                  <div
                    class="change"
                    @click="changeQuantity(cart.goodsId, cart.quantity, -1)"
                  >
                    -
                  </div>
                  <div class="quantity">{{ cart.quantity }}</div>
                  <div
                    class="change"
                    @click="changeQuantity(cart.goodsId, cart.quantity, 1)"
                  >
                    +
                  </div>
                </div>
                <div class="quantity-box-right">
                  <i class="fa fa-trash-o" @click="delGoods(cart.goodsId)"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div style="width: 100%; height: 14.4vw"></div>
      </section>
  
      <footer>
        <ul>
          <li>
            <p>共{{goodsTotalQuantity}}件</p>
            <p>金额：<span>{{goodsTotalPrice}}</span>元</p>
          </li>
          <li @click="toGoodsType">继续购物</li>
          <li v-show="goodsTotalQuantity>=1" @click="toSettlement">去结算</li>
        </ul>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import { ref, inject, computed } from "vue";
  import { getSessionStorage } from "../utils/common.js";
  
  const axios = inject("axios");
  const router = useRouter();
  
  const cartArr = ref([]);
  const customer = getSessionStorage("customer");
  
  //使用计算属性获取商品总数量和总金额
  const goodsTotalQuantity = computed(()=>{
      let totalQuantity = 0;
      for(let i=0;i<cartArr.value.length;i++){
          if(cartArr.value[i].state==1){
              totalQuantity += cartArr.value[i].quantity;
          }
      }
    //  console.log("quantity"+totalQuantity);
      return totalQuantity;
  })
  const goodsTotalPrice = computed(()=>{
      let totalPrice = 0;
      for(let i=0;i<cartArr.value.length;i++){
          if(cartArr.value[i].state==1){
              totalPrice += cartArr.value[i].quantity*cartArr.value[i].goodsPrice;
          }
      }
     // console.log("price"+totalPrice);
      return totalPrice;
  })
  
  //初始化
  const init = () => {
    axios
      .get("selectCartByTelId", {
        params:{
          telId: customer.telId,
        }
       
      })
      .then((response) => {
        cartArr.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  init();
  
  const isSelect = (goodsId, state) => {
    axios
      .post("updateCartState", {
        telId: customer.telId,
        goodsId: goodsId,
        state: state == 1 ? 0 : 1,
      })
      .then((response) => {
        if (response.data.data.affectedRows == 1) {
          init();
        } else {
          alert("选择商品失败！");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const changeQuantity = (goodsId, quantity, num) => {
    if (quantity <= 1 && num == -1) {
      return;
    }
    axios
      .post("updateQuantityCart", {
        telId: customer.telId,
        goodsId: goodsId,
        quantity: num 
      })
      .then((response) => {
        if (response.data.data.affectedRows == 1) {
          init();
        } else {
          alert("更新数量失败！");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const delGoods = (goodsId) => {
      if(!confirm('确认要删除此商品吗？')){
          return;
      }
      axios
      .post("deleteCartByTeldByGoodsId", {
        telId: customer.telId,
        goodsId: goodsId
      })
      .then((response) => {
        // console.log("fdfd");
        // console.log(response.data.data);
        if (response.data.data.affectedRows == 1) {
          init();
        } else {
          alert("删除商品失败！");
        }
      })
      .catch((error) => {
        console.log(error);
      });

     
  }
  
  const toGoodsType = ()=>{
      router.push('/goodsType');
  }
  
  const toSettlement = ()=>{
      router.push('/settlement');
  }
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
    background-color: #eee;
  
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
  section .cart-null {
    width: 100vw;
  }
  section ul {
    /*display:none;*/
    width: 100%;
  }
  section ul li {
    width: 100%;
    height: 28vw;
    box-sizing: border-box;
    padding: 3vw;
    background-color: #fff;
    margin-bottom: 3.6vw;
  
    display: flex;
  }
  section ul li > div:nth-child(1) {
    flex: 0 0 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  section ul li > div:nth-child(2) {
    flex: 0 0 26vw;
  }
  section ul li > div:nth-child(3) {
    flex: 1;
    box-sizing: border-box;
    padding-left: 3vw;
  }
  section ul li > div:nth-child(1) i {
    font-size: 6vw;
    color: #ff6700;
  }
  section ul li > div:nth-child(2) img {
    width: 26vw;
    height: 22vw;
    box-sizing: border-box;
    border: solid 1px #ddd;
  }
  section ul li > div:nth-child(3) h3 {
    font-weight: 300;
    font-size: 4vw;
    color: #666;
    margin-bottom: 1vw;
  }
  section ul li > div:nth-child(3) p {
    font-size: 3.3vw;
    color: #999;
    margin-bottom: 1vw;
  }
  section ul li > div:nth-child(3) .quantity-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  section ul li > div:nth-child(3) .quantity-box .quantity-box-left {
    width: 24vw;
    height: 9vw;
    border: solid 1px #eee;
    display: flex;
  }
  section ul li > div:nth-child(3) .quantity-box .quantity-box-left .change {
    width: 9vw;
    height: 9vw;
    background-color: #f4f4f4;
    color: #666;
    font-size: 6vw;
  
    line-height: 9vw;
    text-align: center;
    user-select: none;
    cursor: pointer;
  }
  section ul li > div:nth-child(3) .quantity-box .quantity-box-left .quantity {
    width: 9vw;
    height: 9vw;
    color: #666;
    font-size: 5vw;
  
    line-height: 9vw;
    text-align: center;
    user-select: none;
    cursor: pointer;
  }
  section ul li > div:nth-child(3) .quantity-box .quantity-box-right {
    height: 9vw;
    line-height: 9vw;
  }
  section ul li > div:nth-child(3) .quantity-box .quantity-box-right i {
    color: #ccc;
    font-size: 6vw;
    margin-right: 2vw;
  
    user-select: none;
    cursor: pointer;
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
    font-size: 3.9vw;
  
    user-select: none;
    cursor: pointer;
  }
  footer ul li:nth-child(1) {
    flex-direction: column;
    font-size: 3.6vw;
    color: #999;
  }
  footer ul li:nth-child(1) p span {
    font-weight: 700;
    font-size: 5vw;
    color: #ff6700;
  }
  footer ul li:nth-child(2) {
    background-color: #f4f4f4;
    color: #333;
  }
  footer ul li:nth-child(3) {
    background-color: #ff6700;
    color: #fff;
  }
  </style>