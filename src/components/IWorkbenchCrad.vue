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
  >
    <div class="i-workbench-card-outer">
			<div class="i-workbench-card-item" v-for="(item,index) in listData" :key="`workbench-card-${index}`">
				<div class="card-item-ad">

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
    // if (!this.moduleObject || this.moduleObject.env == "develop") {
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
					"publish":"1"
        },
        {
					"comId": "2",
					"comName": "统一待办",
					"publish":"1"
        }
      ];
    // }else{
      
    // }
  },
  mounted() {},
  destroyed() {},
  methods: {
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
      if(this.propData.bgSize&&this.propData.bgSize=="custom"){
        styleObject["background-size"]=(this.propData.bgSizeWidth?this.propData.bgSizeWidth.inputVal+this.propData.bgSizeWidth.selectVal:"auto")+" "+(this.propData.bgSizeHeight?this.propData.bgSizeHeight.inputVal+this.propData.bgSizeHeight.selectVal:"auto")
      }else if(this.propData.bgSize){
        styleObject["background-size"]=this.propData.bgSize;
      }
      if(this.propData.positionX&&this.propData.positionX.inputVal){
        styleObject["background-position-x"]=this.propData.positionX.inputVal+this.propData.positionX.selectVal;
      }
      if(this.propData.positionY&&this.propData.positionY.inputVal){
        styleObject["background-position-y"]=this.propData.positionY.inputVal+this.propData.positionY.selectVal;
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
            case "bgColor":
              if(element&&element.hex8){
                styleObject["background-color"]=element.hex8;
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
            case "bgImgUrl":
              styleObject["background-image"]=`url(${window.IDM.url.getWebPath(element)})`;
              break;
            case "positionX":
              //背景横向偏移
              
              break;
            case "positionY":
              //背景纵向偏移
              
              break;
            case "bgRepeat":
              //平铺模式
                styleObject["background-repeat"]=element;
              break;
            case "bgAttachment":
              //背景模式
                styleObject["background-attachment"]=element;
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
            case "font":
              styleObject["font-family"]=element.fontFamily;
              if(element.fontColors.hex8){
                styleObject["color"]=element.fontColors.hex8;
              }
              styleObject["font-weight"]=element.fontWeight&&element.fontWeight.split(" ")[0];
              styleObject["font-style"]=element.fontStyle;
              styleObject["font-size"]=element.fontSize+element.fontSizeUnit;
              styleObject["line-height"]=element.fontLineHeight+(element.fontLineHeightUnit=="-"?"":element.fontLineHeightUnit);
              styleObject["text-align"]=element.fontTextAlign;
              styleObject["text-decoration"]=element.fontDecoration;
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id,styleObject);
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
			height: 80%;
			background-color: rgb(224,238,255);
			width: 100%;
			border-radius: 10px;
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