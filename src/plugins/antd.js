// 按需加载 ant-design-vue
// 手动删除没用用过的组件
import Vue from 'vue';
import 'ant-design-vue/lib/menu/style/css';
import {
  Menu
} from 'ant-design-vue';

/* v1.1.3+ registration methods */
Vue.use(Menu);