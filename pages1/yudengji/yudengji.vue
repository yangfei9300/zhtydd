<template>
	<view>
		<view class="colonn">
			<view class="roww fw-800 rowsa p-all-20" 
			style="background-color:#2E7EFC;color: white;" v-if="turnoutNum">
				<view>预登记：{{ turnoutNum.params.referrerCount ? turnoutNum.params.referrerCount : 0 }}人</view>
				<view>展会入场：{{ turnoutNum.params.referrerArriveCount ? turnoutNum.params.referrerArriveCount : 0 }}人</view>
			</view>
			<view class="colonn" v-for="(item,index) in referrerUserList">
				<view class="roww p-all-20 border_bottom" v-if="item.status == 1">
					<view class="allline" style="text-align: center;">{{item.visitorName}}</view>
					<view class="allline" style="text-align: center;">{{maskPhoneNumber(item.visitorPhone)}}</view>
					<view class="allline" style="color: #2E7EFC;text-align: center;">已入场</view>
				</view>
				<view class="roww p-all-20 border_bottom" v-else>
					<view class="allline" style="text-align: center;">{{item.visitorName}}</view>
					<view class="allline" style="text-align: center;">{{maskPhoneNumber(item.visitorPhone)}}</view>
					<view class="allline" style="color: red;text-align: center;">未入场</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:null,
				turnoutNum:null,
				referrerUserList:[],
				pagenum:1,
			}
		},
		onLoad() {
			var userInfo=uni.getStorageSync("userInfo");
			var identityType=uni.getStorageSync("identityType");
			if(identityType==1){
				this.phone=userInfo.phone;
			}else{
				this.phone=userInfo.phonenumber;
			}
			if(this.phone){
				this.referrerlist();
				this.getPeople();
			}
		},
		onReachBottom() {
				if (this.referrerUserList.length < this.turnoutNum.params.referrerCount) {
					this.referrerlist();
				}
		},
		methods: {
			maskPhoneNumber(phone) {
			    if (phone.length === 11 && /^\d+$/.test(phone)) {
			        return phone.slice(0, 3) + "*****" + phone.slice(8);
			    } else {
			        return "Invalid phone number";
			    }
			},
			// 观众模块
			getPeople() {
				var userInfo = uni.getStorageSync("userInfo");
				var data = {
					exhId: uni.getStorageSync('exhId'),
					referrerId: this.phone
				};
				this.$axios
					.axios('POST', this.$paths.referrerCountarrive, data)
					.then((res) => {
						if (res.code == 200) {
							this.turnoutNum = res.data;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			
			referrerlist() {
				
				var data = {
					exhId: uni.getStorageSync('exhId'),
					referrerId: this.phone
				};
				this.$axios
					.axios('POST', this.$paths.referrerlist + '?pageNum=' + this.pagenum + '&pageSize=15', data)
					.then((res) => {
						if (res.code == 200) {
							this.referrerUserList = this.referrerUserList.concat(res.rows);
							this.pagenum = this.pagenum + 1;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			}
		}
	}
</script>

<style>
@import url(yudengji.css);
</style>
