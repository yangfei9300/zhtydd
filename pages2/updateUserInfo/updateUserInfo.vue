<template>
	
	<view>
		<view class="roww p-all-30 border_bottom">
			<view class="w-130">姓名</view>
			<view class="w-20"></view>
			<view v-if="identityType==1">{{userInfo.name}}</view>
			<view v-if="identityType==2">{{userInfo.nickName}}</view>
		</view>
		<view class="roww p-all-30 border_bottom">
			<view class="w-130">手机号</view>
			<view class="w-20"></view>
			<view v-if="identityType==1">{{userInfo.phone}}</view>
			<view v-if="identityType==2">{{userInfo.phonenumber}}</view>
		</view>
		<view class="roww p-all-30 border_bottom"  v-if="identityType==2">
			<view class="w-130">部门名称</view>
			<view class="w-20"></view>
			<view class="w-500">{{userInfo.dept.deptName}}</view>
		</view>
		
		
		<!-- <view class="h-70"></view>
		<view class="roww center_center w-750" >
			<view class="btrn1" >修改信息</view>
		</view>
		 -->
		
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				userInfo:null,
				identityType:1,
			}
		},
		onLoad() {
			var identityType=uni.getStorageSync("identityType");
			
			this.userInfo=uni.getStorageSync("userInfo")
		},
		methods: {
			
		}
	}
</script>

<style>
@import url(updateUserInfo.css);
</style>
