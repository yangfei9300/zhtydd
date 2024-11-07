<template>
	<view>
		
		<view class="colonn">
			<view class="roww border_bottom center_center p-all-30" 
			v-for="(item,index) in zhangList">
				<view>{{item.name}}</view>
				<view class="allline"></view>
				<image :src="item.imageCode" @click.stop="showimg(item.imageCode)" class="w-70 h-70"></image>
				<view class="w-30"></view>
				<view class="btncli" style="color: blue;" @click.stop="showimg(item.imageCode)">查看</view>
				<view class="w-50"></view>
				<view class="btncli" @click.stop="delzhang(item)">删除</view>
			</view>
			<view class="roww m-top-50 center_center" 
			v-if="zhangList.length<=0">
				<view>暂未上传章</view>
			</view>
		</view>
		
		<view class="h-200"></view>
		<view class="roww center_center w-750" style="position: fixed;bottom: 100rpx;">
			<view class="btrn1" @click.stop="toadd">新增章</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zhangList: [],
			}
		},
		onShow() {
			this.getChapterList();
		},
		methods: {
			delzhang(item){
				var data = {
					'id': item.id,
					'exhibitor_id':''
				}
				var userInfo = uni.getStorageSync("userInfo");
				if (!userInfo) {
					this.$tools.showToast("请先登录");
					return false;
				}
				data.exhibitorId = userInfo.exhibitorId;
				this.$axios
					.axios('post', this.$paths.customersealdel, data)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("删除成功");
							setTimeout(res=>{
								this.getChapterList();
							},1000)
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			showimg(img) {
				uni.previewImage({
					urls: [img],
					longPressActions: {

					}
				});
			},
			// 添加章
			toadd() {
				uni.navigateTo({
					url: "/pages1/addZhang/addZhang"
				})
			},
			getChapterList() {
				var data = {
					'pageSize': '1000',
					'pageNum': '1',
					'exhibitorId': ''
				}
				var userInfo = uni.getStorageSync("userInfo");
				if (!userInfo) {
					this.$tools.showToast("请先登录");
					return false;
				}
				data.exhibitorId = userInfo.exhibitorId;
				this.$axios
					.axios('get', this.$paths.seallist, data)
					.then(res => {
						if (res.code == 200) {
							this.zhangList = res.rows;
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
		}
	}
</script>

<style>
	.btncli {
		font-size: 30rpx;
		color: red;
		font-weight: bold;
	}

	.btrn1 {
		width: 650rpx;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		background: linear-gradient(90deg, #FF5044, #E60121);
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(254, 76, 66, 0.56);
		border-radius: 45rpx;
		color: white;
	}
</style>