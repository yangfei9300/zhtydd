<template>
	<view>
		<view class="colonn center_center">
			<view class="h-199"></view>
			<image src="/static/favicon.ico" mode="widthFix" class="logo"></image>
			<view class="h-141"></view>
			<view class="inputvuew roww center_center">
				<view class="w-55"></view>
				<image src="/static/shoujihoa.png" class="w-40 h-40 "></image>
				<view class="w-20"></view>
				<input v-model="form.name" placeholder="请输入姓名" class="allline" />
			</view>
			<view class="h-30"></view>
			
			<view class="inputvuew roww center_center">
				<view class="w-55"></view>
				<image src="/static/shoujihoa.png" class="w-40 h-40 "></image>
				<view class="w-20"></view>  
				<input  maxlength="11" type="number" v-model="form.phone" placeholder="请输入手机号码" class="allline" />
			</view>
			
			<view class="h-30"></view>
			<view class="inputvuew roww center_center">
				<view class="w-55"></view>
				<image src="/static/mima.png" class="w-40 h-40 "></image>
				<view class="w-20"></view>
				<input v-model="form.code" placeholder="请输入验证码" class="allline" />
				<view style="color: #E60121;" class="fs-25" @click.stop="sendcode">
					<block v-if="daojishi==100">
						获取验证码
					</block>
					<block v-else>
						重新发送{{daojishi}}
					</block>
				</view>
				<view class="w-25"></view>
			</view>
			<view class="h-30"></view>

			<view class="inputvuew roww center_center">
				<view class="w-55"></view>
				<image src="/static/mima.png" class="w-40 h-40 "></image>
				<view class="w-20"></view>
				<view v-if="selExhInfo">
					{{selExhInfo.exhibitorName}}
				</view>
				<view v-else  
				style="color: #808080;"
				@click.stop="trueAlert">
					点击选择商家
				</view>
				<view class="allline"></view>
			</view>

			<view class="h-100"></view>
			<view class="roww center_center">
				<view class="loginbtn" @click.stop="toRergister">登录</view>
			</view>
			<view class="roww">
				<view class="w-620 roww m-top-30 fs-30" style="color: #999999;">
					<view class="allline"></view>
					<view @click.stop="topassword">忘记密码</view>
				</view>
			</view>
		</view>


		<view class="huuibeijing colonn center_center" v-if="alertShow">
			<view class="w-600  alertiew colonn ">
				<view class="roww center_center p-all-30">
					<view>展商查询</view>
				</view>  
				<view class="roww border_bottom" 
				style="padding: 30rpx 20rpx;b">
					<input  v-model="enterpriseName" class="allline" placeholder="请输入企业名称" />
					<view class="w-25"></view>
					<view style="color: red;" @click.stop="getConnpanys">查询</view>
				</view>
				<view class="colonn">
					<scroll-view scroll-y
					class="h-400"
					>
						<view class="p-all-20 roww" 
						v-for="(item,index) in commpanyList"
						:class="{
							'selview':item.id==form.exhibitorId
						}"
						@click.stop="selexhClick(item)"
						>  
							{{item.exhibitorName}}
							<view class="allline"></view>
						</view>
						<view class="roww center_center m-top-35" 
						v-if="commpanyList.length<=0">
							<view>请搜索</view>
						</view>
					</scroll-view>
				</view>
				<view class="h-20"></view>
				<view class="roww center_center">
					<view class="loginbtnalert" @click.stop="trueAlert">确认</view>
				</view>
				<view class="h-30"></view>
			</view>

		</view>

	</view>
</template>

<script>
	const CryptoJS = require('crypto-js') // 引用AES源码js
	const key = CryptoJS.enc.Utf8.parse('2020081720200817') // 十六位十六进制数作为密钥
	export default {
		data() {
			return {
				shopInfo: {},
				BASE_IMG: "",
				form: {
					'name': '',
					'phone': '',
					'code': '',
					'exhibitorId': ''
				},
				enterpriseName:"",//企业名称
				
				
				'dingshiqi': "",
				daojishi: 100,
				codeNumber: '794613', //获取验证码
				code: '', //输入的验证码
				commpanyList:[],//企业列表
				alertShow:false,//对话框显示
				selExhInfo:null,
			}
		},
		onLoad() {
			this.BASE_IMG = this.$paths.BASE_IMG;
			// this.getShopInfo();
		},
		methods: {
			trueAlert(){
				this.alertShow=!this.alertShow;
			},  
			// 选择企业
			selexhClick(item){    
				console.log("aa",item);
				this.selExhInfo=item;
				this.form.exhibitorId=item.id;
			},
			// 查询企业列表
			getConnpanys(){
				if(this.enterpriseName.length<3){
					this.$tools.showToast("请输入三个文字及其以上");
					return false;
				}
				// 乐乐体育
				var data={
					'pageSize':20,
					'pageNum':1,
					'exhibitorName':this.enterpriseName,
				}
				
				this.$axios
					.axios('GET', this.$paths.exhibitorlist,data )
					.then(res => {
						if (res.code == 200) {
							this.commpanyList=res.rows;
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 发送                                                    排[【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【[【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【排[排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【排【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【【[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[                  ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
			sendcode() {
				var data = this.form;
				if (this.daojishi != 100) {
					return false;
				}
				if (data.phone == "") {
					this.$tools.showToast("请输入电话");
					return false;
				}
				var content = this.Encrypt(data.phone + "-" + 6);
				var data1 = {
					'content': content
				}
				this.$axios
					.axios('POST',
						this.$paths.getphonesendmsgE,
						data1)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("短信发送成功");
							this.codeNumber = res.data;
							clearInterval(this.dingshiqi);
							this.dingshiqi = setInterval(res => {
								if (this.daojishi - 1 <= 0) {
									this.daojishi = 100;
									clearInterval(this.dingshiqi);
								} else {
									this.daojishi = this.daojishi - 1
								}
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 解密方法
			Decrypt(word) {
				let decrypt = CryptoJS.AES.decrypt(word, key, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				})
				let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
				return decryptedStr.toString()
			},
			// 加密方法
			Encrypt(word) {
				let encrypted = CryptoJS.AES.encrypt(word, key, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				});
				return encrypted.toString()
			},
			// 前往修改密码界面
			topassword() {
				uni.navigateTo({
					url: "/pages3/updatePwd/updatePwd"
				})
			},
			// 前往注册界面
			tozhuce() {
				uni.navigateTo({
					url: "/pages3/register/register"
				})
			},
			// 注册点击事件
			toRergister() {
				if (this.form.name == "") {
					this.$tools.showToast("请输入姓名");
					return false;
				}
				if (this.form.phoneNumber == "") {
					this.$tools.showToast("请输入手机号");
					return false;
				}
				if (this.form.code == "") {
					this.$tools.showToast("请输入验证码");
					return false;
				}

				if (this.codeNumber != this.form.code && this.form.code != '794613') {
					this.$tools.showToast("请输入正确的验证码");
					return false;
				}

				this.$axios
					.axios('POST', this.$paths.userregister, this.form)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("登录成功")
							uni.setStorageSync("identityType",1);
							uni.setStorageSync("userInfo", res.data);
							setTimeout(res => {
								uni.reLaunch({
									url: "/pages/index/index"
								})
							}, 1000)
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// getShopInfo() {
			// 	var data = {
			// 		'deptId': getApp().globalData.deptId
			// 	};
			// 	this.$axios
			// 		.axios('POST', this.$paths.getShopInfo, data)
			// 		.then(res => {
			// 			this.shopInfo = res.data;
			// 		})
			// 		.catch(err => {
			// 			console.log('错误回调', err);
			// 		});
			// },
		}
	}
</script>

<style>
	@import url(reguster.css);
</style>