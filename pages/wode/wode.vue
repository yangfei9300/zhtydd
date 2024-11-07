<template>
	<view>
		<view class="colonn">
			<view class="topview colonn">
				<view class="roww center_center p-all-50" v-if="userInfo">
					<image src="/static/furuide.jpg" class="w-100 h-100"
					style="border-radius: 50%;"
					 v-if="identityType!=1"
					></image>
					<!-- <view class="w-25"></view> -->
					<view class="w-20"></view>
					<view class="fs-50" style="color: white;"
					v-if="identityType==1"
					>{{userInfo.name}}</view>
					<view class="fs-35" style="color: white;"
					v-if="identityType==2"
					>{{userInfo.nickName}}</view>
					<view class="allline" v-if="identityType!=1"></view>
				</view>
				<view class="roww center_center p-all-50 m-top-20" v-else
				@click.stop="toOutLogin"
				>
					<view class="fs-30" style="color: white;">请先登录</view>
				</view>
			</view>
			
			
			
			<view class="colonn background1 w-710 menuview" 
			
			>
			
			
				<block v-if="isCaiwu<12">
					<view class="roww  border_bottom"
					style="padding:30rpx 25rpx;"
					@click.stop="toUpdateInfo"
					>
						<view>个人信息</view>
						<view class="allline"></view>
						<image src="../../static/youjiantou1.png" class="w-40 h-40"></image>
					</view>
					<!-- <view class="roww  border_bottom"
					style="padding:30rpx 25rpx;"
					@click.stop="touqiye"
					v-if="identityType==1"
					>
						<view>完善企业信息（需要电子章）</view>
						<view class="allline"></view>
						<image src="../../static/youjiantou1.png" class="w-40 h-40"></image>
					</view> -->
					<view class="roww  border_bottom"
					style="padding:30rpx 25rpx;"
					@click.stop="todianzizhang"
					v-if="identityType==1"
					>
						<view>管理电子章</view>
						<view class="allline"></view>
						<image src="../../static/youjiantou1.png" class="w-40 h-40"></image>
					</view>
					<view class="roww  border_bottom"
					style="padding:30rpx 25rpx;"
					@click.stop="toHt"
					>
						<view>合同管理</view>
						<view class="allline"></view>
						<image src="../../static/youjiantou1.png" class="w-40 h-40"></image>
					</view>
				</block>
				
				
				
				<view class="roww  border_bottom"
				style="padding:30rpx 25rpx;"
				@click.stop="todakuan" v-if="identityType!=1"
				>
					<view>打款记录</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou1.png" class="w-40 h-40"></image>
				</view>
				
				
				
				
				
				
				<!-- <view class="roww  border_bottom"
				style="padding:30rpx 25rpx;"
				@click.stop="toaddKuan" 
				>
					<view>添加打款记录</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou1.png" class="w-40 h-40"></image>
				</view> -->
				
				
				<view class="roww  border_bottom"
				style="padding:30rpx 25rpx;"
				@click.stop="toOutLogin"
				>
					<view>退出登录</view>
					<view class="allline"></view>
					<image src="../../static/youjiantou1.png" class="w-40 h-40"></image>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:null,
				identityType:null,//1是企业2是业务员
				isCaiwu:-1,
			}
		},
		onLoad() {
			var identityType=uni.getStorageSync("identityType");
			if(identityType){
				this.identityType=identityType;
			}
			var userInfo=uni.getStorageSync("userInfo");
			if(userInfo){
				this.userInfo=userInfo;
			}
			console.log("用户信息",userInfo)
			
			
			
			
			
		},
		methods: {
			toaddKuan(){
				uni.navigateTo({
					url:"/pages2/fukuanAdd/fukuanAdd"
				})
			},
			// 打款记录  
			todakuan(){
				uni.navigateTo({
					url:"/pages2/fukuanjilu/fukuanjilu"
				})
			},
			// 修改个人信息
			toUpdateInfo(){
				uni.navigateTo({
					url:"/pages2/updateUserInfo/updateUserInfo"
				})
			},
			// 前往签字章
			todianzizhang(){
				uni.navigateTo({
					url:"/pages1/chapterList/chapterList"
				})
			},
			// 修改企业信息
			touqiye(){
				uni.navigateTo({
					url:"/pages1/updateQiye/updateQiye"
				})
			},
			// 退出登录
			toOutLogin(){
				uni.clearStorageSync();
				uni.navigateTo({
					url:"/pages/login/login"
				})  
			},
			// 前往合同列表
			toHt(){
				uni.navigateTo({
					url:"/pages1/hetongList/hetongList"
				})
			}
		}
	}
</script>

<style>
@import url(wode.css);
</style>
