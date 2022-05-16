# 数据源卡片
此组件为数据源卡片组件
## 组件类名（className）
IDataSourceCard
## 组件类ID（classId）
idm.componet.workbench.dataSourceCard
## 组件开发语言（comLangue）
vue
## 组件类型（comType）
common
## 所在代码包版本
workbench@1.1.2
## 组件属性
此章节主要介绍该组件的每个属性的含义以及如何使用说明
### 唯一标识【ctrlId】
只读属性，不可修改，作为每个组件实例的一个唯一标识
- 标识：`ctrlId`
- 默认值：`@[packageid]`
### 基本属性
<font color="#CCCCCC">此章节主要用于存放设置组件所需要的一些基本信息的属性，以达到组件具备使用的基础条件</font>
#### 为空描述【emptyDescription】
无数据时展示的内容
#### 显示当页【showCurrentPage】
是否只展示当前页的数据，选择否则会保留已有的数据，向后追加新数据
#### 显示字段【dataFiled】
可以指定组件通信接受到的message的取值字段
#### 触发行为【trigger】
设置右下角更多操作的触发条件
### 卡片样式设置
<font color="#CCCCCC">用于设置卡片的基础样式外观的组件属性的分组。</font>
#### 内外边距【box】
设置卡片的最外围的外边距和内边距
- 标识：`box`

- 默认值：空
#### 宽高
<font color="#CCCCCC">用于对卡片容器的宽高进行行内分组，此处建议都设置为auto。</font>
##### 宽【width】
卡片的宽度，填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等，不过此处建议设置为<font color="#FF0000">`auto`</font>
- 标识：`width`

- 默认值：`auto`
##### 高【height】
卡片的高度，填写auto则为自适应，或者使用px、%、vh等单位，比如100%、100px、100vh等等，不过此处建议设置为<font color="#FF0000">`auto`</font>
- 标识：`height`

- 默认值：`auto`
#### 边框【border】
设置卡片的最外层的边框和圆角，可点击中间加号统一设置四边或四角，也可单独一边一边设置不同的边框或圆角样式。

- 标识：`border`

- 默认值：空
#### 阴影【shadow】
设置卡片的阴影样式，填写格式如下：`10px 10px 5px #888888`。

- 标识：`boxShadow`

- 默认值：`0px 0px 3px rgba(0,0,0,0.1)`

🍹更深刻的含义请参考 [box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)
#### 浮动阴影【hoverShadow】
设置卡片hover状态的阴影样式，填写格式如下：`10px 10px 5px #888888`。

- 标识：`boxShadow`

- 默认值：`0px 0px 3px rgba(0,0,0,0.1)`

🍹更深刻的含义请参考 [box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)
#### 背景色【bgColor】
设置卡片的整体背景颜色
- 标识：`bgColor`

- 默认值：空
#### 标题文字【font】
设置标题文字的字体样式，可设置文字的字体、字重、样式、字体颜色、大小、行高、对齐、修饰等。

- 标识：`font`

- 默认值：空
### 高级
<font color="#CCCCCC">用于对组件高级设置的属性的分组。</font>
#### 右下角更多操作【子表】【operationList】
依次设置操作选项
##### 操作标识【key】
唯一标识
##### 操作名称【text】
操作名称
##### 显示图标【icon】
名称前的图标
##### 事件类型【operationClickType】
可选择自定义或内置的删除事件
##### 提示内容【removeConfirmFont】
删除时的提示信息
##### 接口地址【removeUrl】
删除的接口
##### 删除后自定义函数【removeRunLaterFunction】
删除接口调用后的回调
##### 自定义函数【operationClickFunction】
选择自定义时，设置此项