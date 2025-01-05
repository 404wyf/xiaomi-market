<template>
    <div class="container">
      <header>
        <div class="search">
          <div class="logo">
            <img src="../assets/logo.png" />
          </div>
          <div class="box">
            <i class="fa fa-search"></i>
            <p>搜索商品名称</p>
          </div>
          <div class="user">
            <i class="fa fa-user-o"></i>
          </div>
        </div>
        <ul>
          <li>推荐</li>
          <li>手机</li>
          <li>智能</li>
          <li>电视</li>
          <li>家电</li>
          <li>笔记本</li>
          <li><i class="fa fa-angle-down"></i></li>
        </ul>
      </header>
  
      <div class="headerBox"></div>
      <section>
        <!-- 轮播 -->
        <div class="carousel">
          <ul ref="carousel">
            <li>
              <img src="../assets/carousel01.jpg" />
            </li>
            <li>
              <img src="../assets/carousel02.jpg" />
            </li>
            <li>
              <img src="../assets/carousel03.jpg" />
            </li>
            <li>
              <img src="../assets/carousel01.jpg" />
            </li>
          </ul>
        </div>
        <!-- 分类 -->
        <ul class="type">
          <li>
            <img src="../assets/type01.png" />
            <p>小米秒杀</p>
          </li>
          <li>
            <img src="../assets/type02.png" />
            <p>小米众筹</p>
          </li>
          <li>
            <img src="../assets/type03.png" />
            <p>Note 9 系列</p>
          </li>
          <li>
            <img src="../assets/type04.png" />
            <p>以旧换新</p>
          </li>
          <li>
            <img src="../assets/type05.png" />
            <p>小米上新</p>
          </li>
          <li>
            <img src="../assets/type06.png" />
            <p>智能</p>
          </li>
          <li>
            <img src="../assets/type07.png" />
            <p>笔记本热卖</p>
          </li>
          <li>
            <img src="../assets/type08.png" />
            <p>电视热卖</p>
          </li>
          <li>
            <img src="../assets/type09.png" />
            <p>洗衣机热卖</p>
          </li>
          <li>
            <img src="../assets/type10.png" />
            <p>米粉卡</p>
          </li>
        </ul>
        <!-- 推荐商品 -->
        <div class="recommend">
          <div class="left">
            <img src="../assets/exhibits01.png" />
          </div>
          <div class="right">
            <img src="../assets/exhibits02.png" />
            <img src="../assets/exhibits03.png" />
          </div>
        </div>
        <!-- 热销商品 -->
        <div class="hot">
          <img src="../assets/rxbk.png" />
          <p><span>￥</span><span>2299</span><span>起</span></p>
        </div>
        <!-- 商品列表 -->
        <ul class="goods">
          <li>
            <img src="../assets/product01.jpg" />
            <h3>小米11 Pro</h3>
            <p>1/1.12''GN2｜骁龙888</p>
            <span>￥4999起</span>
            <div>立即购买</div>
          </li>
          <li>
            <img src="../assets/product02.jpg" />
            <h3>MIX FOLD 小米折叠屏手机</h3>
            <p>折叠大屏｜自研芯片</p>
            <span>￥9999起</span>
            <div>立即购买</div>
          </li>
          <li>
            <img src="../assets/product03.jpg" />
            <h3>Note 9 5G</h3>
            <p>天玑 800U处理器，5000mAh电池</p>
            <span>￥1299起</span>
            <div>立即购买</div>
          </li>
          <li>
            <img src="../assets/product04.jpg" />
            <h3>小米10S</h3>
            <p>骁龙870 | 对称式双扬立体声</p>
            <span>￥2999起</span>
            <div>立即购买</div>
          </li>
          <li>
            <img src="../assets/product05.jpg" />
            <h3>Note 9 Pro 5G</h3>
            <p>一亿像素夜景相机，120Hz六档变速高刷屏</p>
            <span>￥1599起</span>
            <div>立即购买</div>
          </li>
          <li>
            <img src="../assets/product06.jpg" />
            <h3>小米11</h3>
            <p>骁龙888 | 2K四曲面屏</p>
            <span>￥3799起</span>
            <div>立即购买</div>
          </li>
        </ul>
      </section>
      <div class="footerBox"></div>
  
      <Footer></Footer>
    </div>
  </template>
  
  <script setup>
  import Footer from "@/components/Footer.vue";
  import { ref, onMounted } from "vue";
  
  const carousel = ref(null);
  
  onMounted(() => {
    //获取滚动条
    let box = carousel.value;
  
    //获取当前手机屏幕的宽度
    let width = window.screen.width;
  
    let index = 0;
  
    box.style.left = "0";
  
    setInterval(function () {
      index++;
      if (index >= 4) {
        index = 1;
        box.style.left = "0";
      }
      //动画（每帧移动距离30px，频率为30毫秒一帧）
      let myTimer = setInterval(function () {
        //设置每帧移动30px
        box.style.left = box.offsetLeft - 30 + "px";
        //移动一个图片长度后动画停止
        if (box.offsetLeft <= -width * index) {
          clearInterval(myTimer);
          box.style.left = -width * index + "px";
        }
      }, 30);
    }, 8000);
  });
  </script>
  
  <style scoped>
  /*vw：表示当前屏幕宽度的百分比*/
  /************************* 总容器 **************************/
  .container {
    width: 100%;
    height: 100%;
  }
  
  /************************* 头部 **************************/
  header {
    width: 100%;
    height: 20.1vw;
    background-color: #fff;
  
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  
    box-shadow: 0 2px 4px -1px #ccc;
  }
  header .search {
    width: 100%;
    height: 11.7vw;
    background-color: #f2f2f2;
  
    display: flex;
    align-items: center;
  }
  header .search .logo {
    flex: 0 0 14vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header .search .logo img {
    width: 6.7vw;
    height: 6.7vw;
  }
  header .search .box {
    flex: 1;
    height: 8.9vw;
    background-color: #fff;
    display: flex;
    align-items: center;
  
    font-size: 4vw; /*文字也可以设置vw尺寸*/
    color: #b6b6b6;
  
    box-sizing: border-box;
    border: solid 1px #e4e4e4;
    border-radius: 0.6vw;
  }
  header .search .box i {
    font-size: 3.8vw;
    margin: 0 2.4vw;
  }
  header .search .user {
    flex: 0 0 14vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header .search .user i {
    font-size: 5.4vw;
    color: #767676;
  }
  
  header ul {
    width: 100%;
    height: 8.4vw;
    background-color: #f2f2f2;
    display: flex;
  }
  header ul li {
    height: 8.4vw;
    line-height: 8.4vw;
  
    box-sizing: border-box;
    font-size: 3.6vw;
    color: #767676;
    margin: 0 3.5vw;
  
    user-select: none;
  }
  header ul li:first-child {
    border-bottom: solid 2px #ff6700;
    color: #ff6700;
  }
  header ul li .fa-angle-down {
    font-size: 5.6vw;
  }
  
  /************************* 中间内容部分 **************************/
  section {
    width: 100%;
  }
  
  section .carousel {
    width: 100%;
    height: 50vw;
    position: relative;
    overflow: hidden;
  }
  section .carousel ul {
    height: 50vw;
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
  }
  section .carousel ul li,
  section .carousel ul li img {
    width: 100vw;
    height: 50vw;
  }
  
  section .type {
    width: 100%;
    height: 42vw;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
  }
  section .type li {
    width: 20vw;
    height: 21vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
  }
  section .type li img {
    width: 10vw;
    height: 10vw;
    margin-bottom: 0.9vw;
  }
  section .type li p {
    font-size: 3vw;
    color: #ccc;
  }
  
  section .recommend {
    width: 100%;
    height: 70vw;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin-top: 2.2vw;
  }
  section .recommend .left,
  section .recommend .left img {
    width: 49.6vw;
    height: 70vw;
  }
  section .recommend .right {
    width: 49.6vw;
    height: 70vw;
  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  section .recommend .right img {
    width: 49.6vw;
    height: 34.7vw;
  }
  
  section .hot {
    width: 100%;
    height: 62vw;
    position: relative;
  }
  section .hot img {
    width: 100%;
    height: 62vw;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  section .hot p {
    font-size: 6vw;
    color: #78a0d3;
    position: absolute;
    left: 4vw;
    top: 35vw;
  }
  section .hot p span:first-child {
    font-size: 4vw;
    vertical-align: top;
  }
  section .hot p span:last-child {
    font-size: 3vw;
    vertical-align: bottom;
  }
  
  section .goods {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  section .goods li {
    width: 50vw;
    height: 68vw;
    margin-bottom: 1vw;
  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  section .goods li img {
    width: 50vw;
    height: 38.9vw;
  }
  section .goods li h3 {
    width: 40vw;
    text-align: center;
    font-size: 4vw;
    font-weight: 300;
    color: #333;
    margin-top: 2vw;
  
    /*文本溢出时显示省略号*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  section .goods li p {
    width: 40vw;
    text-align: center;
    font-size: 3.6vw;
    color: #999;
    margin-top: 0.6vw;
  
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  section .goods li span {
    font-size: 3.6vw;
    color: #ea625b;
    margin-top: 0.6vw;
  }
  section .goods li div {
    width: 27.8vw;
    height: 8vw;
    background-color: #ea625b;
    border-radius: 2px;
    margin-top: 0.6vw;
    text-align: center;
    line-height: 8vw;
    font-size: 3.6vw;
    color: #fff;
  
    user-select: none;
  }
  
  /************************* 挡板 **************************/
  .headerBox {
    width: 100%;
    height: 20.1vw;
  }
  .footerBox {
    width: 100%;
    height: 14.4vw;
  }
  </style>