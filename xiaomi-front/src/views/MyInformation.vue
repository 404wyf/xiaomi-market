<template>
  <div class="MyInformation">
    <div class="content">
      <img src="../assets/logo.png" class="touxiang" />
      <div class="info-item">
        <span class="label">姓名：</span>
        <span class="value">{{ customer.customerName }}</span>
      </div>
      <div class="info-item">
        <span class="label">电话：</span>
        <span class="value">{{ customer.telId }}</span>
      </div>
      <div class="info-item">
        <span class="label">收货地址：</span>
        <span class="value">{{ address.address }}</span>
      </div>
      <div class="info-item">
        <span class="label">个性签名：</span>
        <span class="value">雪豹闭嘴</span>
      </div>
    </div>

    <div class="button-container">
      <button class="btn" @click="Logout">退出</button>
    </div>
    <myfooter></myfooter>
  </div>
</template>

<script setup>

// 使用js语言写页面数据对象、事件、逻辑
import myfooter from '../components/Footer.vue';
import { useRouter } from "vue-router";
import { getSessionStorage, removeSessionStorage } from "../utils/common.js";
import { ref, inject } from "vue";


const axios = inject("axios");
const router = useRouter()
const customer = getSessionStorage("customer");
const address = ref({});

const init = () => {
  axios
    .post("selectAddressByTelIdByDefault", {
      telId: customer.telId,
    })
    .then((response) => {
      address.value = response.data.data[0];
      //console.log(address.value);
    })
    .catch((error) => {
      console.log(error);
    });

};
init();


const Logout = () => {
  //删除sessionStorage有用户登录信息的，
  removeSessionStorage("customer");
  //跳转到登录界面
  router.push("/login")
}


</script>

<style scoped>
.myInformation {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.content {
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.touxiang {
  width: 20vw;
  height: 20vw;
  border-radius: 50%; /* 使头像呈圆形 */
  margin-bottom: 20px; /* 与信息项之间的间距 */
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  color: #333333;
}

.value {
  flex-grow: 1;
  text-align: right;
  color: #666666;
}

.button-container {
  margin-top: 20px;
  width: 100%;
}

.btn {
  width: 100%;
  height: 48px;
  background-color: #62bfff;
  color: #ffffff;
  font-size: 18px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>