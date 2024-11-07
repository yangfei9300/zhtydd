<template>
	<view class="content">  
		<view class="content">
		    <jianweikaifa-sign 
		        @input="getData"   
		        @close="getClose"
		        :title="title"
		        :lineWidth="8" 
		        :disabled="false">              
		    </jianweikaifa-sign>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '请在输入框内签名',
				
				
				
			}
		},
		onLoad() {
   
		},
		methods: {
			getData(res){
				
				// var str=res.replace("data:image/svg+xml;base64,","data:image/png;base64,")
				
				uni.setStorageSync("img",res);
				uni.navigateBack({
					delta:1
				})
			},
			getClose(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
