<template>
	<div class="ywy_edit_page">
		<div class="ywy_edui_wrap">
			<div class="ywy_edui_left">
				<!-- BEGIN 工具栏 -->
				<div class="ywy_edui_toolbar_box">
					<div class="ywy_edui_toolbar_box_inner" v-clickoutside="onMaskShow">
						<div class="ywy_edui_toolbar">
							<elTooltip content="撤销" placement="top" class="ywy_edui_tooltip ywy_edui_undo">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" :disabled="toolStates.undo < 0" @click="onUndo">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="重做" placement="top" class="ywy_edui_tooltip ywy_edui_redo">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" :disabled="toolStates.redo < 0" @click="onRedo">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<span class="ywy_edui_separator"></span>
							<elTooltip content="字号10~36px" placement="top" class="ywy_edui_tooltip ywy_edui_fontsize">
								<div class="ywy_edui_toolselect ywy_edui_toolbar_default">
									<ywyFontSize :fontSize="toolValues.fontsize" @fontsizechange="onFontsizeChange" :listVisible="listVisible"></ywyFontSize>
								</div>
							</elTooltip>
							<span class="ywy_edui_separator"></span>
							<elTooltip content="引用" placement="top" :class="'ywy_edui_tooltip ywy_edui_blockquote' + (toolStates.blockquote === 1 ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onBlockquote">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="分隔线" placement="top" :class="'ywy_edui_tooltip ywy_edui_horizontal' + (toolStates.horizontal === 1 ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onHorizontal">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<span class="ywy_edui_separator"></span>
							<elTooltip content="清除格式" placement="top" class="ywy_edui_tooltip ywy_edui_removeformat">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onRemoveFormat">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="格式刷" placement="top" class="ywy_edui_tooltip ywy_edui_formatmatch">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onFormatmatch">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
						</div>
						<div class="ywy_edui_toolbar">
							<elTooltip content="加粗" placement="top" :class="'ywy_edui_tooltip ywy_edui_bold' + (toolStates.bold === 1 ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onBold">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="斜体" placement="top" :class="'ywy_edui_tooltip ywy_edui_italic' + (toolStates.italic === 1 ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onItalic">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="下划线" placement="top" :class="'ywy_edui_tooltip ywy_edui_underline' + (toolStates.underline === 1 ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onUnderline">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="字体颜色" placement="top" class="ywy_edui_tooltip ywy_edui_fontcolor">
								<div class="ywy_edui_toolselect ywy_edui_toolbar_default">
									<ywyToolSelect :defaultvalue="toolValues.forecolor" @toolselectvaluechange="onToolSelectValueChange" keyName="forecolor" :colorPicker="true" :listVisible="listVisible"></ywyToolSelect>
								</div>
							</elTooltip>
							<elTooltip content="背景色" placement="top" class="ywy_edui_tooltip ywy_edui_fontbgcolor">
								<div class="ywy_edui_toolselect ywy_edui_toolbar_default">
									<ywyToolSelect :defaultvalue="toolValues.backcolor" @toolselectvaluechange="onToolSelectValueChange" keyName="backcolor" :colorPicker="true" :listVisible="listVisible"></ywyToolSelect>
								</div>
							</elTooltip>
							<span class="ywy_edui_separator"></span>
							<elTooltip content="首行缩进" placement="top" :class="'ywy_edui_tooltip ywy_edui_indent' + (toolStates.indent === 1 ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onIndent">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<span class="ywy_edui_separator"></span>
							<elTooltip content="居左对齐" placement="top" :class="'ywy_edui_tooltip ywy_edui_justifyleft' + (toolValues.justify === 'left' ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onJustify('left')">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="居中对齐" placement="top" :class="'ywy_edui_tooltip ywy_edui_justifycenter' + (toolValues.justify === 'center' ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onJustify('center')">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="居右对齐" placement="top" :class="'ywy_edui_tooltip ywy_edui_justifyright' + (toolValues.justify === 'right' ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onJustify('right')">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="两端对齐" placement="top" :class="'ywy_edui_tooltip ywy_edui_justifyjustify' + (toolValues.justify === 'justify' ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onJustify('justify')">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<span class="ywy_edui_separator"></span>
							<elTooltip content="段前距" placement="top" class="ywy_edui_tooltip ywy_edui_rowspacingtop">
								<div class="ywy_edui_toolselect ywy_edui_toolbar_default">
									<ywyToolSelect :valueList="toolOptions.rowspacing" :defaultvalue="toolValues.rowspacingtop" @toolselectvaluechange="onToolSelectValueChange" keyName="rowspacing" dir="top" :listVisible="listVisible"></ywyToolSelect>
								</div>
							</elTooltip>
							<elTooltip content="段后距" placement="top" class="ywy_edui_tooltip ywy_edui_rowspacingbottom">
								<div class="ywy_edui_toolselect ywy_edui_toolbar_default">
									<ywyToolSelect :valueList="toolOptions.rowspacing" :defaultvalue="toolValues.rowspacingbottom" @toolselectvaluechange="onToolSelectValueChange" keyName="rowspacing" dir="bottom" :listVisible="listVisible"></ywyToolSelect>
								</div>
							</elTooltip>
							<elTooltip content="行间距" placement="top" class="ywy_edui_tooltip ywy_edui_lineheight">
								<div class="ywy_edui_toolselect ywy_edui_toolbar_default">
									<ywyToolSelect :valueList="toolOptions.lineheight" :defaultvalue="toolValues.lineheight" @toolselectvaluechange="onToolSelectValueChange"  keyName="lineheight" :listVisible="listVisible"></ywyToolSelect>
								</div>
							</elTooltip>
							<span class="ywy_edui_separator"></span>
							<elTooltip content="有序列表" placement="top" class="ywy_edui_tooltip ywy_edui_orderedlist">
								<div class="ywy_edui_toolselect ywy_edui_toolbar_default">
									<ywyToolSelect :valueList="toolOptions.orderedlist" :defaultvalue="toolValues.insertorderedlist" @toolselectvaluechange="onToolSelectValueChange"  keyName="insertorderedlist" :listVisible="listVisible"></ywyToolSelect>
								</div>
							</elTooltip>
							<elTooltip content="无序列表" placement="top" class="ywy_edui_tooltip ywy_edui_unorderedlist">
								<div class="ywy_edui_toolselect ywy_edui_toolbar_default">
									<ywyToolSelect :valueList="toolOptions.unorderedlist" :defaultvalue="toolValues.insertunorderedlist" @toolselectvaluechange="onToolSelectValueChange"  keyName="insertunorderedlist" :listVisible="listVisible"></ywyToolSelect>
								</div>
							</elTooltip>
							<span class="ywy_edui_separator"></span>
							<elTooltip content="默认" placement="top" :class="'ywy_edui_tooltip ywy_edui_imagenone' + (toolStates.imagefloat === 'none' ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onImageFloat('none')" :disabled="!imagefloatvisible">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="左浮动" placement="top" :class="'ywy_edui_tooltip ywy_edui_imageleft' + (toolStates.imagefloat === 'left' ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onImageFloat('left')" :disabled="!imagefloatvisible">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="右浮动" placement="top" :class="'ywy_edui_tooltip ywy_edui_imageright' + (toolStates.imagefloat === 'right' ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onImageFloat('right')" :disabled="!imagefloatvisible">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
							<elTooltip content="居中" placement="top" :class="'ywy_edui_tooltip ywy_edui_imagecenter' + (toolStates.imagefloat === 'center' ? ' ywy_edui_checked' : '')">
								<button class="ywy_edui_toolbutton ywy_edui_toolbar_default" @click="onImageFloat('center')" :disabled="!imagefloatvisible">
									<i class="ywy_edui_icon"></i>
								</button>
							</elTooltip>
						</div>
					</div>
					<div class="ywy_edui_toolbar_mask" v-show="toolbarMaskVisible"></div>
				</div>
				<!-- END 工具栏 -->
				<!-- BEGIN 编辑区域 -->
				<div class="ywy_edui_container">
					<div ref="editor"></div>
				</div>
				<!-- END 编辑区域 -->
			</div>
			<div class="ywy_edui_right"></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import '../../../static/ueditor/ueditor.config';
	import '../../../static/ueditor/ueditor.all';
	import '../../../static/ueditor/lang/zh-cn/zh-cn';
	import ywyFontSize from 'components/toolbuttons/fontSize';
	import ywyToolSelect from 'components/toolbuttons/toolSelect';
	import Clickoutside from 'element-ui/src/utils/clickoutside';

	export default {
		name: 'ywy_edui',
		props: {
			content: {
				type: String,
				default: null
			}
		},
		data() {
			return {
				// 编辑器Id
				id: 'ywy_edui_' + Math.random(10),
				UE: window.UE || null,
				editor: null,
				// 工具条状态和数据
				toolStates: {
					// 是否可操作 -1:不可用 0:可用 1:已操作
					undo: -1,
					redo: -1,
					blockquote: 0,
					horizontal: 0,
					removeformat: 0,
					formatmatch: 0,
					bold: 0,
					italic: 0,
					underline: 0,
					indent: 0
				},
				// 子组件的值，必须确保在此注册才能监听动态数据双向绑定
				toolValues: {
					fontsize: '16px',
					forecolor: '',
					backcolor: '',
					justify: '',
					imagefloat: '',
					lineheight: '',
					rowspacing: '',
					rowspacingtop: '',
					rowspacingbottom: '',
					insertorderedlist: '',
					insertunorderedlist: ''
				},
				toolOptions: {
					// 段前后距
					rowspacing: [
						{label: '5', value: '5'},
						{label: '10', value: '10'},
						{label: '15', value: '15'},
						{label: '20', value: '20'},
						{label: '25', value: '25'}
					],
					lineheight: [
						{label: '1', value: '1'},
						{label: '1.5', value: '1.5'},
						{label: '1.75', value: '1.75'},
						{label: '2', value: '2'},
						{label: '3', value: '3'},
						{label: '4', value: '4'},
						{label: '5', value: '5'}
					],
					orderedlist: [
						{label: '1,2,3...', value: 'decimal'},
						{label: 'a,b,c...', value: 'lower-alpha'},
						{label: 'i,ii,iii...', value: 'lower-roman'},
						{label: 'A,B,C...', value: 'upper-alpha'},
						{label: 'Ⅰ,Ⅱ,Ⅲ...', value: 'upper-roman'}
						// 百度也没有
						// {label: '', value: 'cn'},
						// {label: '', value: 'cn1'},
						// {label: '', value: 'cn2'},
						// {label: '', value: 'num'},
						// {label: '', value: 'num1'},
						// {label: '', value: 'num2'}
					],
					unorderedlist: [
						{label: '○ 大圆圈', value: 'circle'},
						{label: '● 小圆点', value: 'disc'},
						{label: '■ 小方块', value: 'square'}
						// 百度也没有
						// {label: '小圆圈', value: 'dot'},
						// {label: '破折号', value: 'dash'}
					]
				},
				listVisible: !0,
				toolbarMaskVisible: !1,
				imagefloatvisible: !1,
				// 编辑器配置
				config: {
					toolbars: [
						[]
					],
					initialFrameWidth: null,
					initialFrameHeight: 400
				}
			};
		},
		watch: {
			// 监听content数据变化
			content(val) {
				if (!this.editor) {
					this.editor = this.UE.getEditor(this.id, this.config);
					if (val !== null) {
						this.editor.setContent(val);
					}
				}
			}
		},
		methods: {
			init() {
				console.log('in init');
				// 拉取服务器数据
			},
			/**
			 * 监听编辑器
			 * @createdAt 2017-02-08T18:43:08+0800
			 * @author lichin
			 */
			bindContentChange() {
				this.editor.addListener('contentChange', function() {
					console.log(this);
				}.bind(this));
			},
			bindSelectionChange() {
				this.editor.addListener('selectionchange', function() {
					const statelist = Object.keys(this.toolStates);
					const valuelist = Object.keys(this.toolValues);
					const len1 = statelist.length;
					const len2 = valuelist.length;

					for (let i = 0; i < len1; i++) {
						this.toolStates[statelist[i]] = this.editor.queryCommandState(statelist[i]);
					}
					for (let i = 0; i < len2; i++) {
						if (valuelist[i].indexOf('rowspacing') > -1) {
							this.toolValues[valuelist[i]] = this.editor.queryCommandValue('rowspacing', valuelist[i].replace('rowspacing', ''));
						} else {
							this.toolValues[valuelist[i]] = this.editor.queryCommandValue(valuelist[i]) + '';
						}
					}
					const dom = this.editor.selection.getRange().getClosedNode();
					if (dom && dom.tagName === 'IMG') {
						this.imagefloatvisible = !0;
					} else {
						this.imagefloatvisible = !1;
					}
					// console.log(this.toolStates);
					// console.log(this.toolValues);
				}.bind(this));
			},
			bindFocus_Blur() {
				this.editor.addListener('focus', function() {
					this.toolbarMaskVisible = !1;
					this.listVisible = !1;
				}.bind(this));
				this.editor.addListener('blur', function() {
					this.listVisible = !0;
				}.bind(this));
			},
			/**
			 * 事件绑定
			 * @createdAt 2017-02-08T19:17:55+0800
			 * @author lichin
			 */
			onUndo() {
				this.editor.execCommand('undo');
			},
			onRedo() {
				this.editor.execCommand('redo');
			},
			onFontsize(val) {
				this.editor.execCommand('fontsize', val);
			},
			onBlockquote() {
				this.editor.execCommand('blockquote');
			},
			onHorizontal() {
				this.editor.execCommand('horizontal');
			},
			onRemoveFormat() {
				this.editor.execCommand('removeformat');
			},
			onFormatmatch() {
				this.editor.execCommand('formatmatch');
			},
			onBold() {
				this.editor.execCommand('bold');
			},
			onItalic() {
				this.editor.execCommand('italic');
			},
			onUnderline() {
				this.editor.execCommand('underline');
			},
			onIndent() {
				this.editor.execCommand('indent');
			},
			onJustify(align) {
				this.editor.execCommand('justify', align);
			},
			onImageFloat(align) {
				this.editor.execCommand('imagefloat', align);
			},
			// 普通方法
			onMaskShow() {
				this.toolbarMaskVisible = !0;
			},
			// 接收子组件传递数据
			onFontsizeChange(fontsize) {
				this.toolValues.fontsize = fontsize;
				this.onFontsize(fontsize);
			},
			onToolSelectValueChange(name, value, dir) {
				this.editor.execCommand(name, value, dir);
			},
			onRemoveFormatColor(name, style, attrs) {
				this.editor.execCommand('removeformat', style);
			}
		},
		mounted() {
			var self = this;
			this.$nextTick(() => {
				self.$refs.editor.id = self.id;
				self.editor = self.UE.getEditor(self.id, self.config);
				self.editor.ready(() => {
					self.init();
					// self.bindContentChange();
					self.bindSelectionChange();
					self.bindFocus_Blur();
				});
			});
		},
		components: {ywyFontSize, ywyToolSelect},
		directives: {Clickoutside}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ywy_edui_wrap
		width: 920px
		margin: 0 auto
		overflow: hidden
		& > div
			float: left

		.ywy_edui_left
			width: 700px

		.ywy_edui_right
			width: 210px
			border: 1px solid #e7e7eb
			min-height: 200px

	.ywy_edui_container
		position: relative
		border: 1px solid #dedede
		padding: 10px 24px
		z-index: 1
	
	.ywy_edui_toolbar_box
		position: relative
		z-index: 2

		.ywy_edui_toolbar_box_inner
			padding: 5px 15px
			border: 1px solid #e7e7eb
			border-bottom: none

		.ywy_edui_toolbar_mask
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			background-color: #fff
			opacity: 0.5

	.ywy_edui_toolbar
		text-align: left
		padding: 5px 0
	
		.ywy_edui_checked .ywy_edui_toolbutton
			border-color: #e7e7eb
			position: relative

		.ywy_edui_toolbutton
			background-color: #fff
			padding: 0
			&:focus
				outline: none
			&:disabled
				opacity: .3

		.ywy_edui_separator
			width: 1px
			height: 20px
			display: inline-block
			background-color: #e7e7eb
			margin: 4px 2px
			vertical-align: middle

	.ywy_edui_toolbar_default
		position: relative
		border: 1px solid transparent
		&:hover
			border-color: #e7e7eb
		.ywy_edui_icon
			display: inline-block
			vertical-align: middle
			background-image: url(/static/ueditor/themes/default/images/ueditor_z29f4d5.png)
			background-repeat: no-repeat
			width: 20px
			height: 20px

	&.ywy_edui_undo .ywy_edui_icon
		background-position: 0 -168px
	&.ywy_edui_redo .ywy_edui_icon
		background-position: 0 -198px
	&.ywy_edui_fontsize .ywy_edui_icon
		background-image: none
	&.ywy_edui_blockquote .ywy_edui_icon
		background-position: 0 -318px
	&.ywy_edui_horizontal .ywy_edui_icon
		background-position: 0 -679px
	&.ywy_edui_removeformat .ywy_edui_icon
		background-position: 0 -890px
	&.ywy_edui_formatmatch .ywy_edui_icon
		background-position: 0 -859px
	&.ywy_edui_bold .ywy_edui_icon
		background-position: 0 -228px
	&.ywy_edui_italic .ywy_edui_icon
		background-position: 0 -258px
	&.ywy_edui_underline .ywy_edui_icon
		background-position: 0 -288px
	&.ywy_edui_fontcolor .ywy_edui_icon
		background-position: 0 -348px
	&.ywy_edui_fontbgcolor .ywy_edui_icon
		background-position: 0 -378px
	&.ywy_edui_indent .ywy_edui_icon
		background-position: 0 -1107px
	&.ywy_edui_justifyleft .ywy_edui_icon
		background-position: 0 -408px
	&.ywy_edui_justifycenter .ywy_edui_icon
		background-position: 0 -438px
	&.ywy_edui_justifyright .ywy_edui_icon
		background-position: 0 -468px
	&.ywy_edui_justifyjustify .ywy_edui_icon
		background-position: 0 -499px
	&.ywy_edui_rowspacingtop .ywy_edui_icon
		background-position: 0 -649px
	&.ywy_edui_rowspacingbottom .ywy_edui_icon
		background-position: 0 -619px
	&.ywy_edui_lineheight .ywy_edui_icon
		background-position: 0 -589px
	&.ywy_edui_orderedlist .ywy_edui_icon
		background-position: 0 -529px
	&.ywy_edui_unorderedlist .ywy_edui_icon
		background-position: 0 -559px
	&.ywy_edui_imagenone .ywy_edui_icon
		background-position: 0 -950px
	&.ywy_edui_imageleft .ywy_edui_icon
		background-position: 0 -980px
	&.ywy_edui_imageright .ywy_edui_icon
		background-position: 0 -1010px		
	&.ywy_edui_imagecenter .ywy_edui_icon
		background-position: 0 -1040px			
</style>
