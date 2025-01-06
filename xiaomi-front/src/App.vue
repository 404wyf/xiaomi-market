<template>
  <router-view/>
</template>

<script setup>
import axios from 'axios';
import { provide } from 'vue';




//设置axios的共通url
axios.defaults.baseURL = 'http://127.0.0.1:7001/';
provide('axios',axios);
</script>

<style>
/************************ css 重置 ************************/
html,body,div,span,h1,h2,h3,h4,h5,h6,ul,li,p{
	margin: 0;
	padding: 0;
}
html,body,#app{
	width: 100%;
	height: 100%;
	font-family: Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
}
ul{
	list-style: none;
}
a{
	text-decoration: none;
}
</style>