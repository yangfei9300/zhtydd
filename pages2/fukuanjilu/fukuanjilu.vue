<template>
	<view>
		<view class="topviewtab">
			<v-tabs
			v-model="current"
			 activeColor="#FF5044" lineColor="#FF5044"  
			 :scroll="false" :tabs="tabs" @change="changeTab"></v-tabs>
		</view>
		
		<view class="h-80"></view>
		
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
				<view>
					付款状态： <text style="color: red;">
						<block v-if="item.status==0">待分配</block>
						<block v-if="item.status==1">部分分配</block>
						<block v-if="item.status==2">分配完成</block>
					</text>
				</view>
				<view class="roww endend">
					<view class="linque" @click.stop="heShowClick(item)"
					v-if="item.status!=2"
					>点击领取</view>
				</view>
			</view>
		</block>
		
		<view class="huuibeijing" v-if="heShow">
			<view class="colonn alertview1">
				<view class="roww rowsb p-all-25 h-100">
					<view class="yincang1">关闭</view>
					<view>合同列表</view>
					<view style="color: blue;" @click.stop="heShowClick">关闭</view>
				</view>
				<scroll-view class="h-650" style="background-color: #f5f5f5;" scroll-y>
					<view class="colonn" >
						<view class="colonn" style="background-color: white;margin: 15rpx;padding:20rpx;" 
						v-for="(item,index) in htList">
							<view>企业名称：{{item.params.exhibitorName}}</view>
							<view class="h-10"></view>
							<view>客户名称：{{item.customerPerson}}</view>
							<view class="h-10"></view>
							<view class="roww">
								<view>客户电话：{{item.customerTel}}</view>
								<view class="allline"></view>
								<view class="fw-800" style="color: red;" @click.stop="totel(item.customerTel)">拨打</view>
							</view>
							<view class="h-10"></view>
							<view>签单金额：{{item.afterDiscount}}</view>
							<view class="h-10"></view>
							<view>已收金额：{{item.receivedAmount}}</view>
							<view class="h-10"></view>
							<view>合同创建时间：{{item.createTime}}</view>
							<view class="h-20"></view>
							<view class="roww center_center border_bottom">
								<view class="inputvi allline">
									<input placeholder="请输入金额" type="digit" v-model="htList[index].lingmoney"   />
								</view> 
								<view class="w-30"></view>  
								<view class="linque" @click.stop="lingMoneySub(item)">确认领取</view>
							</view>    
							<view class="h-20"></view>
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
				
				current: 0,
				tabs: [
				  '未分配',
				  '部分分配',
				  '分配完成',
				],
				
				
				pageNum: 1,
				fukuanList: [],
				htList:[],
				heShow:false,
				moneyHistorySel:null,//付款记录ID
			}
		},
		onLoad() {
			this.getPayRecordlist();
			this.getHetongList();
		},
		onReachBottom() {
			this.getPayRecordlist();
		},
		methods: {  
			
			changeTab(index) {
			  console.log('当前选中的项：' + index)
			  this.pageNum=1;
			  this.current=index;
			  this.fukuanList=[];
			  this.getPayRecordlist();
			},
			
			// 领取金额
			lingMoneySub(item){   
				console.log("合同列表",item);
				if(item.lingmoney==''){
					this.$tools.showToast("请输入金额");
					return false;
				}
				var exhId=uni.getStorageSync("exhId");
				if(!exhId){
					  this.$tools.showToast("请先在首页选择展会");
					return false 
				}
				// 判断总金额对不对
				var moneyHistorySel=this.moneyHistorySel;
				if(moneyHistorySel.payBalance<item.lingmoney){
					this.$tools.showToast("超出可支配金额");
					return false;
				}
				var zong=parseFloat(item.receivedAmount)+parseFloat(item.lingmoney);
				zong=zong.toFixed(2);
				zong=parseFloat(zong)
				if(  zong>item.afterDiscount){
					this.$tools.showToast("超出合同应收取金额");
					return false;
				}
				var data={
				  "exhId": uni.getStorageSync("exhId"),
				  "recordId": this.moneyHistorySel.id,
				  "params": {
					"contractList": [{
					  "id":  item.id,
					  "receivedAmount":item.lingmoney
					}]
				  }
				}
				this.$axios
					.axios('post', this.$paths.financeclaimclaim,data)
					.then(res => {
						if(res.code==200){
							this.$tools.showToast("认领成功")
							this.heShowClick();
							setTimeout(res=>{
								this.pageNum=1;
								this.fukuanList=[];
								this.getPayRecordlist();
							},1000)
						}else{
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
				
			},
			// 对话框接口
			heShowClick(item){
				if(item){
					this.moneyHistorySel=item;
				this.getHetongList();
				}
				this.heShow=!this.heShow;
			},
			// 拨打电话
			totel(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			// 获取合同列表
			getHetongList(){
				var data={
					'pageSize':'1000',
					'pageNum':'1',
					'searchValue':'1', //1本人，2全部
				}
				this.$axios
					.axios('get', this.$paths.contractpending,data)
					.then(res => {
						if(res.code==200){
							var htList=res.rows;
							for(var a=0;a<htList.length;a++){
								htList[a].lingmoney='';
							}
							this.htList=htList;
						}else{
							this.$tools.showToast(res.msg)
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
					'pageNum': this.pageNum,
					'status':this.current
				}
				console.log("发送数据", data1)
				this.$axios
					.axios('GET',
						this.$paths.payRecordlist,
						data1)
					.then(res => {
						if (res.code == 200) {
							console.log("---", res);
							this.fukuanList=this.fukuanList.concat(res.rows);
							this.pageNum=this.pageNum+1;
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
	@import url(fukuanjilu.css);
</style>