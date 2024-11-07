<template>
	<view>
		<!-- <view class="roww w-750">
			<v-tabs style="width: 750rpx;"
			  v-model="activeTab"
			  :scroll="false"
			  :tabs="['全部', '进行中', '已完成']"
			></v-tabs>
		</view>   -->
		<view class="colonn w-750  h-1500">
			<view class="colonn background1 br-20 m-w-710 m-all-20  b-all-20" @click.stop="toinfo"
				v-for="(item,index) in htList">
				<view class="roww border_bottom p-all-20 fs-30">
					<view>{{item.id}}</view>
					<view class="allline"></view>
					<view class="roww">
						<block v-if="item.status=='0'">
							未初始化
						</block>
						<block v-if="item.status=='1'||item.status=='2'">
							已生成文件
						</block>
						<block v-if="item.status=='3'">
							业务员已签字
						</block>
						<block v-if="item.status=='4'">
							企业已签字
						</block>
					</view>
				</view>
				<view class="h-10"></view>
				<view class="roww   fs-30" style="padding:10rpx 20rpx;">
					<view>企业：{{item.customerName}}</view>
				</view>
				<view class="roww  p-all-20 fs-30" style="padding:10rpx 20rpx;">
					<view>签订金额：￥{{item.totalRmb}}</view>
				</view>
				<view class="roww  p-all-20 fs-30" style="padding:10rpx 20rpx;">
					<view>所属业务员：{{item.params.nickName}}</view>
				</view>
				<view class="roww">
					<view class="allline"></view>

					<block v-if="identityType==2">
						<view class="chakaninfo" v-if="item.status==0" @click.stop="clickHt(item)">生成合同</view>
						<view class="chakaninfo" v-if="item.status==1||item.status==2" @click.stop="toQySign(item)">签字
						</view>
					</block>
					<block v-if="identityType==1">
						<view class="chakaninfo" v-if="item.status==3" @click.stop="toQySign(item)">签字</view>
					</block>
					<view class="chakaninfo" @click.stop="toInfo(item)">查看详情</view>
					<view class="w-20"></view>
				</view>
				<view class="h-15"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0,
				current: 0,
				tabs: [

				],
				htList: [], //合同列表
				statusStr: [''],
				identityType: 1, //1是企业2是业务员
			}
		},
		onShow() {
			var identityType = uni.getStorageSync("identityType");
			this.identityType = identityType;
			if (identityType == 1) {
				this.getHetongList();
			} else {
				this.getYewuyuanHt();
			}
		},
		methods: {
			toInfo(item) {
				uni.navigateTo({
					url: "/pages1/hetongInfo/hetongInfo?id=" + item.id,
				})
			},
			// 企业去签字
			toQySign(item) {
				var identityType = parseInt(uni.getStorageSync("identityType"));
				if (identityType == 1) {
					uni.redirectTo({
						url: "/pages2/qiyeSign/qiyeSign?id=" + item.id
					})
				} else if (identityType == 2) {
					uni.redirectTo({
						url: "/pages2/yewuyuanQianzi/yewuyuanQianzi?id=" + item.id
					})
				}
			},
			// 点击合同
			clickHt(item) {
				uni.showModal({
					title: "提示",
					content: "确实要生成文件吗？",
					success: (res) => {
						if (res.confirm) {
							this.toNewHetong(item);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			// 生成合同文件
			toNewHetong(item) {
				var data = {
					id: item.id + ""
				}
				this.$axios
					.axios('post', this.$paths.staffcontractgenerate, data)
					.then((res) => {
						if (res.code == 200) {
							this.$tools.showToast("文件生成成功");
							// 业务员签字界面
							setTimeout(res => {
								uni.redirectTo({
									url: "/pages2/yewuyuanQianzi/yewuyuanQianzi?id=" + data.id
								})
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},

			// 业务员合同列表
			getYewuyuanHt() {
				var data = {
					'pageSize': '1000',
					'pageNum': '1',
					'searchValue': '1', //1本人，2全部
				}
				this.$axios
					.axios('get', this.$paths.staffcontractlist, data)
					.then(res => {
						if (res.code == 200) {
							this.htList = res.rows;
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 企业合同列表
			getHetongList() {
				var data = {
					'pageSize': '1000',
					'pageNum': '1',
					'exhibitorId': '',
					// 'exhId':'149',  
				}
				var userInfo = uni.getStorageSync("userInfo");
				if (!userInfo) {
					this.$tools.showToast("请先登录");
					return false;
				}
				data.exhibitorId = userInfo.exhibitorId;
				this.$axios
					.axios('get', this.$paths.contractlist, data)
					.then(res => {
						if (res.code == 200) {
							this.htList = res.rows;
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			toinfo() {
				uni.navigateTo({
					url: "/pages1/hetongInfo/hetongInfo"
				})
			}
		}
	}
</script>

<style>
	@import url(hetongList.css);
</style>