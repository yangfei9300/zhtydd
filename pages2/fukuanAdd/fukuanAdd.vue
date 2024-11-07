<template>
	<view>
		<view class="colonn">
			<view class="roww p-all-30 border_bottom">
				<view>付款公司</view>
				<view class="w-20"></view>
				<input v-model="form.payCompany" placeholder="请输入" class="allline" />
			</view>
			<view class="roww p-all-30 border_bottom">
				<view>付款名称</view>
				<view class="w-20"></view>
				<input v-model="form.payName"  placeholder="请输入" class="allline" />
			</view>
			<picker :range="fkFangshis" range-key="dictLabel"
			@change="changes($event,1)"
			>
				<view class="roww p-all-30 border_bottom">
					<view>付款方式</view>
					<view class="w-20"></view>
					<view v-if="form.payType!=''">
						{{ fkFangshis[form.payType-1].dictLabel}}
					</view>
					<view v-else style="color: #8c8c8c;">
						请选择
					</view>
				</view>
			</picker>
			<picker :range="skZhanghus" range-key="dictLabel"
			@change="changes($event,2)"
			>
				<view class="roww p-all-30 border_bottom">
					<view>收款账号</view>
					<view class="w-20"></view>
					<view v-if="form.payAccount!=''">
						{{skZhanghus[form.payAccount-1].dictLabel}}
					</view>
					<view v-else style="color: #8c8c8c;">
						请选择
					</view>
				</view>
			</picker>
			<view class="roww p-all-30 border_bottom center_center">
				<view>付款时间</view>
				<view class="w-20"></view>
				<leeDatetime @change="bindLeeDateTimeChange" 
				placeholder="请选择日期时间" 
				:value="form.payTime"></leeDatetime>
				<view class="allline"></view>
			</view>
			<view class="roww p-all-30 border_bottom ">
				<view>付款金额</view>
				<view class="w-20"></view>
				<input v-model="form.payAmount" type="number"  placeholder="请输入" class="allline" />
			</view>
			<view class="h-40"></view>
			<view class="roww center_center">
				<view class="loginbtn" @click.stop="subPayRecordadd">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import leeDatetime from "@/components/lee-datetime/lee-datetime.vue"
	
	export default {
		components: {
			leeDatetime,
		},
		data() {
			return {
				
				leeDateTime: "",
				
				form:{
					  "payCompany": "",
					  "payName": "",
					  "payType": "",
					  "payAccount": "",
					  "payTime": "",  
					  "payAmount": ""
				},
				
				fkFangshis:[],//付款方式列表
				skZhanghus:[],
			}
		},
		onLoad() {
			this.getFkFangshi();
			this.getSKzhanghu();
		},
		methods: {
			// changes
			changes(res,index){
				var value=(res.detail.value);
				if(index==1){
					this.form.payType=parseInt(this.fkFangshis[value].dictValue);
				}else{
					console.log("劲辣了",value,this.skZhanghus)
					this.form.payAccount=parseInt(this.skZhanghus[value].dictValue);
				}
			},
			// 获取付款方式
			getFkFangshi(){
				var data={};
				this.$axios
					.axios('get', this.$paths.basicdicttype+'finance_pay_type', data)
					.then(res => {
						if (res.code == 200) {
							this.fkFangshis=res.data;
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取收款账户
			getSKzhanghu(){
				var data={};
				this.$axios
					.axios('get', this.$paths.basicdicttype+'finance_pay_account', data)
					.then(res => {
						if (res.code == 200) {
							this.skZhanghus=res.data;
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 时间改变
			bindLeeDateTimeChange(e) {
				this.form.payTime=e.value;
				console.log("查看时间组件返回值",e.value,e.text)
			},
			// 是饭否提交
			isSubmit(){
				if(this.form.payCompany==""){
					this.$tools.showToast("请输入付款公司");
					return false;
				}
				if(this.form.payName==""){
					this.$tools.showToast("请输入付款名称");
					return false;
				}
				if(this.form.payType==""){
					this.$tools.showToast("请输入付款方式");
					return false;
				}
				if(this.form.payAccount==""){
					this.$tools.showToast("请输入收款账户");
					return false;
				}
				if(this.form.payTime==""){
					this.$tools.showToast("请输入付款时间");
					return false;
				}
				if(this.form.payAccount==""){
					this.$tools.showToast("请输入付款金额");
					return false;
				}
				return true;
			},
			subPayRecordadd(){
				if(!this.isSubmit()){
					return false;
				}
				var data=this.form;
				this.$axios
					.axios('post', this.$paths.payRecordadd, data)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("提交成功");
							setTimeout(res=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						} else {
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
@import url(fukuanAdd.css);
</style>
