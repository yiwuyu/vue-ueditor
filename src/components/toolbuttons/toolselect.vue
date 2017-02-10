<template>
	<div class="ywy_toolSelect" v-clickoutside="onListHide">
		<div class="ywy_toolSelect_wrap">
			<button class="ywy_edui_toolbutton ywy_edui_icon"><i :style="{backgroundColor: defaultvalue}" class="colorbar" v-if="colorPicker"></i></button><button class="select" @click="onListShow"><i class="triangle"></i></button>
			<div class="ywy_edui_toolselect_panel" v-show="listvisible" v-if="colorPicker">
				<div class="recent_color color_box">
					<p class="title">最近使用颜色</p>
					<button class="clear" title="清除颜色" @click="onSelect('', 'removeformat')"></button><button v-for="item in recentColorList" :style="{backgroundColor: item}" :title="'#'+item" @click="onSelect(item)"></button>
				</div>
				<div class="basic_color color_box">
					<p class="title">基本色</p>
					<button v-for="item in baseColorList" :style="{backgroundColor: item}" :title="'#'+item" @click="onSelect(item)"></button>
				</div>
				<div class="input_color">
					<button class="preview" :style="{backgroundColor: '#' + value}" @click="onSelect('#'+value)"></button><div class="input_wrap"><input type="text" v-model="value"><i class="icon">#</i></div><button class="js_ok" @click="onSelect('#'+value)">确认</button>
				</div>
			</div>
			<div class="ywy_edui_toolselect_list" v-show="listvisible" v-else>
				<ul>
					<li v-for="item in valueList" @click="onSelect(item.value)">
						<i class="checked" v-if="item.value === value"></i>
						<span>{{item.label}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Clickoutside from 'element-ui/src/utils/clickoutside';
	export default {
		props: {
			keyName: String,
			defaultvalue: String,
			dir: String,
			valueList: {
				type: Array,
				default() {
					return [];
				}
			},
			colorPicker: Boolean,
			listVisible: Boolean
		},
		data() {
			return {
				value: this.defaultvalue.replace('#', ''),
				listvisible: !1,
				baseColorList: [
					'#ffffff', '#ffd7d5', '#ffdaa9', '#fffed5', '#d4fa00', '#73fcd6', '#a5c8ff', '#ffacd5', '#ff7faa', '#d6d6d6', '#ffacaa', '#ffb995', '#fffb00', '#73fa79', '#00fcff', '#78acfe', '#d84fa9', '#ff4f79', '#b2b2b2', '#d7aba9', '#ff6827', '#ffda51', '#00d100', '#00d5ff', '#0080ff', '#ac39ff', '#ff2941', '#888888', '#7a4442', '#ff4c00', '#ffa900', '#3da742', '#3daad6', '#0052ff', '#7a4fd6', '#d92142', '#000000', '#7b0c00', '#ff4c41', '#d6a841', '#407600', '#007aaa', '#021eaa', '#797baa', '#ab1942'
				]
			};
		},
		computed: {
			recentColorList() {
				let list = window.localStorage.recentColorList;
				if (list) {
					list = JSON.parse(list);
				} else {
					list = [];
				}
				return list;
			}
		},
		methods: {
			onListShow() {
				this.listvisible = !0;
			},
			onListHide() {
				this.listvisible = !1;
			},
			/**
			 * 传值
			 * 选择颜色：onSelect('#fff')
			 * keyname: forecolor
			 * 选择行间距 onSelect('1.5')
			 * keyname: lineheight
			 * 清除颜色（or背景颜色）color backgroundColor
			 * keyname: onSelect('', 'removeformat')
			 * @createdAt 2017-02-10T11:57:29+0800
			 * @author lichin
			 */
			onSelect(item, name) {
				this.value = item;
				const value = (name && (this.keyname === 'forecolor' ? 'color' : 'backgroundColor')) || item;
				this.$emit('toolselectvaluechange', name || this.keyName, value, this.dir);
				this.onListHide();
				if (this.colorPicker && !name) {
					this.storeRecentColor(item);
				}
			},
			storeRecentColor(item) {
				let list = this.recentColorList;
				let len = list.unshift(item);
				for (let i = 1; i < len; i++) {
					if (list[i] === item) {
						list.splice(i, 1);
						len--;
						break;
					}
				}
				if (len > 8) {
					list.length = 8;
				}
				window.localStorage.recentColorList = JSON.stringify(list);
			}
		},
		directives: {Clickoutside},
		watch: {
			defaultvalue(val) {
				this.value = val.replace('#', '');
			},
			listVisible(val) {
				if (!val) {
					this.listvisible = !1;
				}
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.ywy_toolSelect
		.ywy_edui_icon
			position: relative
			border: none
		
		.colorbar
			position: absolute
			left: 3px
			bottom: 1px
			width: 13px
			height: 3px

		.ywy_edui_toolselect_panel, .ywy_edui_toolselect_list
			position: absolute
			left: 0
			_width: 150px
			min-width: 170px
			border: 1px solid #e7e7eb
			background-color: #fff
			z-index: 40
		
		.ywy_edui_toolselect_panel
			width: 258px
			height: 310px
			padding: 20px
			box-sizing: border-box

			button
				outline: none
				box-sizing: border-box

			.color_box
				.title
					color: #8d8d8d
					font-size: 13px
					margin: 10px 0

				button
					width: 20px
					height: 20px
					margin: 0 4px 4px 0
					border: 1px solid #e7e7eb
					cursor: pointer
				
				.clear
					background: url(/static/ueditor/themes/default/images/ueditor_z29f4d5.png) 0 -1070px no-repeat
					background-color: transparent
					border: none
			.input_color
				margin: 10px 0
				padding-top: 10px
				border-top: 1px solid #e7e7eb

				.input_wrap
					display: inline-block
					vertical-align: middle
					position: relative

					.icon
						position: absolute
						left: 4px
						height: 24px
						line-height: 24px

				button, input
					height: 24px
					box-sizing: border-box
					vertical-align: middle
					margin-right: 5px
					border: 1px solid #e7e7eb
					outline: none

				.preview
					width: 24px

				input
					position: relative
					width: 100px
					padding-left: 20px
					font-size: 15px

				.js_ok
					padding: 0 24px
					border-radius: 4px
					background-color: #fff
					cursor: pointer

					&:hover
						border-color: #dadbe0

		.ywy_edui_toolselect_list
			background: url(/static/ueditor/themes/default/images/sparator.png) repeat-y 25px #fff
			ul
				margin: 0
				padding: 0 2px

				li
					width: 100%
					position: relative
					padding: 4px
					padding-left: 30px
					margin: 0
					font-size: 12px
					box-sizing: border-box
					border: 1px solid transparent

					&:hover
						background-color: #f4f5f9
						border-color: #e7e7eb
						cursor: default

					.checked
						width: 20px
						height: 20px
						position: absolute
						left: 0
						top: 2px
						background: url(/static/ueditor/themes/default/images/icons-all29f4d4.gif) no-repeat 6px -205px
</style>
