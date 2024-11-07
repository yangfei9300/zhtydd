<template>
	<view>
		<view class="colonn">
			<view class="colonn">
				<view class="roww  border_bottom" style="padding:30rpx 30rpx;" v-if="type==1"
				>
					<view class="allline">姓名</view>
					<view class="allline"  style="text-align: center;">金额 <text class="fs-25" style="color:red;">(服务展位总和)</text>  </view>
					<view class="allline" style="text-align: right;">标展/个</view>
				</view>
				<view class="roww  border_bottom" style="padding:30rpx 30rpx;" v-if="type==1"
				v-for="(item,index) in weeksArea" 
				>
					<view class="allline">{{index+1}}：{{item.nickName}}</view>
					<view class="allline"  style="text-align: center;">{{item.zongjine}}元</view>
					<view class="allline" style="text-align: right;">{{item.totalArea}}个</view>
				</view>
				
				<view class="roww center_center m-top-30" v-if="weeksArea.length<=0">
					<view>暂无数据</view>
				</view>
				
			</view>
			<view class="colonn">
				<view class="roww  border_bottom" style="padding:30rpx 30rpx;" v-if="type==2"
				>
					<view class="allline">姓名</view>
					<view class="allline"  style="text-align: center;">金额 <text class="fs-25" style="color:red;">(服务展位总和)</text> </view>
					<view class="allline" style="text-align: right;">标展/个</view>
				</view>
				<view class="roww rowsa border_bottom" style="padding:30rpx 30rpx;" v-if="type==2"
				v-for="(item,index) in monthsArea" 
				>
					<view class="allline">{{index+1}}：{{item.nickName}}</view>
					<view class="allline" style="text-align: center;">{{item.zongjine}}元</view>
					<view class="allline" style="text-align: right;">{{item.totalArea}}个</view>
				</view>
				
				<view class="roww center_center m-top-30" v-if="monthsArea.length<=0">
					<view>暂无数据</view>
				</view>
				
			</view>
			
			<!-- <view class="roww  border_bottom" style="padding:30rpx 30rpx;"
			v-for="(item,index) in 10" v-if="type==3"
			>
				<view>{{index+1}}：张三</view>
				<view class="allline"></view>
				<view>已邀请{{10-index}}人</view>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,
				weeksArea:[],
				monthsArea:[]
			}
		},
		onLoad(options) {
			this.type=options.type;
			if(options.type==1){
				uni.setNavigationBarTitle({
					title:"周排行"
				})
				this.infosaleranking();
			}else if(options.type==2){
				uni.setNavigationBarTitle({
					title:"月排行"
				})
				this.infosaleranking();
			}else if(options.type==3){
				uni.setNavigationBarTitle({
					title:"预登记排行"
				})
			}
			
		},
		methods: {
			// 签单排行
			infosaleranking(){
				var data = {
					exhId: uni.getStorageSync("exhId")
				};
				this.$axios
					.axios('POST', this.$paths.infosaleranking, data)
					.then((res) => {
						if (res.code == 200) {
							console.log("签单排行",res);
							var thisMonth=res.thisMonth;
							var thisWeek=res.thisWeek;
							var weeksArea=[];
							for(var a=0;a<thisWeek.length;a++){
								var obg=thisWeek[a].params;
								obg.totalArea=obg.totalArea/9;
								obg.totalArea=obg.totalArea.toFixed(2);
								weeksArea.push(obg);
								
							}
							
							var monthsArea=[];
							for(var a=0;a<thisMonth.length;a++){
								var obg=thisMonth[a].params;
								obg.totalArea=obg.totalArea/9;
								obg.totalArea=obg.totalArea.toFixed(2);
								monthsArea.push(obg);
							}
							console.log("----",weeksArea,monthsArea);
							this.tiaoxuTiao(weeksArea,monthsArea);
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {
						console.log(err)
					});
			},
			
			tiaoxuTiao(weeksArea,monthsArea){
				console.log("---",JSON.stringify(weeksArea),JSON.stringify(monthsArea))
				
				this.weeksArea=weeksArea.sort((a, b) => b.zongjine - a.zongjine);
				this.monthsArea=monthsArea.sort((a, b) => b.zongjine - a.zongjine);
				
			},
			
		}
	}
</script>

<style>
@import url(zhouyejipaihang.css);
</style>
