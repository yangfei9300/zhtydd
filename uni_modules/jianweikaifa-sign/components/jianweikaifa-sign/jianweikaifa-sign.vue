<template>
	<view class="signature-wrap">
		<view class="signature-contain">
			<view class="signature-main" style="z-index: 3000;">
				<view class="signature-title"><text v-for="t in titles">{{t}}</text></view>
				<canvas ref="mycanvas" disable-scroll="true" class="signature" :class="cid" canvas-id="cvs" @touchstart="touchstart"
					@touchmove="touchmove" @touchend="touchend"></canvas>
				<view class="signature-btns">
					<view class="btn btn-clear cu-btn bg-main margin-tb-sm text-white"
					 @tap="close()"
					 style="color: black;">
						<text>取</text><text>消</text>
					</view>
					<view class="btn btn-clear cu-btn bg-main margin-tb-sm text-white"
					style="color: black;"
					 @tap="clearSignature()">
						<text>重</text><text>新</text><text>填</text><text>写</text>
					</view>
					<view class="btn btn-ok cu-btn bg-main margin-tb-sm text-white" @tap="onOK()">
						<text>确</text><text>定</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var _utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}

	let base64encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
	export default {
		cxt: null,
		name:"jianweikaifa-sign",
		data() {
			return {
				VERSION: '1.0.0',
				cid: 'cvs',
				show: true,
				ctrl: null,
				listeners: [],
				prevView: '',

				draws: [],
				lines: [],
				line: null,
			};
		},
		props: {
			value: {
				default: '',
			},
			title: {
				type: String,
				default: '请在输入框内签名',
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			lineWidth:{
				type: Number,
				default: 3,
			}
			
		},
		watch: {
			value() {
				this.prevView = this.value;
			}
		},
		computed: {
			titles() {
				return this.title.split('')
			}
		},
		mounted() {
			this.prevView = this.value;
			this.touchSignature()
			this.showSignature()
			// this.$emit("kg",{width:this.$refs.mycanvas.$el.clientWidth,height:this.$refs.mycanvas.$el.clientHeight})
			console.log('dx');
		},
		methods: {
			onOK() {
				let data = this.ctrl.getValue();
				this.$emit('input', data);
				// console.log(data)
				this.prevView = data;
				this.hideSignature();
				let f = this.listeners.shift();
				if (f) {
					f(data);
				}
			},
			touchSignature() {
				let sig = this.prevView
				if (!sig || !sig.length) {
					this.showSignature()
				}
			},
			showSignature() {
				if (this.disabled)
					return;
				if (!this.ctrl) {
					this.initCtrl();
				} else if (!this.show) {
					this.clearSignature();
					this.show = true;
				}
			},
			close(){
				this.$emit("close",true)
			},
			async getSyncSignature() {
				this.showSignature();
				return await new Promise(async (resolve, reject) => {
					this.listeners.push((res) => {
						resolve(res);
					});
				});
			},
			cancelSignature() {
				this.listeners.map((f) => {
					f(null);
				})
				this.hideSignature();
			},
			hideSignature() {
				this.ctrl && this.ctrl.clear();
				this.show = false;
			},
			clearSignature() {
				this.ctrl && this.ctrl.clear();
			},
			async initCtrl() {
				this.show = true;
				let cxt = uni.createCanvasContext(this.cid, this);
				this.cxt = cxt;
				// cxt.clearRect(0,0,c.width,c.height);
				this.ctrl = {
					width: 0,
					height: 0,
					clear: () => {
						this.lines = [];
						let info = uni.createSelectorQuery().in(this).select("." + this.cid);
						info.boundingClientRect((data) => {
							if (data) {
								cxt.clearRect(0, 0, data.width, data.height);
								if (data.width && data.height) {
									this.ctrl.width = data.width;
									this.ctrl.height = data.height;
								}
							}
						}).exec();
						this.redraw();
					},
					getValue: () => {
						if (!this.lines.length)
							return '';
						let svg = this._get_svg();
						// new Buff
						let b64 = base64encode(svg);
						let data = 'data:image/svg+xml;base64,' + b64;
						
						// console.log(svg);
						// console.log(data);
						return data;
					},
				};
				this.$nextTick(function() {
					this.ctrl.clear();
				})
			},
			_get_svg() {
				let r = -90;
				let paths = [];
				let raww = this.ctrl.width;
				let rawh = this.ctrl.height;
				let width = Math.abs(r) != 90 ? raww : rawh;
				let height = Math.abs(r) == 90 ? raww : rawh;
				let cx = raww / 2;
				let cy = rawh / 2;
				let PI = Math.PI;
				let R = (r || 0) % 360;
				let cosv = Math.cos(R * PI / 180);
				let sinv = Math.sin(R * PI / 180);
				let dcx = (width - raww) / 2;
				let dcy = (height - rawh) / 2;
				let trans = function(p) {
					if (!R) {
						return p;
					} else {
						let nx = (p.x - cx) * cosv - (p.y - cy) * sinv + cx;
						let ny = (p.x - cx) * sinv + (p.y - cy) * cosv + cy;
						return {
							x: nx + dcx,
							y: ny + dcy
						};
					}
					return p;
				}
				this.lines.map(l => {
					if (l.points.length < 2) {
						return;
					}
					let sp = trans(l.start)
					let pts = [`M ${sp.x} ${Number(sp.y)}`];
					l.points.map(p => {
						let np = trans(p)
						pts.push(`L ${np.x} ${Number(np.y)}`);
					});
					paths.push(
						`<path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="rgb(0,0,0)" fill="none" d="${pts.join(' ')}"/>`
					);
				})
				let svg =
					`<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}" height="${height}">${paths.join('\n')}</svg>`;
				return svg;
			},
			_get_svg_raw() {
				let paths = [];
				this.lines.map(l => {
					if (l.points.length < 2) {
						return;
					}
					let pts = [`M ${l.start.x} ${Number(l.start.y)}`];
					l.points.map(p => {
						pts.push(`L ${p.x} ${Number(p.y)}`);
					});
					paths.push(
						`<path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="rgb(0,0,0)" fill="none" d="${pts.join(' ')}"/>`
					);
				})
				let width = this.ctrl.width;
				let height = this.ctrl.height;
				let svg =
					`<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}" height="${height}" transform="rotate(-90)">${paths.join('\n')}</svg>`;
				return svg;
			},
			_get_point(e) {
				return {
					x: e.changedTouches[0].x.toFixed(1),
					y: e.changedTouches[0].y.toFixed(1),
				}
			},
			touchstart(e) {
				let p = this._get_point(e);
				this.line = {
					start: p,
					points: [p],
				}
				this.lines.push(this.line);
			},
			touchmove(e) {
				let p = this._get_point(e);
				this.line.points.push(p)
				if (!this.tm) {
					this.tm = setTimeout(() => {
						this.redraw();
						this.tm = 0;
					}, 10)
				}
			},
			touchend(e) {
				let p = this._get_point(e);
				this.line.points.push(p)
				this.line.end = p
				this.redraw()
			},
			redraw() {
				let cxt = this.cxt;
				cxt.setStrokeStyle("#000");
				cxt.setLineWidth(this.lineWidth);
				var last = null;
				this.lines.map(l => {
					cxt.beginPath();
					if (l.points.length < 2) {
						return;
					}
					cxt.moveTo(l.start.x, l.start.y);
					l.points.map(p => {
						cxt.lineTo(p.x, p.y)
					})
					cxt.stroke()
				})

				cxt.draw()
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			}
		}
	}
</script>

<style lang="scss">
	.signature-wrap {
		height: 100%;
		width: 100%;
		// padding: 0 5px;

		// min-width: 60vw;
		.img-wrap {
			width: 100%;
			min-height: 200rpx;
			display: flex;
			align-items: center;
			text-align: center;
			align-content: center;
			justify-content: center;

			image {
				width: 100%;
			}

			// background: red;
		}
	}

	.signature-contain {
		width: 100%;

		.signature-main {
			background: white;
			flex-direction: row-reverse;
			display: flex;
			align-items: stretch;
			height: 101%;
			overflow: scroll;
		}

		.signature-title {
			font-size: 28rpx;
			display: flex;
			padding: 20rpx;
			flex-direction: column;
			justify-content: left;
			height: 100rpx;
			text {
				transform: rotate(90deg);
			}
		}

		.signature {
			margin: 10px 0;
			// #ifdef MP-WEIXIN | MP-ALIPAY
			width: 75vw;
			height: 95vh;
			// #endif
			
			// #ifdef H5
			width: 90vw;
			height: 90vh;
			// #endif
			
			align-self: center;
			background-color: #F1F1F1;
			// pointer-events:none;
		}

		.signature-btns {
			display: flex;    
				// #ifdef MP-WEIXIN 
			padding: 20rpx 20rpx 20rpx 130rpx;
			// #endif
			
			//#ifndef
			padding: 20rpx ;
			// #endif
			
			align-items: center;  
			justify-content: space-around;
			// margin-right: 5px;
			flex-direction: column;

			.btn {
				flex-shrink: 0;
				padding: 50rpx 20rpx;
				font-size: 14px;
				margin: 0;
				text-align: center;
				text-decoration: none;
				height: 200rpx;
				display: flex;
				border: 1px solid #eee;
				border-radius: 10rpx;
				align-content: center;
				justify-content: center;
				flex-direction: column;

				text {
					transform: rotate(90deg);
				}

				&+.btn {
					border-top: 1px solid #eee;
				}

				&.btn-clear {
					// background-color: #fc2a07;
					flex-basis: 100rpx;
				}

				&.btn-cancel {
					// background-color: #eff4f4;
					color: $uni-color-warning;
				}

				&.btn-ok {
					// background-color: $uni-color-success;
					background-color: #007AFF;
					// width: 80rpx;
					color: #fff;
				}
			}
		}
	}
</style>
