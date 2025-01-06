import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
 

router.beforeEach(function (to, from, next) {
    let customer = sessionStorage.getItem('customer');
    if (!(to.path == '/' || to.path == '/index' || to.path == '/goodsType' || to.path == '/goods' || to.path == '/login' || to.path == '/register')) {
        if (customer == null) {
            router.push('/login');
        }
    }
    next();
});


const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');