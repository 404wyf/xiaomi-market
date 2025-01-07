<template>
  <div class="container">

    <div class="content">

      <!-- 页面的其他内容 -->
      <img src="../assets/dingzheng.jpg">

      <div >
        <span class="table-my">姓名： {{ customer.customerName }}</span>
        <el-divider border-style="solid" />
        <span class="table-my">电话： {{ customer.telId }}</span>
        <el-divider border-style="solid" />
        <span class="table-my">收货地址： {{ address.address }}</span>
        <el-divider border-style="solid" />
        <span class="table-my">个性签名： 雪豹闭嘴</span>
        <el-divider border-style="solid" />
      </div>


    </div>
    <button class="btn" @click="logOut()">退出</button>
    <myfooter></myfooter>
  </div>
</template>

<script setup>

// 使用js语言写页面数据对象、事件、逻辑
import myfooter from '../components/Footer.vue'
import { removeSessionStorage } from '@/utils/common'
import { useRouter } from "vue-router";
import { getSessionStorage } from "../utils/common.js";
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


const logOut = () => {
  //删除sessionStorage有用户登录信息的，
  removeSessionStorage("customer");
  //跳转到登录界面
  router.push("/login")
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 95vh;


  .content {
    flex-grow: 1;
    font-size: 80px;
   
  }
}



.btn {
  width: 100%;
  height: 60px;
  border-radius: 6px;
  background-color: #62BFFF;
  font-size: 1.2em;
  color: #FFF;
  line-height: 60px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  margin-bottom: 50px;
  font-size: 50px;

}
</style>
