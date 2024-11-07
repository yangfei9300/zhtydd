<template>
	<view>
		<view class="colonn">
			<view class="roww border_bottom p-all-20">
				<input v-model="form.params.exhibitorName" class="allline" placeholder="请输入展商名称" />
				<view @click.stop="getQiyeList">搜索</view>
			</view>
			<view class="colonn">
				
				<view class="roww  border_bottom"
				style="padding:30rpx 30rpx;" v-for="(item,index) in qiyeList"
				>
					<view class="w-550">{{item.params.exhibitorName}}</view>
					<view class="allline"></view>
					<view class="fw-800" style="color: blue;" @click.stop="toAddHetong(item)">
						创建合同
					</view>
				</view>
				
				<view  class="roww center_center m-top-30" 
				v-if="qiyeList.length<=0">
					<view>暂无数据</view>
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
					pageSize: "15",
					pageNum: "1",
					searchValue:1,
					params:{
						'exhibitorName':''
					}
				},
				qiyeList:[],
			}
		},
		onLoad() {
			
		},
		methods: {
			toAddHetong(item){
				uni.setStorageSync("selqiye",item);
				uni.navigateTo({
					url:"/pages1/addContract/addContract"
				})
			},
			getQiyeList(){
				var data = this.form;
				
				if(data.params.exhibitorName==""){
					this.$tools.showToast("请输入企业名称");
					return false;
				}
				if(data.params.exhibitorName.length<4){
					this.$tools.showToast("企业名称至少4个字");
					return false;
				}
				
				data.exhId=uni.getStorageSync("exhId");
				this.$axios
					.axios('POST', this.$paths.staffexhibitorlist, data)
					.then(res => {
						if (res.code == 200) {
							console.log("企业列表",res);
							this.qiyeList=res.rows;
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
@import url(exhibitorList.css);
</style>
