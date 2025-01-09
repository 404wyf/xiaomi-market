<template>
    <div class="container">
  
          <header>
              <img src="../assets/logo.png">
              <p>让每个人都能享受科技的乐趣</p>
          </header>
  
          <section>
              <h1>小米账号登录</h1>
              <div class="box">
                  <input type="text" v-model="customer.telId" placeholder="请输入手机号">
              </div>
              <div class="box">
                  <input type="password" v-model="customer.password" placeholder="请输入密码">
              </div>
              <div class="box">
                  <input type="customerName" v-model="customer.customerName" placeholder="请输入姓名">
              </div>
              <div class="box">
                  <input type="address" v-model="customer.address" placeholder="请输入地址">
              </div>
              
              <div class="btn register" @click="registerCustomer">注 册</div>
              <div class="btn " @click="toLogin">去登录</div>
  
              <div style="width: 100%; height: 14.4vw;"></div>
          </section>
  
          <Footer></Footer>
  
      </div>
  </template>
  
  <script setup>
  import Footer from "@/components/Footer.vue";
  import { useRouter } from 'vue-router';
  import { ref, inject } from 'vue';
 
  
  const axios = inject('axios');
  const router = useRouter();
  
  const customer = ref({
      telId: '',
      password: '',
      address:'',
      customerName:''
  });
  
  const registerCustomer = ()=>{
      if(customer.value.telId==''){
          alert('手机号码不能为空！');
          return;
      }
      if(customer.value.password==''){
          alert('密码不能为空！');
          return;
      }

      if(customer.value.customerName==''){
          alert('姓名不能为空！');
          return;
      }

      if(customer.value.address==''){
          alert('地址不能为空！');
          return;
      }
  
      axios.post('register',{
          telId: customer.value.telId,
          password: customer.value.password,
          customerName:customer.value.customerName,
          address:customer.value.address,
          remarks:null,
          defaultState:1
      })
        .then(response=>{
          if(response.data.data==0){
              alert('手机号码或密码输入错误！');
          }else{
            toLogin();
          }
        })
        .catch(error=>{
          console.log(error);
        });
  }


  let toLogin = () => {
	router.push("/login");
  };
  
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
      height: 60vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  header img{
      width: 15vw;
      height: 15vw;
  }
  header p{
      font-size: 4vw;
      color: #999;
      margin-top: 4vw;
  }
  
  /*********************** 中间内容部分 *********************/
  section{
      width: 100%;
      box-sizing: border-box;
      padding: 0 10vw;
  }
  section h1{
      font-size: 6vw;
      margin-bottom: 5vw;
  }
  section div{
      margin-bottom: 5vw;
  }
  section .box{
      width: 100%;
      height: 12vw;
      background-color: #F0F0F0;
      border-radius: 4vw;
  
      display: flex;
      align-items: center;
  }
  section .box input{
      width: 100%;
      box-sizing: border-box;
      padding-left: 4vw;
      font-size: 3vw;
      border:none;
      outline: none;
      background-color: #F0F0F0;
  }
  section .btn{
      width: 100%;
      height: 12vw;
      border-radius: 6vw;
      background-color: #62BFFF;
      font-size: 4.6vw;
      color: #FFF;
  
      line-height: 12vw;
      text-align: center;
      user-select: none;
      cursor: pointer;
  }
  section .register{
      background-color: #89E45C;
  }



  section .box input::placeholder {
    font-size: 3vw; /* 使用视口宽度单位来设置字体大小 */
    color: #999; /* 可以设置占位符的颜色 */
}

/* 为了确保字体大小在不同设备上看起来一致，可以添加媒体查询来调整字体大小 */
@media screen and (min-width: 768px) {
    section .box input::placeholder {
        font-size: 3vw; /* 在较宽的屏幕上使用较小的字体大小 */
    }
}

section .box input {
    /* 增加行高，确保文字有足够的垂直空间 */
    line-height: 2; /* 或者使用具体的单位，如 1.5em、20px 等 */
    
    /* 增加上内边距，确保文字的上半部分不会被遮挡 */
    padding-top: 10px; /* 或者使用百分比、em 等单位 */
    
    /* 增加元素高度，确保文字不会超出元素边界 */
    height: 50px; /* 或者使用百分比、em 等单位 */
}
  </style>