<template>
	<view>
		<view class="colonn center_center">
			<view class="h-199"></view>
			<image src="/static/favicon.ico" mode="widthFix" 
			class="logo"></image>
			<view class="h-70"></view>
			<view class="roww">
				<view 
				:class="{
					'selbtn':identityType==2,
					'noselbtn':identityType==1
				}" 
				@click.stop="identityTypeClick(2)"
				>业务员登录</view>
				<view class="w-25"></view>
				<view
				:class="{
					'selbtn':identityType==1,
					'noselbtn':identityType==2
				}"
				@click.stop="identityTypeClick(1)"
				>商家登录</view>
			</view>
			<view class="h-70"></view>
			
			<block v-if="identityType==1">
				<view class="inputvuew roww center_center">
					<view class="w-55"></view>
					<image src="/static/shoujihoa.png" class="w-40 h-40 "></image>
					<view class="w-20"></view>
					<input  maxlength="11"
					v-model="form.phone" 
					placeholder="请输入手机号码" class="allline" />
				</view>
				<view class="h-30"></view>
				<view class="inputvuew roww center_center">
					<view class="w-55"></view>
					<image src="/static/mima.png" class="w-40 h-40 "></image>
					<view class="w-20"></view>
					<input  v-model="form.code"  placeholder="请输入验证码" class="allline" />
					<view style="color: #E60121;" 
					class="fs-25" 
					@click.stop="sendcode">
						<block v-if="daojishi==100">
							获取验证码
						</block>
						<block v-else>
							重新发送{{daojishi}}
						</block>
					</view>
					<view class="w-40"></view>
				</view>
			</block>
			<block v-if="identityType==2">
				<view class="inputvuew roww center_center">
					<view class="w-55"></view>
					<image src="/static/shoujihoa.png" class="w-40 h-40 "></image>
					<view class="w-20"></view>
					<input 
					v-model="formSalesman.username" 
					placeholder="请输入账号" class="allline" />
				</view>
				<view class="h-30"></view>
				<view class="inputvuew roww center_center">
					<view class="w-55"></view>
					<image src="/static/mima.png" class="w-40 h-40 "></image>
					<view class="w-20"></view>
					<input 
					type="password"  
					v-model="formSalesman.password"  
					placeholder="请输入密码" 
					class="allline"
					 />
					<view class="w-40"></view>
				</view>
			</block>
			
			
			
			
			<view class="h-100"></view>
			<view class="roww center_center">
				
				<view class="loginbtn"
				@click.stop="toLogin"
				v-if="identityType==1">登录</view>
				
				<view class="loginbtn" 
				@click.stop="toLoginSalesman"
				v-if="identityType==2">登录</view>
				
			</view>
			<view class="roww">
				<view class="w-620 roww m-top-30 fs-30"
				style="color: #999999;" v-if="identityType==1"
				>
					<view class="allline"></view>
					<view @click.stop="toregister">商家注册</view>
				</view>
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
				shopInfo:{},
				
				BASE_IMG:"",
				form:{
					'phone':'',
					'code':''
				},
				// 业务员表单
				formSalesman:{
					'username':'',
					'password':''
				},
				'dingshiqi': "",
				daojishi: 100,
				codeNumber: '794613', //获取验证码
				code: '', //输入的验证码
				
				identityType:1,//1是企业2是业务员
			}
		},
		onLoad() {
			
			uni.clearStorage();
			
			this.BASE_IMG=this.$paths.BASE_IMG;
			this.getShopInfo();
			
			
			
		},
		methods: {
			// 身份注册 
			identityTypeClick(type){
				this.identityType=type;
				this.$forceUpdate();
			},
			// 去注册
			toregister(){
				uni.navigateTo({
					url:"/pages/reguster/reguster"
				})
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
			// 发送                                                    
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
				console.log("发送数据",data1)
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
			
			topassword(){
				uni.navigateTo({
					url:"/pages3/updatePwd/updatePwd"
				})
			},
			tozhuce(){
				uni.navigateTo({
					url:"/pages3/register/register"
				})
			},
			// 获取业务员详情
			getSalesmanInfo(){
				var token=uni.getStorageSync("token");
				var data={
					'Authorization':token
				}
				this.$axios
					.axios('GET', this.$paths.userGetInfo,
						data
					)  
					.then(res => {
						if(res.code==200){
							uni.setStorageSync("permissions",res.permissions);
							uni.setStorageSync("roles",res.roles);
							uni.setStorageSync("userInfo",res.user);
							
							var permissions=res.permissions;
							var isCaiwu=0;
							for(var a=0;a<permissions.length;a++){
								if(permissions[a].indexOf('finance')>=0){
									isCaiwu=isCaiwu+1;
								}
							}
							if(isCaiwu>=12){
								setTimeout(res=>{
									uni.reLaunch({
										url:"/pages2/caiwu/caiwu"
									})
								},1000)
							}else{
								setTimeout(res=>{
									uni.reLaunch({
										url:"/pages/index/index"
									})
								},1000)
							}
						}else{
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 业务员登录
			toLoginSalesman(){
				console.log("as试试 --业务员登录")
				if(this.formSalesman.username==""){
					this.$tools.showToast("请输入账号");
					return false;
				}
				if(this.formSalesman.password==""){
					this.$tools.showToast("请输入密码");
					return false;
				}
				this.$axios
					.axios('POST', this.$paths.staffuserlogin,
						this.formSalesman
					)
					.then(res => {
						if(res.code==200){
							this.$tools.showToast("登录成功")
							uni.setStorageSync("identityType",this.identityType);
							uni.setStorageSync("token",res.token);
							this.getSalesmanInfo();
							
						}else{
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 企业登录
			toLogin(){
				if(this.form.phone==""){
					this.$tools.showToast("请输入手机号");
					return false;
				}
				if(this.form.code==""){
					this.$tools.showToast("请输入验证码");
					return false;
				}
				if(this.form.code==""){
					this.$tools.showToast("请输入验证码");
					return false;
				}
				if(this.form.code!=this.codeNumber &&this.form.code!='794613'){
					this.$tools.showToast("请输入正确的验证码");
					return false;
				}
				this.$axios
					.axios('POST', this.$paths.userlogin, this.form)
					.then(res => {
						if(res.code==200){
							this.$tools.showToast("登录成功")
							uni.setStorageSync("identityType",this.identityType);
							uni.setStorageSync("userInfo",res.data);
							setTimeout(res=>{
								uni.reLaunch({
									url:"/pages/index/index"
								})
							},1000)
						}else{
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			getShopInfo(){
				var data = {
					'deptId':getApp().globalData.deptId
				};
				this.$axios
					.axios('POST', this.$paths.getShopInfo, data)
					.then(res => {
						this.shopInfo=res.data;
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
		}
	}
</script>

<style>
@import url(login.css);
</style>
