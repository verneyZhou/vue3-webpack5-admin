
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);


import router from '@/router';
import store from '@/store';
app.use(router).use(store)

// 全局样式
import '@/styles/index.scss';


// 全局引入 elment-plus 和 icon
const registerElementPlus = require('@/plugins/element-plus').default;
registerElementPlus(app);

// 引入svg-icon组件
import loadSvg from '@/assets';
loadSvg(app);

// 路由权限校验
import './permission'

// 全局引入指令
import directive from '@/directives'
directive(app)

console.log('=====process.env', process.env)


// mock接口模拟
if (process.env.RUN_ENV === 'mock') {
    require('./mock');
}
// require('./mock');




app.mount('#app');
