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
    class="idm_dataSourceCard_box"
  >
    <a-card v-for="item in cardList" :key="item.id" :bordered="false">
      <template slot="title">
        <div class="title">
          <!-- <a-tooltip placement="topLeft" :title="item.name">
            <div style="overflow: hidden; text-overflow: ellipsis">
              {{ item.name }}
            </div>
          </a-tooltip> -->
          <div style="white-space: normal">{{ item.name }}</div>
          <a-tag
            style="margin: 0 0 0 4px"
            :color="getTagColor(item.dataMode)"
            >{{ item.dataModeText }}</a-tag
          >
        </div>
      </template>
      <div class="content">
        <a-icon type="user" />
        <div class="code">{{ item.createUserName }}</div>
        <a-popover
          v-if="
            propData.operationList &&
            propData.operationList.length > 0 &&
            Object.keys(propData.operationList[0]).length > 0
          "
          :trigger="propData.trigger || 'hover'"
          placement="bottom"
          overlayClassName="idm_dataSourceCard_popover"
        >
          <div style="cursor: pointer"><a-icon type="more" /></div>
          <template slot="content">
            <div class="container">
              <div
                class="element"
                v-for="operation in propData.operationList"
                :key="operation.key"
                @click="handleOperationClick(item, operation)"
              >
                <svg
                  class="icon"
                  v-if="operation.icon && operation.icon.length > 0"
                  aria-hidden="true"
                >
                  <use :xlink:href="`#${operation.icon[0]}`"></use>
                </svg>
                {{ operation.text }}
              </div>
            </div>
          </template>
        </a-popover>
      </div>
    </a-card>
    <div
      v-if="!cardList || (cardList && cardList.length == 0)"
      style="text-align: center; width: 100%"
    >
      <a-empty
        :image-style="{ margin: '10px auto' }"
        :description="propData.emptyDescription || '暂无数据'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "IDataSourceCard",
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      cardList: [],
    };
  },
  props: {},
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    if (
      this.moduleObject.env == "develop" ||
      this.moduleObject.env == undefined
    ) {
      //开发模式下给例子数据
      this.cardList = [
        {
          id: "1",
          name: "展示用例1",
          createUserName: "系统管理员",
          dataModeText: "主动请求",
          dataMode: "2",
        },
        {
          id: "2",
          name: "展示用例2",
          createUserName: "系统管理员",
          dataModeText: "接收推送",
          dataMode: "1",
        },
      ];
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    getTagColor(code) {
      const colorSet = {
        1: "orange",
        2: "blue",
      };
      return colorSet[code];
    },
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      console.log("组件内属性发生变化，变化后====》", this.propData);
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject() {
      var styleObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if (!element && element !== false && element != 0) {
            continue;
          }
          switch (key) {
            case "width":
              styleObject[key] = element;
              break;
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
            case "shadow":
              styleObject["box-shadow"] = element;
              break;
            case "hoverShadow":
              window.IDM.setStyleToPageHead(
                this.moduleObject.id + " .ant-card:hover",
                {
                  "box-shadow": element,
                }
              );
              break;
            case "font":
              var styleObject1 = {};
              styleObject1["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleObject1["color"] = element.fontColors.hex8;
              }
              styleObject1["font-weight"] =
                element.fontWeight && element.fontWeight.split(" ")[0];
              styleObject1["font-style"] = element.fontStyle;
              styleObject1["font-size"] =
                element.fontSize + element.fontSizeUnit;
              styleObject1["line-height"] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == "-"
                  ? ""
                  : element.fontLineHeightUnit);
              styleObject1["text-align"] = element.fontTextAlign;
              styleObject1["text-decoration"] = element.fontDecoration;
              window.IDM.setStyleToPageHead(
                this.moduleObject.id + " .ant-card .ant-card-head .title",
                styleObject1
              );
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + " .ant-card",
        styleObject
      );
    },
    handleOperationClick(itemData, operation) {
      if (operation.operationClickType === "remove") {
        this.handleRemove(itemData, operation);
      } else if (
        operation.operationClickType === "custom" &&
        operation.operationClickFunction &&
        operation.operationClickFunction.length > 0
      ) {
        operation.operationClickFunction.forEach((item) => {
          window[item.name] &&
            window[item.name].call(this, {
              customParam: item.param,
              itemData,
            });
        });
      }
    },
    getCardList(data) {
      let filedExp = this.propData.dataFiled;
      let list = data;
      if (filedExp) {
        list = window.IDM.express.replace.call(
          this,
          "@[" + filedExp + "]",
          data
        );
      }
      if (this.propData.showCurrentPage) {
        this.cardList = list;
      } else {
        this.cardList = [...this.cardList, ...list];
      }
    },
    handleRemove(data, operation) {
      let that = this;
      if (!operation.removeConfirmFont) {
        that.removeItemLater(data, operation);
        return;
      }
      this.$confirm({
        title: operation.removeConfirmFont,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          that.removeItemLater(data, operation);
        },
        onCancel() {},
      });
    },
    removeItemLater(data, operation) {
      let that = this;
      operation.removeUrl &&
        IDM.http
          .get(operation.removeUrl, { id: data.id })
          .done((result) => {
            //调用后续自定义函数
            that.removeRunLaterHandle(result, operation);
          })
          .error((err) => {
            IDM.message.error("请求异常！");
          });
    },
    removeRunLaterHandle(result, operation) {
      if (
        operation.removeRunLaterFunction &&
        operation.removeRunLaterFunction.length > 0
      ) {
        const removeRunLaterFunction = operation.removeRunLaterFunction;
        removeRunLaterFunction.forEach((item) => {
          window[item.name] &&
            window[item.name].call(this, {
              customParam: item.param,
              resData: result,
            });
        });
      }
    },
    /**
     * 组件通信：接收消息的方法
     * @param {
     *  type:"发送消息的时候定义的类型，这里可以自己用来要具体做什么，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）"
     *  message:{发送的时候传输的消息对象数据}
     *  messageKey:"消息数据的key值，代表数据类型是什么，常用于表单交互上，比如通过这个key判断是什么数据"
     *  isAcross:如果为true则代表发送来源是其他页面的组件，默认为false
     * } object
     */
    receiveBroadcastMessage(object) {
      console.log("组件收到消息:" + this.moduleObject.packageid, object);
      if (object.type && object.type == "linkageDemand") {
        this.getCardList(object.message);
      }
    },
    /**
     * 组件通信：发送消息的方法
     * @param {
     *  type:"自己定义的，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）",
     *  message:{实际的消息对象},
     *  rangeModule:"为空发送给全部，根据配置的属性中设定的值（值的内容是组件的packageid数组），不取子表的，比如直接 this.$root.propData.compositeAttr["attrKey"]（注意attrKey是属性中定义的bindKey）,这里的格式为：['1','2']"",
     *  className:"指定的组件类型，比如只给待办组件发送，然后再去过滤上面的值"
     *  globalSend:如果为true则全站发送消息，注意全站rangeModule是无效的，只有className才有效，默认为false
     * } object
     */
    sendBroadcastMessage(object) {
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    },
  },
};
</script>
<style lang="scss">
.idm_dataSourceCard_box {
  display: flex;
  flex-wrap: wrap;
  .ant-card {
    width: 285px;
    height: 150px;
    background-color: #fff;
    background-origin: padding-box;
    border-radius: 12px;
    transition: all 0.3s linear;
    margin: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .ant-card-head {
      border: none;
      height: 48px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
    }
    .ant-card-body {
      flex-grow: 1;
      padding-bottom: 0;
      .content {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 20px;
        .code {
          flex-shrink: 1;
          flex-grow: 1;
          margin: 0 24px 0 6px;
          font-size: 14px;
        }
      }
    }
    &:hover {
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    }
  }
}
.idm_dataSourceCard_popover {
  padding-top: 0;
  .ant-popover-arrow {
    display: none;
  }
  .ant-popover-inner-content {
    padding: 0;
    .container {
      .element {
        min-width: 100px;
        padding: 5px 20px 5px 20px;
        cursor: pointer;
        .icon {
          font-size: 14px;
          max-height: 14px;
          width: 14px;
          fill: currentColor;
          vertical-align: -0.15em;
          margin-right: 3px;
          outline: none;
        }
        &:hover {
          background: #f4f4f4ff;
          background-origin: padding-box;
        }
      }
    }
  }
}
</style>