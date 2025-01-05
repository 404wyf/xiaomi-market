<template>
  <div class="container">
    <header>
      <div>
        <i class="fa fa-search"></i>
        <p>搜索商品名称</p>
      </div>
    </header>

    <section>
      <ul class="nav">
        <li v-for="(gt,index) in goodsTypeArr" 
            :key="gt.goodsTypeId"
            @click="selectType(index)"
            :class="gt.goodsTypeId==goodsType.goodsTypeId?'nav-item-select':'nav-item'">
            {{gt.goodsTypeName}}
        </li>
      </ul>
      <aside>
        <ul class="goods-list">
          <li>
            <img :src="goodsType.goodsTypeImg" />
            <h3>{{goodsType.goodsTypeName}}</h3>
            <ul>
              <li v-for="goods in goodsArr"
                  :key="goods.goodsId"
                  @click="toGoods(goods.goodsId)">
                <img :src="goods.goodsImg" />
                <div>
                  <h4>{{goods.goodsName}}</h4>
                  <p>￥{{goods.goodsPrice}}起</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </section>

    <Footer></Footer>
  </div>
</template>

<script setup>
import Footer from "@/components/Footer.vue";
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios');
const router = useRouter();

const goodsTypeArr = ref([]);
const goodsArr = ref([]);
const goodsType = ref({});

//根据商品分类查询所属商品
const selectGoodsByGoodsTypeId = (goodsTypeId)=>{
    axios.get('selectGoodsByGoodsTypeId',{
      params: { // 将 goodsTypeId 作为查询参数
            goodsTypeId: goodsTypeId
        }
       
    })
      .then(response=>{
        goodsArr.value = response.data.data;
       // console.log(goodsArr.value);
      })
      .catch(error=>{
        console.log(error);
      });

      // console.log(goodsTypeId);
}

//初始化
const init = ()=>{
    axios.get('selectGoodsTypeAll')
      .then(response=>{
        goodsTypeArr.value = response.data.data;
        goodsType.value = goodsTypeArr.value[0];
        selectGoodsByGoodsTypeId(goodsType.value.goodsTypeId);
      })
      .catch(error=>{
        console.log(error);
      });
}
init();

const selectType = (index)=>{
  goodsType.value = goodsTypeArr.value[index];
  selectGoodsByGoodsTypeId(goodsType.value.goodsTypeId);
}

const toGoods = (goodsId)=>{
  router.push({path:'/goods',query:{goodsId:goodsId}});
}

</script>

<style scoped>
/************************* 商品分类导航特效样式 **************************/
.nav-item-select{
    font-weight: 700;
    color: #333;
    border-left: solid 3px #FF6700;
}

.nav-item{
    font-weight: 300;
    color: #666;
    border-left: none;
}

/************************* 总容器 **************************/
.container {
  width: 100%;
  height: 100%;
}

/************************* header **************************/
header {
  width: 100%;
  height: 14vw;
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 100;
}
header div {
  width: 90vw;
  height: 8vw;
  border-radius: 4vw;
  font-size: 4vw;
  color: #b6b6b6;
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  user-select: none;
}
header div i {
  font-size: 3.8vw;
  margin: 0 2.4vw;
}

/************************* section **************************/
section {
  width: 100%;
}
section .nav {
  width: 21vw;
  position: fixed;
  left: 0;
  top: 14vw;
  z-index: 100;
  margin-top: 4.5vw;
}
section .nav li {
  width: 100%;
  height: 4vw;
  margin-bottom: 9vw;
  text-align: center;
  line-height: 4vw;
  font-size: 3.3vw;
  color: #666;
  user-select: none;
}
/*
section .nav li:first-child{
    font-weight: 700;
    color: #333;
    border-left: solid 3px #FF6700;
}
*/

section aside {
  width: 70vw;
  margin-left: 21vw;
  overflow: hidden;
}
section aside .goods-list {
  width: 70vw;
  margin: 0 auto;
  margin-top: 14vw;
}
section aside .goods-list > li {
  margin-bottom: 16vw;
}
section aside .goods-list > li img {
  width: 70vw;
  height: 20vw;
  border-radius: 5px;
}
section aside .goods-list > li h3 {
  font-size: 4vw;
  color: #333;
  margin-top: 5vw;
}
section aside .goods-list > li ul {
  width: 70vw;
}
section aside .goods-list > li ul li {
  width: 100%;
  height: 22vw;
  margin: 2vw 0;
  background-color: #f8f8f8;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
section aside .goods-list > li ul li img {
  width: 18vw;
  height: 18vw;
}
section aside .goods-list > li ul li div {
  margin-left: 2vw;
  font-size: 4vw;
  color: #333;
}
section aside .goods-list > li ul li div h4 {
  font-weight: 300;
  margin-bottom: 2vw;
}
</style>