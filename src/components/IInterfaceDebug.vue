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
    class="idm_interfaceDebug_box"
  >
    <a-spin :spinning="pageLoading">
      <div class="container">
        <div class="table_box">
          <div class="text">请按照参数输入值，调试该接口是否返回正确的数据</div>
          <a-table
            :data-source="dataSource"
            :columns="columns"
            :bordered="false"
            :pagination="false"
            size="middle"
            :scroll="{ y: propData.scrollY }"
          >
            <template slot="value" slot-scope="text, record">
              <editable-cell
                :text="text"
                @change="onCellChange(record.key, 'value', $event)"
              />
            </template>
          </a-table>
          <div class="button">
            <a-button
              type="primary"
              @click="handleCheck"
              :loading="checkLoading"
              >验证</a-button
            >
          </div>
        </div>
        <div class="json_box">
          <template v-if="!!responseInfo">
            <div class="info">
              <template v-if="responseInfo.type === 'success'">
                <a-icon
                  type="check-circle"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                />
                <span class="text">接口请求成功</span>
              </template>
              <template v-else>
                <a-icon
                  type="close-circle"
                  theme="twoTone"
                  two-tone-color="#ff4d4f"
                />
                <span class="text">接口请求失败</span>
              </template>
            </div>
            <json-viewer
              :value="
                responseInfo.type === 'success'
                  ? responseInfo.data
                  : responseInfo.message
              "
              copyable
              ><template slot="copy">复制</template></json-viewer
            >
          </template>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";
const EditableCell = {
  template: `
      <div class="editable-cell">
        <div class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" />
        </div>
      </div>
    `,
  props: {
    text: String,
  },
  data() {
    return {
      value: this.text,
      editable: false,
    };
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      this.value = value;
      this.$emit("change", this.value);
    },
  },
};
export default {
  name: "IInterfaceDebug",
  components: {
    EditableCell,
    JsonViewer,
  },
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      pageLoading: false,
      checkLoading: false,
      responseInfo: null,
      dataSource: [],
      columns: [
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "参数",
          dataIndex: "param",
        },
        {
          title: "参数值",
          dataIndex: "value",
          width: "40%",
          scopedSlots: { customRender: "value" },
        },
      ],
    };
  },
  props: {},
  computed: {},
  created() {
    this.moduleObject = this.$root.moduleObject;
    // console.log(this.moduleObject)
    this.initAttrToModule();
    if (this.moduleObject.env === 'production' || !IDM.env_dev) {
      this.getInfo();
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    handleCheck() {
      if (this.dataSource.length === 0) return false;
      const params = this.getParams();
      if (!params) {
        return IDM.message.error("参数值格式不正确，请按照标准JSON格式填写！");
      }
      this.sendRequest(params);
    },
    // 从表格中提取传参
    getParams() {
      let params = {};
      try {
        this.dataSource.forEach((item) => {
          //用JSON处理，目的是保留原输入类型，但要求输入必须按照标准JSON格式(使用双引号)
          // 空字符当作undefined处理
          if (item.value) {
            params[item.param] = JSON.parse(item.value);
          }
        });
      } catch (e) {
        return false;
      }
      return params;
    },
    // 发送请求
    sendRequest(params) {
      if (!this.propData.checkUrl) return false;
      this.responseInfo = null;
      this.checkLoading = true;
      IDM.http
        .post(
          this.propData.checkUrl,
          { id: IDM.url.queryString(this.propData.urlParamName), ...params },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .done((result) => {
          this.responseInfo = result;
          this.checkLoading = false;
        })
        .error((err) => {
          IDM.message.error("请求异常！");
          this.checkLoading = false;
        });
    },
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
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
    // 查询接口信息
    getInfo() {
      if (!this.propData.infoUrl) return false;
      this.pageLoading = true;
      IDM.http
        .get(this.propData.infoUrl, {
          id: IDM.url.queryString(this.propData.urlParamName),
        })
        .done((result) => {
          if (result && result.type == "success") {
            try {
              this.dataSource = result.data.paramList.map((item) => ({
                ...item,
                key: item.param,
                value: JSON.stringify(item.value),
              }));
            } catch (e) {
              IDM.message.error("数据格式错误！");
            }
          } else {
            IDM.message.error(result.message);
          }
          this.pageLoading = false;
        })
        .error((err) => {
          IDM.message.error("请求异常！");
          this.pageLoading = false;
        });
    },
    /**
     * 加载属性到组件中
     */
    initAttrToModule() {
      this.convertAttrToStyleObject();
    },
  },
};
</script>
<style lang="scss">
.idm_interfaceDebug_box {
  height: 100%;
  .ant-spin-nested-loading {
    height: 100%;
    .ant-spin-container {
      height: 100%;
      .container {
        display: flex;
        height: 100%;
        .table_box {
          width: 65%;
          padding: 16px;
          display: flex;
          flex-direction: column;
          .text {
            margin-bottom: 8px;
          }
          .button {
            text-align: center;
            padding: 16px;
          }
          .ant-table-wrapper {
            flex-grow: 1;
            .editable-cell-input-wrapper,
            .editable-cell-text-wrapper {
              padding-right: 24px;
            }
            .editable-cell-text-wrapper {
              padding: 5px 24px 5px 5px;
            }
          }
          .ant-table-column-title {
            color: #000000a6;
          }
        }
        .json_box {
          width: 35%;
          padding: 16px;
          background-color: #0000000a;
          display: flex;
          flex-direction: column;
          .info {
            margin-bottom: 8px;
            margin-left: 6px;
            .text {
              margin-left: 12px;
            }
          }
          .jv-container {
            flex-grow: 1;
            overflow-y: scroll;

            background-color: transparent;
          }
          ::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
}
</style>
