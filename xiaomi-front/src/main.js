import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//导入font-awesome的CSS
import 'font-awesome/css/font-awesome.min.css'

router.beforeEach(function (to, from, next) {
    let customer = sessionStorage.getItem('customer');
    if (!(to.path == '/' || to.path == '/index' || to.path == '/goodsType' || to.path == '/goods' || to.path == '/login' || to.path == '/register')) {
        if (customer == null) {
            router.push('/login');
        }
    }
    next();
});

createApp(App).use(router).mount('#app')