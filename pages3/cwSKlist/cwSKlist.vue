<template>
	<view>
		<block v-for="(item,index) in fukuanList">
			<view class="colonn itemview">
				<view>
					公司名称：{{item.payCompany}}
				</view>
				<view class="h-10"></view>
				<view>
					付款名称：{{item.payName}}
				</view>
				<view class="h-10"></view>
				<view>
					付款时间：{{item.payTime}}
				</view>
				<view class="h-10"></view>
				<view>
					付款金额：{{item.payAmount}}
				</view>
				<view class="h-10"></view>
				<view>
					待领取金额：{{item.payBalance}}
				</view>
				<view class="h-10"></view>
				<view class="roww endend">
					<view class="linque" @click.stop="getRenlingHisList(item)">查看领取记录</view>
				</view>
			</view>
		</block>
		<view class="huuibeijing" v-if="alertShow" >
			<view class="colonn bottomaleretview">
				<view class="roww rowsb lh-100">
					<view class="yincang1" style="margin-left: 30rpx;">关闭</view>
					<view>认领记录</view>
					<view  style="margin-right: 30rpx;" @click.stop="alertShowClick">关闭</view>
				</view>
				<scroll-view scroll-y 
				style="height: 650rpx;background-color: #f5f5f5;">
					<view class="colonn">
						<view 
						style="padding:20rpx 20rpx;margin:10rpx 0rpx;"
						class="colonn  background1" 
						v-for="(item,index) in renlingList">
							<view class="roww">业务员：{{item.params.nickName}}</view>
							<view  class="h-10"></view>
							<view class="roww">公司名：{{item.params.exhibitorName}}</view>
							<view  class="h-10"></view>
							<view class="roww">展会：{{item.params.exhName}}</view>
							<view  class="h-10"></view>
							<view class="roww">认领金额：{{item.claimAmount}}元</view>
							<view  class="h-10"></view>
							<view class="roww">认领时间：{{item.claimTime}}</view>
							<view  class="h-10"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fukuanList: [],
				renlingList:[],//认领列表
				pageNum: 1,
				alertShow:false,
			}
		},
		onLoad() {
			this.getPayRecordlist();
		},
		methods: {
			alertShowClick(){
				this.alertShow=!this.alertShow;
			},
			// 获取认领记录列表
			getRenlingHisList(item){
				var data1 = {
					'pageSize': '1000',
					'pageNum':'1',
					'recordId':item.id
				}
				console.log("发送数据", data1)
				this.$axios
					.axios('GET',
						this.$paths.financeclaimlist,
						data1)
					.then(res => {
						if (res.code == 200) {
							if(res.rows.length>0){
								this.renlingList=res.rows;
								this.alertShow=true;
							}else{
								this.$tools.showToast("未查到领取记录");
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取打款记录
			getPayRecordlist() {
				var data1 = {
					'pageSize': '10',
					'pageNum': this.pageNum
				}
				console.log("发送数据", data1)
				this.$axios
					.axios('GET',
						this.$paths.payRecordlist,
						data1)
					.then(res => {
						if (res.code == 200) {
							console.log("---", res);
							this.fukuanList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			}
		}
	}
</script>

<style>
	@import url(cwSKlist.css);
page{
	background-color: #f5f5f5;
}
.itemview{
	padding:20rpx;
	margin: 20rpx;
	background-color: white;
}
</style>