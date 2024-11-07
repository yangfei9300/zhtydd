<template>
	<view>
		<view class="colonn">
			
			<view class="colonn">
				<view class="roww  border_bottom" style="padding:30rpx 30rpx;"
				>
					<view class="allline"style="text-align: left;">姓名</view>
					<view class="allline"  style="text-align: right;">金额</view>
				</view>
				<block v-if="type==1">
					<view class="roww  border_bottom" style="padding:30rpx 30rpx;"
					v-for="(item,index) in paihangWeek"
					>
						<view class="allline"style="text-align: left;">{{index+1}}：{{item.params.nickName}}</view>
						<view class="allline"  style="text-align: right;">{{item.params.yishou}}元</view>
					</view>
					
					<view class="roww center_center m-top-30" 
					v-if="paihangWeek.length<=0">
						<view>暂无数据</view>
					</view>
					
				</block>
				<block v-if="type==2">
					<view class="roww  border_bottom" style="padding:30rpx 30rpx;"
					v-for="(item,index) in paihangMonth"
					>
						<view class="allline"style="text-align: left;">{{index+1}}：{{item.params.nickName}}</view>
						<view class="allline"  style="text-align: right;">{{item.params.yishou}}元</view>
					</view>
					
					<view class="roww center_center m-top-30" 
					v-if="paihangMonth.length<=0">
						<view>暂无数据</view>
					</view>
					
				</block>
				
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,
				paihangMonth:[],
				paihangWeek:[],
			}
		},
		onLoad(options) {
			if(options.type){
				this.type=options.type;
			}
			if(options.type==1){
				uni.setNavigationBarTitle({
					title:"周到账排行"
				})
			}else if(options.type==2){
					uni.setNavigationBarTitle({
						title:"月到账排行"
					})
			}
			this.infosaleranking();
		},
		methods: {
			// 到账排行
			infosaleranking(){
				var data = {
					'exhId':uni.getStorageSync("exhId")
				};
				this.$axios
					.axios('POST', this.$paths.infosaleranking, data)
					.then((res) => {
						if (res.code == 200) {
							console.log("到账排行",res);
							
							this.paihangMonth=res.thisMonth;
							this.paihangWeek=res.thisWeek;
							this.tiaoxuTiao(this.paihangMonth,this.paihangWeek);
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {
						console.log(err)
					});
			},
			tiaoxuTiao(paihangMonth,paihangWeek){
				
				this.paihangMonth=paihangMonth.sort((a, b) => b.yishou - a.yishou);
				this.paihangWeek=paihangWeek.sort((a, b) => b.yishou - a.yishou);
				
			},
			
			
			
		}
	}
</script>

<style>
@import url(daozhangPaihang.css);
</style>
