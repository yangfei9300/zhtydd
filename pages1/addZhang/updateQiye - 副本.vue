<template>
	<view>
		<view class="colonn">
			<view class="roww border_bottom" style="padding:30rpx 30rpx;">
				<view>企业名称</view>
				<view class="w-30"></view>
				<input class="allline" placeholder="请输入企业名称" />
			</view>
			<view class="roww border_bottom" style="padding:30rpx 30rpx;">
				<view>联系人姓名</view>
				<view class="w-30"></view>
				<input class="allline" placeholder="请输入联系人姓名" />
			</view>
			<view class="roww border_bottom" style="padding:30rpx 30rpx;">
				<view>联系人电话</view>
				<view class="w-30"></view>
				<input class="allline" placeholder="请输入联系人电话" />
			</view>
			<view class="roww border_bottom" style="padding:30rpx 30rpx;">
				<view>电子章</view>
				<view class="w-30"></view>
				<view class="w-500 huanhang">
					<image v-for="(item,index) in 3"
					src="../../static/logo.png"  
					class="w-150 h-150 p-right-20 p-bottom-20"
					></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					'name':'',
					'exhibitor_id':'',
					'imagePath':'',
					'imagePode':''
				}
			}
		},
		methods: {
			
			toAddZhang(){
				var data={
					
				}
				this.$axios
					.axios('POST', this.$paths.customersealadd, this.form)
					.then(res => {
						if(res.code==200){
							this.$tools.showToast("登录成功")
							uni.setStorageSync("userInfo",res.data);
							setTimeout(res=>{
								uni.reLaunch({
									url:"/pages/index/index"
								})
							},1000)
						}else{
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			
			touploadimg(){
				
			},
		}
	}
</script>

<style>
@import url(updateQiye.css);
</style>
