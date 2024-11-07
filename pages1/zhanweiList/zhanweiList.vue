<template>
	<view>
		
		<!-- <view class="roww rowsa p-all-20">
			<picker :range="zgList" range-key="galleryName">
				<view v-if="zgIndex<0">选择展馆</view>
				<view v-else>{{zgList[zgIndex].galleryName}}</view>
			</picker>
			<picker :range="ztList">
				<view>展厅</view>
			</picker>
		</view>
		 -->
		
		<view class="roww center_center" 
		style="padding:25rpx 20rpx;">
			<input
			class="allline"
			placeholder="请输入展位号" />
			<view class="w-25"></view>
			<view class="sousuobtn">搜索</view>
		</view>
		
		<view class="colonn">
			<view class="roww rowsa p-all-20 border_bottom" 
			style="text-align: center;background-color: #f5f5f5;">
				<view class="allline w-250 huanha">馆名称</view>
				<view class="allline w-250 huanha">展位号</view>
				<view class="allline w-250 huanha">状态</view>
			</view>
			<view class="roww rowsa p-all-20 border_bottom" style="text-align: center;"
			>
				<view class="allline w-250 huanha">1号馆</view>
				<view class="allline w-250 huanha">AT001号馆</view>
				<view class="allline w-250 huanha">已售出</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zgList:[],//展馆列表
				zgIndex:-1,
				ztList:[],//展厅列表
				ztIndex:-1,
			}
		},
		onLoad() {
			this.getZts();
		},
		methods: {
			// 获取展厅
			getZts(){
				var data = {
					exhId: uni.getStorageSync('exhId'),
					pageSize:'100',
					pageNum:1,
				};
				this.$axios
					.axios('get', this.$paths.boothhalllist, data)
					.then((res) => {
						if (res.code == 200) {
							this.ztList = res.rows;
							if(this.ztList.length>0){
								this.ztIndex=0;
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			
		}
	}
</script>

<style>
	@import url(zhanweiList.css);
</style>