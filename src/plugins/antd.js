// 按需加载 ant-design-vue
// 手动删除没用用过的组件
import Vue from 'vue';
import 'ant-design-vue/lib/menu/style/css';
import 'ant-design-vue/lib/table/style/css';
import 'ant-design-vue/lib/input/style/css';
import 'ant-design-vue/lib/icon/style/css';
import 'ant-design-vue/lib/button/style/css';
import 'ant-design-vue/lib/spin/style/css';
import 'ant-design-vue/lib/card/style/css';
import 'ant-design-vue/lib/tag/style/css';
import 'ant-design-vue/lib/popover/style/css';
import 'ant-design-vue/lib/empty/style/css';
import 'ant-design-vue/lib/dropdown/style/css';
import {
  Menu,
  Table,
  Input,
  Icon,
  Button,
  Spin,
  Card,
  Tag,
  Popover,
  Empty,
  Dropdown,
} from 'ant-design-vue';

/* v1.1.3+ registration methods */
Vue.use(Menu);
Vue.use(Table);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Spin);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Popover);
Vue.use(Empty);
Vue.use(Dropdown);
