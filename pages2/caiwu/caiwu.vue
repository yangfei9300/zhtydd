<template>
	<view>
		<view class="colonn">
			<view class="p-all-20 border_bottom" @click.stop="topage(1)">添加打款记录</view>
			<view class="p-all-20 border_bottom" @click.stop="topage(2)">打款记录列表</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			topage(type){
				if(type==1){
					uni.navigateTo({
						url:""
					})
				}else{
					uni.navigateTo({
						url:"/pages3/cwSKlist/cwSKlist"
					})
				}
			}
		}
	}
</script>

<style>
@import url(caiwu.css);
</style>
