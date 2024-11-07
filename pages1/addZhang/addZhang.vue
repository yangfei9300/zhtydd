<template>
	<view>
		<view class="colonn">
			<view class="roww border_bottom" style="padding:30rpx 30rpx;">
				<view>章名称</view>
				<view class="w-30"></view>
				<input class="allline" v-model="form.name" placeholder="请输入章名称" />
			</view>
			<view class="roww border_bottom" style="padding:30rpx 30rpx;">
				<view>电子章</view>
				<view class="w-30"></view>
				<view class="w-500 huanhang">
					<image v-if="form.imageCode!=''"  @click.stop="selimg"
					:src="form.imageCode"  
					class="w-180 h-180 p-right-20 p-bottom-20"
					></image>
					<image v-else  @click.stop="selimg"
					src="/static/shangchuan.png"  
					class="w-180 h-180 p-right-20 p-bottom-20"
					
					></image>
				</view>
			</view>
			<view class="roww fs-30" style="color:#808080;" >
				<view class="w-20"></view>
				<view>请上传透明的正方形的电子章</view>
			</view>
			<view class="h-40"></view>
			<view class="roww center_center">
				<view class="loginbtn" @click="toAddZhang">提交信息</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					'name':'',
					'exhibitorId':'',
					'imagePath':'',
					'imageCode':''
				}
			}
		},
		methods: {
			selimg(){
				uni.chooseImage({
					count:1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success:  (res)=> {
						if(res.tempFiles.length>0){
							this.uploadimgs1(res.tempFiles[0].path);
						}
					}
				});  
			},
			uploadimgs1(url){
				    uni.request({
					url: url,
					method:'GET',
					responseType: 'arraybuffer',
					success: ress => {
						let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
						base64 = 'data:image/png;base64,' + base64 //不加上这串字符，在页面无法显示的哦
						console.log(base64)
						this.form.imageCode=base64;
					}
				    })
			},
			uploadimgs(imgpath){
				console.log("aa",imgpath,this.$paths.uploadOSS)
				this.$axios
					.axiosUpload(this.$paths.uploadOSS,imgpath,{})
					.then((res) => {
						console.log("上传额记过",res)
						if (res.code == 200) {
							this.form.imagePath=res.url;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {
						console.log('错误回调', err);
				});
			},
			toAddZhang(){
				var data=this.form;
				var userInfo=uni.getStorageSync("userInfo")
				if(!userInfo){
					this.$tools.showToast("请先登录");
					return false;
				}
				data.exhibitorId=userInfo.exhibitorId;
				if(this.form.name==""){
					this.$tools.showToast("请输入名称");
					return false;
				}
				if(this.form.imageCode==""){
					this.$tools.showToast("请上传图片");
					return false;
				}
				this.$axios
					.axios('POST', this.$paths.customersealadd, this.form)
					.then(res => {
						if(res.code==200){
							this.$tools.showToast("上传成功")
							setTimeout(res=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}else{
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			
			touploadimg(){
				
			},
		}
	}
</script>

<style>
@import url(updateQiye.css);
</style>
