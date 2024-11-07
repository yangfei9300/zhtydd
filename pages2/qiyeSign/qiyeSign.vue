<template>
	<view>
		<view class="colonn" v-if="hetongInfo">

			<view class="titleleft">合同内容</view>

			<block v-for="(item,index) in booths">
				<view class="roww rowsb border_bottom p-all-20">

					<view class="w-236" style="text-align: left;">展位号：{{item.contentName}}</view>
					<view>{{item.params.hallName}}</view>
					<view class="w-236" style="text-align: center;">{{item.unitPrice}}元</view>

				</view>
			</block>
			<block v-for="(item,index) in services">
				<view class="roww rowsb border_bottom p-all-20">

					<view class="w-236" style="text-align: left;">{{item.params.typeName}}</view>
					<view>{{item.contentName}}</view>
					<view class="w-236" style="text-align: center;">{{item.discount}}元</view>

				</view>
			</block>

			<view class="titleleft">企业信息</view>

			<view class="roww  border_bottom p-all-30">
				<view>企业名称:</view>
				<view class="w-20"></view>
				<view class="w-550">{{hetongInfo.customerName}}</view>
				<view class="allline"></view>
			</view>

			<view class="roww  border_bottom p-all-30">
				<view>企业联系人:</view>
				<view class="w-20"></view>
				<view class="w-550">{{hetongInfo.customerPerson}}</view>
				<view class="allline"></view>
			</view>

			<view class="roww  border_bottom p-all-30">
				<view>手机号:</view>
				<view class="w-20"></view>
				<view class="w-550">{{hetongInfo.customerTel}}</view>
				<view class="allline"></view>
			</view>
			<view class="roww  border_bottom p-all-30">
				<view>负责人签名:</view>
				<view class="w-20"></view>
				<view style="color: blue;" v-if="signImgs[0]==''" @click.stop="toSign(1)">点击签名</view>
				<image v-else :src="signImgs[0]" @load="getSign2($event,1)" class="w-200 sign2" mode="widthFix"></image>
			</view>

			<view class="roww  border_bottom p-all-30">
				<view>电子章:</view>
				<view class="w-20"></view>
				<view style="color: blue;" v-if="zhangSel<0" 
				@click.stop="zhangsAlertClick">点击选择电子章</view>
				<image style="color: blue;" v-else mode="widthFix" 
				class="w-150" @click.stop="zhangsAlertClick"
					:src="zhangList[zhangSel].imageCode"></image>
			</view>


			<view class="titleleft">业务员信息</view>

			<view class="roww  border_bottom p-all-30">
				<view>姓名:</view>
				<view class="w-20"></view>
				<view class="w-550">{{hetongInfo.params.nickName}}</view>
				<view class="allline"></view>
			</view>
			<!-- <view class="roww  border_bottom p-all-30">
				<view>业务员电话:</view>
				<view class="w-20"></view>
				<view class="w-550">李先生</view>
				<view class="allline"></view>
			</view> -->
			
			<!-- <view class="roww  border_bottom p-all-30">
				<view>部门:</view>
				<view class="w-20"></view>
				<view class="w-550">李先生</view>
				<view class="allline"></view>
			</view> -->

			<view class="roww  border_bottom p-all-30">
				<view>业务员签名:</view>
				<view class="w-20"></view>
				<block v-if="hetongInfo.status!=3">
					<view v-if="signImgs[1]==''" style="color: blue;" @click.stop="toSign(2)">点击签名</view>
					<!-- <view v-else style="color: blue;" @click.stop="toSign(2)">点击签名</view> -->
					<image v-else :src="signImgs[1]" @load="getSign2($event,2)" @click.stop="toSign(2)"
						class="w-200 sign2" mode="widthFix"></image>
				</block>
				<block v-else>
					<view style="color:blue;">已签名</view>
				</block>


			</view>
			<!-- <view class="roww  border_bottom p-all-30">
				<view>电子章:</view>
				<view class="w-20"></view>
				<view style="color: blue;">点击选择电子章</view>
			</view> -->
			<view class="titleleft">相关文件</view>
			<view class="roww  border_bottom p-all-30">
				<view>文件:</view>
				<view class="w-20"></view>
				<view class="w-550" style="color: blue;" 
				@click.stop="openFile(hetongInfo.file)">查看文件</view>
				<view class="allline"></view>
			</view>

			<view class="titleleft">打款计划</view>

			<view class="colonn" v-for="(item,index) in payPlans">
				<view class="roww  border_bottom p-all-30">
					<view>第{{index+1}}笔打款金额:</view>
					<view class="w-20"></view>
					<view class="w-550">￥{{item.payAmount}}</view>
					<view class="allline"></view>
				</view>
				<view class="roww  border_bottom p-all-30">
					<view>第{{index+1}}笔打款日期:</view>
					<view class="w-20"></view>
					<view class="w-550">{{item.planTime}}</view>
					<view class="allline"></view>
				</view>
				<view style="border:1px solid #E60121;margin:10rpx 30rpx;"></view>
			</view>
			<view class="h-30 "></view>

			<view class="roww center_center">
				<view class="btrn1" @click.stop="toSubmit">提交合同</view>
			</view>
			<view class="h-30 "></view>
		</view>
		
		<!-- 章列表 zhangList   -->
		<view class="colonn huuibeijing" v-if="zhangsAlert">
			<view class="bottomzhangview colonn">
				<view class="roww rowsb h-100" style="line-height: 100rpx;padding:0rpx 30rpx;">
					<view class="yincang1">关闭</view>
					<view>章列表</view>
					<view style="color: #000000;font-weight: bold;" @click.stop="zhangsAlertClick">关闭</view>
				</view>
				<scroll-view class="colonn h-650" scroll-y>
					<view class="colonn">
						<view class="roww p-all-30 border_bottom" v-for="(item,index) in zhangList">
							<view>{{index+1}}.</view>
							<view>{{item.name}}</view>
							<view class="allline"></view>
							<view style="color: #E60121;" @click.stop="zhangShowAlertClick(index)">查看</view>
							<view class="w-30"></view>

							<view style="color: green;" v-if="zhangSel==index">已选用</view>
							<view class="fw-800" style="color: #E60121;" 
							v-else @click.stop="selClick(item,index)">选用
							</view>

						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="colonn huuibeijing center_center" v-if="zhangShowAlert">
			<image :src="zhangList[zhangShowIndex].imagePath" class="w-400" mode="widthFix"></image>
			<view class="h-50"></view>
			<image @click.stop="zhangShowAlertClick" src="/static/guanbi.png" class="w-60 h-60"></image>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: {},
				signType: 1, //1是企业负责人2.业务负责人
				form: {
					"userId": "",
					"exhibitorId": "",
					"recruitId": "",
					"tempUrl": "",
					"list": [{
						"id": "",
						"keyWord": "",
						"imageCode": "",
						"width": "",
						"height": "",
						"xOffset": "",
						"yOffset": ""
					}]
				},
				signImgs: ['', ''],

				signImgsInfos: [{
					'width': 200,
					'height': 110
				}, {
					'width': 200,
					'height': 110
				}],
				zhangList: [], //章列表
				zhangsAlert: false,
				zhangShowAlert: false,
				hetongInfo: null,

				booths: [], //展位列表
				services: [], //服务列表
				payPlans: [], //打款计划
				zhangSel: -1, //选择的章下标
				zhangShowIndex: -1, //显示章下标

				identityType: '',
			}
		},
		onLoad(options) {

			var identityType = this.identityType;
			this.identityType = parseInt(identityType);

			uni.removeStorageSync("img");
			this.options = options;
			this.getGeHetongInfo();
		},
		onShow() {
			this.signImgs[this.signType - 1] = uni.getStorageSync("img");
			this.$forceUpdate();
		},
		methods: {
			openFile(file) {
				wx.downloadFile({
					// 示例 url，并非真实存在
					url: file,
					success: function(res) {
						console.log(res)
						const filePath = res.tempFilePath
						wx.openDocument({
							filePath: filePath,
							showMenu: true,
							success: function(res) {
								console.log('打开文档成功')
							}
						})
					}
				})
			},
			selClick(item, index) {
				this.zhangSel = index;
			},
			// 章对话框点击事件
			zhangsAlertClick() {
				this.zhangsAlert = !this.zhangsAlert;
			},
			// 章显示图片对话框
			zhangShowAlertClick(index) {
				if (index >= 0) {
					this.zhangShowIndex = index;
				}
				this.zhangShowAlert = !this.zhangShowAlert;
			},
			// 获取章列表
			getZhang() {
				var data = {
					'pageSize': '100',
					'pageNum': '1',
					'exhibitorId': this.hetongInfo.exhibitorId
				}
				this.$axios
					.axios('get', this.$paths.seallist, data)
					.then((res) => {
						if (res.code == 200) {
							console.log("邀请人数据", res);
							this.zhangList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 获取签名大小
			getSign2(res, index) {
				var _this = this;
				const query = uni.createSelectorQuery().in(this);
				query.select('.sign2').boundingClientRect(data => {
					this.signImgsInfos[index - 1] = {
						'width': data.width,
						'height': data.height
					};
				}).exec();
			},
			toSubmit() {
				if (!this.isSubmit()) {
					return false;
				}
				var data = this.form;

				this.$axios
					.axios('POST', this.$paths.customercontractstamp, data)
					.then((res) => {
						if (res.code == 200) {
							this.$tools.showToast("签字完成");
							setTimeout(res => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			isSubmit() {
				if (this.signImgs[0] == '') {
					this.$tools.showToast("请先签名");
					return false;
				}
				if (this.zhangSel < 0) {
					this.$tools.showToast("请选择电子章");
					return false;
				}
				// 整合签字
				var signs = {
					"id": "",
					"keyWord": "乙方负责人（签章）",
					"imageCode": this.signImgs[0],
					'width': 80,
					'height': 60,
					'x': -10,
					'y': -20,
				}
				this.form.list = [signs];
				// 整合电子章
				var zhang = {
					"id": "",
					"keyWord": "乙方（盖章）",
					"imageCode": this.zhangList[this.zhangSel].imageCode,
					'width': 125,
					'height': 125,
					'x': 0,
					'y': -50,
				}
				this.form.list.push(zhang);
				return true;
			},
			// 去签名
			toSign(type) {
				this.signType = type;
				uni.navigateTo({
					url: "/pages1/signView/signView"
				})
			},
			// 获取合同详情
			getGeHetongInfo() {
				this.$axios
					.axios('get', this.$paths.customercontractinfo + this.options.id, {})
					.then((res) => {
						if (res.code == 200) {
							this.hetongInfo = res.data.data;
							if (this.hetongInfo.params.booths) {
								this.booths = this.hetongInfo.params.booths
							}
							if (this.hetongInfo.params.service) {

								this.services = this.hetongInfo.params.service;

							}
							if (this.hetongInfo.params.payPlans) {
								this.payPlans = this.hetongInfo.params.payPlans
							}
							console.log("合同详情", this.hetongInfo);
							var form = this.form;

							form.userId = uni.getStorageSync("userInfo").id;

							form.exhibitorId = this.hetongInfo.exhibitorId;
							form.recruitId = this.options.id;
							form.tempUrl = this.hetongInfo.file;
							this.form = form;
							this.getZhang();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			}
		}
	}
</script>

<style>
	@import url(yewuyuanQianzhang.css);
</style>