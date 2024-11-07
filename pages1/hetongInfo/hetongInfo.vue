<template>
	<view>
		<view class="colonn background1 w-750  b-all-20">
			<view class="roww border_bottom p-all-20 fs-30">
				<view>合同</view>
				<view class="allline"></view>
				<view class="roww">
					<block v-if="hTInfo.status=='0'">
						未初始化
					</block>
					<block v-if="hTInfo.status=='1'||hTInfo.status=='2'">
						已生成文件
					</block>
					<block v-if="hTInfo.status=='3'">
						业务员已签字
					</block>
					<block v-if="hTInfo.status=='4'">
						企业已签字
					</block>
				</view>
			</view>
			<view class="roww   fs-30" style="padding:10rpx 20rpx;">
				<view>企业：{{hTInfo.customerName}}</view>
			</view>
			<view class="roww  p-all-20 fs-30" style="padding:10rpx 20rpx;">
				<view>签订金额：￥{{hTInfo.afterDiscount}}</view>
			</view>
			<view class="roww  p-all-20 fs-30" style="padding:10rpx 20rpx;" v-if="hTInfo.params">
				<view>所属业务员：{{hTInfo.params.nickName}}</view>
			</view>
			<view class="roww  p-all-20 fs-30" style="padding:10rpx 20rpx;">
				<view>签订时间：{{hTInfo.createTime}}</view>
			</view>
			<view class="roww  p-all-20 fs-30" style="padding:10rpx 20rpx;">
				<view>到账金额：￥{{hTInfo.receivedAmount}}</view>
			</view>
			<view class="roww  p-all-20 fs-30" style="padding:10rpx 20rpx;">
				<view>未到账金额：￥{{(hTInfo.afterDiscount-hTInfo.receivedAmount).toFixed(2)}}</view>
			</view>
			
			<view class="roww  p-all-20 fs-30" style="padding:10rpx 20rpx;">
				<view>合同文件：<text style="color: blue;" @click.stop="openFile(hTInfo.file)">点击查看合同</text></view>
			</view>
			<view class="h-15"></view>
		</view>
		<view class="h-15"></view>
		
		<view class="colonn background1 ">
			<view class="h-20"></view>
			<view class="roww center_center" v-if="booths.length>0">
				<view>展位列表</view>
			</view>
			<view class="h-20"></view>
			<block v-for="(item,index) in booths"  >
				<view class="roww rowsb border_bottom p-all-20"
				>
					<view class="w-236" style="text-align: left;">展位号：{{item.contentName}}</view>
					<view>{{item.params.hallName}}</view>
					<view class="w-236" style="text-align: center;">{{item.unitPrice}}元</view>
				</view>
			</block>
			<view class="roww center_center" v-if="services.length>0">
				<view>服务列表</view>
			</view>
			<block v-for="(item,index) in services">
				<view class="roww rowsb border_bottom p-all-20"
				>
					<view class="w-236" style="text-align: left;">{{item.params.typeName}}</view>
					<view>{{item.contentName}}</view>
					<view class="w-236" style="text-align: center;">{{item.unitPrice}}元</view>
				</view>
			</block>
			<view class="roww border_bottom p-all-20">
				<view>合计</view>
				<view class="allline"></view>
				<view>{{hTInfo.afterDiscount}}元</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options:{},
				hTInfo:{},
				booths:[],
				services:[],
				payPlans:[]
			}
		},
		onLoad(options) {
			this.options=options;
			this.getHtInfo();
		},
		methods: {
			openFile(file){
				  wx.downloadFile({
				      // 示例 url，并非真实存在
				      url: file,
				      success: function (res) {
				        console.log(res)
				        const filePath = res.tempFilePath
				        wx.openDocument({
				          filePath: filePath,
				          showMenu:true,
				          success: function (res) {
				            console.log('打开文档成功')
				          }
				        })
				      }
				    })
			},
			getHtInfo(){
				var data={
				}
				this.$axios
					.axios('get', this.$paths.customercontractinfo+this.options.id,data)
					.then(res => {
						if(res.code==200){
							this.hTInfo=res.data.data;
							
							if(this.hTInfo.params.booths){
								this.booths=this.hTInfo.params.booths
							}
							if(this.hTInfo.params.service){
								
								this.services=this.hTInfo.params.service;
								
							}
							if(this.hTInfo.params.payPlans){
								this.payPlans=this.hTInfo.params.payPlans
							}
							
						}else{
							this.$tools.showToast(res.msg)
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
@import url(hetongInfo.css);
</style>
