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
    :title="propData.htmlTitle"
    class="i-workbench-card-outer"
  >
    <div class="i-workbench-card-item" v-for="(item,index) in listData" :key="`workbench-card-${index}`">
      <div class="card-item-ad">
        <span class="card-item-tip" v-if="item.isTip"><a-icon type="bell" />内容有更新,请重新发布</span>
      </div>
      <div class="card-item-des">
        <div class="des-publish">
          <span v-if="item.publish==='0'">未发布</span>
          <span v-else class="true">已发布</span>
        </div>
        <div class="des-tit">
          {{item.comName}}
        </div>
        <div class="des-handle">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              <a-icon type="more" />
            </a>
            <template slot="overlay">
              <a-menu @click="dropdownClick">
                <a-menu-item key="1">1st menu item</a-menu-item>
                <a-menu-item key="2">2nd menu item</a-menu-item>
                <a-menu-item key="3">3rd menu item</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <div v-if="!listData||(listData&&listData.length==0)" style="text-align: center;width:100%">
      <a-empty :image-style="{margin: '10px auto'}" :description="propData.emptyDescription||'暂无数据'"/>
    </div>
</div>
</template>

<script>
export default {
  name: "IWorkbenchCrad",
	components:{
	},
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      listData: [],
    };
  },
  props: {},
  created() {
    this.moduleObject = this.$root.moduleObject;
		this.convertAttrToStyleObject();
    if (!this.moduleObject.env || this.moduleObject.env === "develop") {
      //开发模式下给例子数据
      this.listData = [
        {
					"comId": "1",
					"comName": "广告轮播",
					"publish":"0"
        },
        {
					"comId": "2",
					"comName": "统一待办",
					"publish":"1",
          "isTip":true
        },
        {
					"comId": "2",
					"comName": "统一待办",
					"publish":"1"
        }
      ];
    }
    if(this.moduleObject.env ===  "production"){
      this.initData()
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    /**
     * 初始化数据
     */
    initData(){},
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
			this.convertAttrToStyleObject();
    },
		/**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(){
      var styleObject = {};
      var cardStyleObject = {};
      if(this.propData.bgSize&&this.propData.bgSize=="custom"){
        styleObject["background-size"]=(this.propData.bgSizeWidth?this.propData.bgSizeWidth.inputVal+this.propData.bgSizeWidth.selectVal:"auto")+" "+(this.propData.bgSizeHeight?this.propData.bgSizeHeight.inputVal+this.propData.bgSizeHeight.selectVal:"auto")
      }else if(this.propData.bgSize){
        styleObject["background-size"]=this.propData.bgSize;
      }
      if(this.propData.cardBgSize&&this.propData.cardBgSize=="custom"){
        cardStyleObject["background-size"]=(this.propData.cardBgSizeWidth?this.propData.cardBgSizeWidth.inputVal+this.propData.cardBgSizeWidth.selectVal:"auto")+" "+(this.propData.cardBgSizeHeight?this.propData.cardBgSizeHeight.inputVal+this.propData.cardBgSizeHeight.selectVal:"auto")
      }else if(this.propData.cardBgSize){
        cardStyleObject["background-size"]=this.propData.cardBgSize;
      }

      if(this.propData.positionX&&this.propData.positionX.inputVal){
        styleObject["background-position-x"]=this.propData.positionX.inputVal+this.propData.positionX.selectVal;
      }
      if(this.propData.cardPositionX&&this.propData.cardPositionX.inputVal){
        cardStyleObject["background-position-x"]=this.propData.cardPositionX.inputVal+this.propData.cardPositionX.selectVal;
      }
      
      if(this.propData.positionY&&this.propData.positionY.inputVal){
        cardStyleObject["background-position-y"]=this.propData.positionY.inputVal+this.propData.positionY.selectVal;
      }
      if(this.propData.cardPositionY&&this.propData.cardPositionY.inputVal){
        cardStyleObject["background-position-y"]=this.propData.cardPositionY.inputVal+this.propData.cardPositionY.selectVal;
      }

      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if(!element&&element!==false&&element!=0){
            continue;
          }
          switch (key) {
            case "width":
            case "height":
              styleObject[key]=element;
              break;
            case "cardWidth":
            case "cardHeight":
              cardStyleObject[key]=element;
              break;
            case "bgColor":
              if(element&&element.hex8){
                styleObject["background-color"]=element.hex8;
              }
              break;
            case "cardBgColor":
              if(element&&element.hex8){
                cardStyleObject["background-color"]=element.hex8;
              }
              break;
            case "box":
              if(element.marginTopVal){
                styleObject["margin-top"]=`${element.marginTopVal}`;
              }
              if(element.marginRightVal){
                styleObject["margin-right"]=`${element.marginRightVal}`;
              }
              if(element.marginBottomVal){
                styleObject["margin-bottom"]=`${element.marginBottomVal}`;
              }
              if(element.marginLeftVal){
                styleObject["margin-left"]=`${element.marginLeftVal}`;
              }
              if(element.paddingTopVal){
                styleObject["padding-top"]=`${element.paddingTopVal}`;
              }
              if(element.paddingRightVal){
                styleObject["padding-right"]=`${element.paddingRightVal}`;
              }
              if(element.paddingBottomVal){
                styleObject["padding-bottom"]=`${element.paddingBottomVal}`;
              }
              if(element.paddingLeftVal){
                styleObject["padding-left"]=`${element.paddingLeftVal}`;
              }
              break;
            case "CardBox":
              if(element.marginTopVal){
                cardStyleObject["margin-top"]=`${element.marginTopVal}`;
              }
              if(element.marginRightVal){
                cardStyleObject["margin-right"]=`${element.marginRightVal}`;
              }
              if(element.marginBottomVal){
                cardStyleObject["margin-bottom"]=`${element.marginBottomVal}`;
              }
              if(element.marginLeftVal){
                cardStyleObject["margin-left"]=`${element.marginLeftVal}`;
              }
              if(element.paddingTopVal){
                cardStyleObject["padding-top"]=`${element.paddingTopVal}`;
              }
              if(element.paddingRightVal){
                cardStyleObject["padding-right"]=`${element.paddingRightVal}`;
              }
              if(element.paddingBottomVal){
                cardStyleObject["padding-bottom"]=`${element.paddingBottomVal}`;
              }
              if(element.paddingLeftVal){
                cardStyleObject["padding-left"]=`${element.paddingLeftVal}`;
              }
              break;
            case "bgImgUrl":
              styleObject["background-image"]=`url(${window.IDM.url.getWebPath(element)})`;
              break;
            case "cardBgImgUrl":
              cardStyleObject["background-image"]=`url(${window.IDM.url.getWebPath(element)})`;
              break;
            case "positionX":
              //背景横向偏移
              styleObject["background-position-x"] = element;
              break;
            case "cardPositionX":
              //背景横向偏移
              cardStyleObject["background-position-x"] = element;
              break;
            case "positionY":
              //背景纵向偏移
              styleObject["background-position-y"] = element;
              break;
            case "cardPositionY":
              //背景纵向偏移
              cardStyleObject["background-position-y"] = element;
              break;
            case "bgRepeat":
              //平铺模式
                styleObject["background-repeat"]=element;
              break;
            case "cardBgRepeat":
              //平铺模式
                cardStyleObject["background-repeat"]=element;
              break;
            case "bgAttachment":
              //背景模式
                styleObject["background-attachment"]=element;
              break;
            case "cardBgAttachment":
              //背景模式
                cardStyleObject["background-attachment"]=element;
              break;
            case "border":
              if(element.border.top.width>0){
                styleObject["border-top-width"]=element.border.top.width+element.border.top.widthUnit;
                styleObject["border-top-style"]=element.border.top.style;
                if(element.border.top.colors.hex8){
                  styleObject["border-top-color"]=element.border.top.colors.hex8;
                }
              }
              if(element.border.right.width>0){
                styleObject["border-right-width"]=element.border.right.width+element.border.right.widthUnit;
                styleObject["border-right-style"]=element.border.right.style;
                if(element.border.right.colors.hex8){
                  styleObject["border-right-color"]=element.border.right.colors.hex8;
                }
              }
              if(element.border.bottom.width>0){
                styleObject["border-bottom-width"]=element.border.bottom.width+element.border.bottom.widthUnit;
                styleObject["border-bottom-style"]=element.border.bottom.style;
                if(element.border.bottom.colors.hex8){
                  styleObject["border-bottom-color"]=element.border.bottom.colors.hex8;
                }
              }
              if(element.border.left.width>0){
                styleObject["border-left-width"]=element.border.left.width+element.border.left.widthUnit;
                styleObject["border-left-style"]=element.border.left.style;
                if(element.border.left.colors.hex8){
                  styleObject["border-left-color"]=element.border.left.colors.hex8;
                }
              }
              
              styleObject["border-top-left-radius"]=element.radius.leftTop.radius+element.radius.leftTop.radiusUnit;
              styleObject["border-top-right-radius"]=element.radius.rightTop.radius+element.radius.rightTop.radiusUnit;
              styleObject["border-bottom-left-radius"]=element.radius.leftBottom.radius+element.radius.leftBottom.radiusUnit;
              styleObject["border-bottom-right-radius"]=element.radius.rightBottom.radius+element.radius.rightBottom.radiusUnit;
              break;
            case "cardBorder":
              if(element.border.top.width>0){
                cardStyleObject["border-top-width"]=element.border.top.width+element.border.top.widthUnit;
                cardStyleObject["border-top-style"]=element.border.top.style;
                if(element.border.top.colors.hex8){
                  cardStyleObject["border-top-color"]=element.border.top.colors.hex8;
                }
              }
              if(element.border.right.width>0){
                cardStyleObject["border-right-width"]=element.border.right.width+element.border.right.widthUnit;
                cardStyleObject["border-right-style"]=element.border.right.style;
                if(element.border.right.colors.hex8){
                  cardStyleObject["border-right-color"]=element.border.right.colors.hex8;
                }
              }
              if(element.border.bottom.width>0){
                cardStyleObject["border-bottom-width"]=element.border.bottom.width+element.border.bottom.widthUnit;
                cardStyleObject["border-bottom-style"]=element.border.bottom.style;
                if(element.border.bottom.colors.hex8){
                  cardStyleObject["border-bottom-color"]=element.border.bottom.colors.hex8;
                }
              }
              if(element.border.left.width>0){
                cardStyleObject["border-left-width"]=element.border.left.width+element.border.left.widthUnit;
                cardStyleObject["border-left-style"]=element.border.left.style;
                if(element.border.left.colors.hex8){
                  cardStyleObject["border-left-color"]=element.border.left.colors.hex8;
                }
              }
              
              cardStyleObject["border-top-left-radius"]=element.radius.leftTop.radius+element.radius.leftTop.radiusUnit;
              cardStyleObject["border-top-right-radius"]=element.radius.rightTop.radius+element.radius.rightTop.radiusUnit;
              cardStyleObject["border-bottom-left-radius"]=element.radius.leftBottom.radius+element.radius.leftBottom.radiusUnit;
              cardStyleObject["border-bottom-right-radius"]=element.radius.rightBottom.radius+element.radius.rightBottom.radiusUnit;
              break;
            case "font":
              cardStyleObject["font-family"]=element.fontFamily;
              if(element.fontColors.hex8){
                cardStyleObject["color"]=element.fontColors.hex8;
              }
              cardStyleObject["font-weight"]=element.fontWeight&&element.fontWeight.split(" ")[0];
              cardStyleObject["font-style"]=element.fontStyle;
              cardStyleObject["font-size"]=element.fontSize+element.fontSizeUnit;
              cardStyleObject["line-height"]=element.fontLineHeight+(element.fontLineHeightUnit=="-"?"":element.fontLineHeightUnit);
              cardStyleObject["text-align"]=element.fontTextAlign;
              cardStyleObject["text-decoration"]=element.fontDecoration;
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id,styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .i-workbench-card-item',cardStyleObject);
      // this.initData();
    },
		/**
		 * 操作
		 */
		dropdownClick(event,a){}
  },
};
</script>
<style scoped lang="scss">
.i-workbench-card-outer {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	font-family: PingFangSC-Regular;
	font-size: 16px;
	color: #333333;

	.i-workbench-card-item {
		width: 260px;
    height: 370px;
    background-color: #fff;
    margin-right: 20px;
		border-radius: 10px;
		
		.card-item-ad {
      position: relative;
			height: 80%;
			background-color: rgb(224,238,255);
			width: 100%;
			border-radius: 10px;

      .card-item-tip {
        position: absolute;
        top: 14px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        padding: 0 14px;
        background: rgb(255,240,219);
        color: rgb(255,149,99);
        border-radius: 13px;
        white-space: nowrap;
      }
		}

		.card-item-des {
			display: flex;
			height: 40px;
			line-height: 40px;

			.des-publish {
				width: 80px;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				span {
					display: inline-block;
					width: 50px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					background-color: rgb(158, 164, 170);
					font-size: 12px;
					border-radius: 4px;
					color: #fff;

					&.true {
						background-color: rgb(247,163,0);
					}
				}
			}

			.des-tit {
				flex: 1;
				height: 100%;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				font-weight: 700;
			}

			.des-handle {
				width: 40px;
				height: 100%;
				line-height: 40px;
				text-align: center;
			}
		}
	}
}
</style>