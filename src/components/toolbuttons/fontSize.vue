<template>
	<div class="ywy_toolSelect">
		<div class="ywy_toolSelect_wrap">
			<input type="text" class="input" v-model="font" @blur="checkInput" @keyup.enter="blur">
			<div class="ywy_fontsize_list_wrap" v-clickoutside="onListHide">
				<button class="select" @click="onListShow"><i class="triangle"></i></button><div class="ywy_fontsize_list" v-show="listvisible">
					<ul>
						<li v-for="item in fontSizeList" @click="onSelect(item)">
							<span :style="{fontSize: item + 'px'}">{{item}}px</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Clickoutside from 'element-ui/src/utils/clickoutside';
	export default {
		props: {
			fontSize: String,
			fontSizeList: {
				type: Array,
				default() {
					return [10, 11, 12, 14, 16, 18, 20, 24, 36];
				}
			},
			listVisible: Boolean
		},
		data() {
			return {
				font: this.fontSize || '16px',
				listvisible: !1
			};
		},
		methods: {
			checkInput() {
				console.log('check');
				this.font = this.font.match(/\d+/g)[0] + 'px';
				// 通知父组件
				this.$emit('fontsizechange', this.font);
			},
			blur(event) {
				event.target.blur();
			},
			onListShow() {
				this.listvisible = !0;
			},
			onListHide() {
				this.listvisible = !1;
			},
			onSelect(item) {
				this.font = item + 'px';
				// 通知父组件
				this.$emit('fontsizechange', this.font);
				this.onListHide();
			}
		},
		directives: {Clickoutside},
		watch: {
			/**
			 * 监听外部数据改变
			 * @createdAt 2017-02-09T09:27:52+0800
			 * @author lichin
			 */
			fontSize(val) {
				this.font = val;
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
	.ywy_toolSelect_wrap
		padding-left: 5px

		.input, .select
			vertical-align: middle
			height: 20px
			border: none
			outline: none
			background-color: transparent

		.input
			width: 32px
		
		.select
			padding: 0
			padding-right: 5px
			.triangle
				display: block
				width: 0
				height: 0
				border-right: 3px solid transparent
				border-left: 3px solid transparent
				border-top: 4px solid #888
			&:hover .triangle
				border-top-color: #666
	
	.ywy_fontsize_list_wrap
		display: inline-block
		vertical-align: middle

	.ywy_fontsize_list
		position: absolute
		left: 0
		z-index: 40
		width: 164px
		height: 194px
		overflow: auto
		border: 1px solid #e7e7eb
		-webkit-background-clip: padding-box
		-moz-background-clip: padding
		background-clip: padding-box
		padding: 5px
		background: #fff
	
		ul
			margin: 0
			width: 100%

			li
				width: 100%
				margin: 0
				padding: 4px
				box-sizing: border-box

				&:hover
					background-color: #f4f5f9
					cursor: default
</style>
