<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div
    idm-ctrl="idm_module"
    :id="moduleObject.id"
    :idm-ctrl-id="moduleObject.id"
    class="idm_dataSourceMenu_box"
  >
    <a-menu
      v-model="selectedKeys"
      :style="{
        width: propData.menuWidth
          ? propData.menuWidth.inputVal + propData.menuWidth.selectVal
          : 'auto',
      }"
      mode="inline"
      :theme="propData.menuTheme || 'light'"
      @select="selectCallback"
    >
      <a-menu-item
        v-for="item in menuList"
        :key="item.key"
        :style="{
          height: propData.menuLineHeight
            ? propData.menuLineHeight.inputVal +
              propData.menuLineHeight.selectVal
            : '40px',
          lineHeight: propData.menuLineHeight
            ? propData.menuLineHeight.inputVal +
              propData.menuLineHeight.selectVal
            : '40px',
        }"
      >
        <div class="menu_item_container">
          <span
            v-if="item.menuImgUrl"
            class="menu_item_img"
            :style="{
              width: propData.imgSize
                ? propData.imgSize.inputVal + propData.imgSize.selectVal
                : '28px',
              height: propData.imgSize
                ? propData.imgSize.inputVal + propData.imgSize.selectVal
                : '28px',
            }"
          >
            <img :src="IDM && IDM.url.getWebPath(item.menuImgUrl)" />
          </span>
          <span class="menu_item_name">{{ item.name }}</span>
        </div>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "DataSourceMenu",
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      selectedKeys: [],
      menuList: [],
    };
  },
  props: {},
  computed: {},
  created() {
    this.moduleObject = this.$root.moduleObject;
    // console.log(this.moduleObject)
    this.initAttrToModule();
  },
  mounted() {},
  destroyed() {},
  methods: {
    /**
     * 切换面板的回调
     */
    selectCallback({ key }) {
      const selectedItem = this.menuList.find((item) => item.key == key);
      if (
        this.propData.customSelectFunction &&
        this.propData.customSelectFunction.length > 0
      ) {
        window[this.propData.customSelectFunction[0].name]?.call(this, {
          customParam: this.propData.customSelectFunction[0].param,
          selectedItem,
        });
      }
    },
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.innerAttr = propData.innerAttr || [];
      this.initAttrToModule();
      console.log("组件内属性发生变化，变化后====》", this.propData);
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject() {
      var styleObject = {};
      if (this.propData.bgSize && this.propData.bgSize == "custom") {
        styleObject["background-size"] =
          (this.propData.bgSizeWidth
            ? this.propData.bgSizeWidth.inputVal +
              this.propData.bgSizeWidth.selectVal
            : "auto") +
          " " +
          (this.propData.bgSizeHeight
            ? this.propData.bgSizeHeight.inputVal +
              this.propData.bgSizeHeight.selectVal
            : "auto");
      } else if (this.propData.bgSize) {
        styleObject["background-size"] = this.propData.bgSize;
      }
      if (this.propData.positionX && this.propData.positionX.inputVal) {
        styleObject["background-position-x"] =
          this.propData.positionX.inputVal + this.propData.positionX.selectVal;
      }
      if (this.propData.positionY && this.propData.positionY.inputVal) {
        styleObject["background-position-y"] =
          this.propData.positionY.inputVal + this.propData.positionY.selectVal;
      }
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if (!element && element !== false && element != 0) {
            continue;
          }
          switch (key) {
            case "width":
            case "height":
              styleObject[key] = element;
              break;
            case "bgColor":
              if (element && element.hex8) {
                styleObject["background-color"] = element.hex8;
              }
              break;
            case "box":
              if (element.marginTopVal) {
                styleObject["margin-top"] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                styleObject["margin-right"] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                styleObject["margin-bottom"] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                styleObject["margin-left"] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                styleObject["padding-top"] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                styleObject["padding-right"] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                styleObject["padding-bottom"] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                styleObject["padding-left"] = `${element.paddingLeftVal}`;
              }
              break;
            case "bgImgUrl":
              styleObject["background-image"] = `url(${IDM.url.getWebPath(
                element
              )})`;
              break;
            case "positionX":
              //背景横向偏移

              break;
            case "positionY":
              //背景纵向偏移

              break;
            case "bgRepeat":
              //平铺模式
              styleObject["background-repeat"] = element;
              break;
            case "bgAttachment":
              //背景模式
              styleObject["background-attachment"] = element;
              break;
            case "border":
              if (element.border.top.width > 0) {
                styleObject["border-top-width"] =
                  element.border.top.width + element.border.top.widthUnit;
                styleObject["border-top-style"] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  styleObject["border-top-color"] =
                    element.border.top.colors.hex8;
                }
              }
              if (element.border.right.width > 0) {
                styleObject["border-right-width"] =
                  element.border.right.width + element.border.right.widthUnit;
                styleObject["border-right-style"] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  styleObject["border-right-color"] =
                    element.border.right.colors.hex8;
                }
              }
              if (element.border.bottom.width > 0) {
                styleObject["border-bottom-width"] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                styleObject["border-bottom-style"] =
                  element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  styleObject["border-bottom-color"] =
                    element.border.bottom.colors.hex8;
                }
              }
              if (element.border.left.width > 0) {
                styleObject["border-left-width"] =
                  element.border.left.width + element.border.left.widthUnit;
                styleObject["border-left-style"] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  styleObject["border-left-color"] =
                    element.border.left.colors.hex8;
                }
              }

              styleObject["border-top-left-radius"] =
                element.radius.leftTop.radius +
                element.radius.leftTop.radiusUnit;
              styleObject["border-top-right-radius"] =
                element.radius.rightTop.radius +
                element.radius.rightTop.radiusUnit;
              styleObject["border-bottom-left-radius"] =
                element.radius.leftBottom.radius +
                element.radius.leftBottom.radiusUnit;
              styleObject["border-bottom-right-radius"] =
                element.radius.rightBottom.radius +
                element.radius.rightBottom.radiusUnit;
              break;
            case "font":
              styleObject["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleObject["color"] = element.fontColors.hex8;
              }
              styleObject["font-weight"] =
                element.fontWeight && element.fontWeight.split(" ")[0];
              styleObject["font-style"] = element.fontStyle;
              styleObject["font-size"] =
                element.fontSize + element.fontSizeUnit;
              styleObject["line-height"] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == "-"
                  ? ""
                  : element.fontLineHeightUnit);
              styleObject["text-align"] = element.fontTextAlign;
              styleObject["text-decoration"] = element.fontDecoration;
              break;
          }
        }
      }
      IDM.setStyleToPageHead(this.moduleObject.id + "", styleObject);
    },
    /**
     * 加载基本属性
     */
    initBaseAttrToModule() {
      if (this.propData.MenuPaneList && this.propData.MenuPaneList.length > 0) {
        this.selectedKeys = [this.propData.MenuPaneList[0].key];
        this.propData.MenuPaneList.forEach((item) => {
          if (item.defaultSelectKey) {
            this.selectedKeys[0] = item.key;
          }
        });
        this.menuList = this.propData.MenuPaneList;
      } else {
        let templist = [
          {
            key: "1",
            name: "菜单demo1",
            defaultSelectKey: false,
          },
          {
            key: "2",
            name: "菜单demo2",
            defaultSelectKey: false,
          },
        ];
        this.selectedKeys = [templist[0].key];
        this.menuList = templist;
      }
    },
    /**
     * 加载属性到组件中
     */
    initAttrToModule() {
      this.convertAttrToStyleObject();
      this.initBaseAttrToModule();
    },
  },
};
</script>
<style lang="scss">
.idm_dataSourceMenu_box {
  display: flex;
  .menu_item_container {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    .menu_item_img {
      /* width: 30px;
      height: 30px; */
      display: inline-block;
      margin-right: 16px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .menu_item_name {
      display: inline-block;
    }
  }
}
</style>
