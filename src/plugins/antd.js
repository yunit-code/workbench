// 按需加载 ant-design-vue
// 手动删除没用用过的组件
import Vue from 'vue';
import 'ant-design-vue/lib/menu/style/css';
import 'ant-design-vue/lib/table/style/css';
import 'ant-design-vue/lib/input/style/css';
import 'ant-design-vue/lib/icon/style/css';
import 'ant-design-vue/lib/button/style/css';
import 'ant-design-vue/lib/spin/style/css';
import 'ant-design-vue/lib/dropdown/style/css';
import {
  Menu,
  Table,
  Input,
  Icon,
  Button,
  Spin,
  Dropdown,
} from 'ant-design-vue';
import JsonViewer from 'vue-json-viewer';

/* v1.1.3+ registration methods */
Vue.use(Menu);
Vue.use(Table);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Spin);
Vue.use(JsonViewer);
Vue.use(Dropdown);
