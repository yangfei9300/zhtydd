<template>
	<view>
		<view class="colonn">
			<view class="colonn background1 ">
				<view class="h-20"></view>
				<view class="roww center_center">
					<view>服务列表</view>
				</view>
				<view class="h-20"></view>
				<block v-for="(item,index) in selBoothDate">
					<view class="roww border_bottom p-all-20"
					v-if="item.params.outStatus==0"
					>
						<view class="w-336" style="text-align: left;">展位号：{{item.boothNo}}</view>
						<view class="w-236" style="text-align: center;">{{item.rmbPrice}}元</view>
						<view class="w-136" style="color: red;text-align: right;" @click.stop="delBooths(item)">删除
						</view>
					</view>
				</block>

				<view class="roww border_bottom p-all-20" v-for="(item,index) in selServiceDate">
					<view class="w-336">服务：{{item.params.projectName}}</view>
					<view class="w-236" style="text-align: center;">{{item.params.rmbPrice}}元</view>
					<view class="w-136" style="color: red;text-align: right;" @click.stop="toTuidingfuwu(item)">删除
					</view>
				</view>
				<view class="roww border_bottom p-all-20">
					<view>合计</view>
					<view class="allline"></view>
					<view>{{money}}元</view>
				</view>
			</view>

			<view class="roww rowsa m-top-30">
				<view style="color: blue;" @click.stop="alertBotthClick">+预定展位</view>
				<view style="color: blue;" @click.stop="aleretServiceClick">预定服务</view>
			</view>

			<view class="roww center_center">
				<view class="" style="font-size: 30rpx;font-weight: bold;padding:30rpx 30rpx 15rpx 30rpx;">企业信息</view>
				<view class="allline"></view>
				<view>刷新</view>
				<view class="w-30"></view>
			</view>

			<view class="roww center_center border_bottom p-all-30">
				<view>企业名称</view>
				<view class="w-20"></view>
				<input disabled v-model="form.qiyeName" class="allline" placeholder="请输入企业名称" />
			</view>

			<picker :range="lianxirenList" range-key="contactName" @change="lianxirenChange">
				<view class="roww center_center border_bottom p-all-30">
					<view>企业联系人</view>
					<view class="w-20"></view>
					<view v-if="form.contactsName">{{form.contactsName}} ▼ </view>
					<view v-else>请选择 ▼ </view>
					<view class="allline"></view>
				</view>
			</picker>

			<view class="roww center_center border_bottom p-all-30">
				<view>负责人电话</view>
				<view class="w-20"></view>
				<input disabled v-model="form.contactsTel" class="allline" placeholder="请输入联系电话" />
			</view>

			<!-- <view class="roww center_center border_bottom p-all-30">
				<view>负责人签名</view>
				<view class="w-20"></view>
				<image @click.stop="toSign(1)" v-if="form.contactsSign!=''"
				 :src="form.contactsSign" class="w-200 "
					mode="widthFix"></image>

				<view style="color: red;" @click.stop="toSign(1)" v-else class="fw-700">点击签字</view>

				<view class="allline"></view>
			</view>

			<view class="roww center_center border_bottom p-all-30">
				<view>点击选择电子章</view>
				<view class="w-20"></view>
				<block v-for="(item,index) in zhangList">

					<image v-if="form.zhangId==item.id" :src="item.imagePath" class="w-150 selimg br-20 h-150"></image>

					<image @click.stop="selZhangClick(item.id)" v-else :src="item.imagePath" class="w-150 h-150 br-20">
					</image>

				</block>
				<view class="allline"></view>
			</view> -->

			<view class="" style="font-size: 30rpx;font-weight: bold;padding:30rpx 30rpx 15rpx 30rpx;">业务员信息</view>

			<view class="roww center_center border_bottom p-all-30">
				<view>部门</view>
				<view class="w-20"></view>
				<input disabled v-model="userInfo.dept.deptName" class="allline" placeholder="请输入企业名称" />
			</view>

			<view class="roww center_center border_bottom p-all-30">
				<view>业务员姓名</view>
				<view class="w-20"></view>
				<input class="allline" disabled v-model="form.yewuname" placeholder="请输入企业名称" />
			</view>

			<view class="roww center_center border_bottom p-all-30">
				<view>业务员电话</view>
				<view class="w-20"></view>
				<input class="allline" disabled v-model="form.yewutel" placeholder="请输入企业名称" />
			</view>

			<!-- <view class="roww center_center border_bottom p-all-30">
				<view>业务员签名</view>
				<view class="w-20"></view>

				<image @click.stop="toSign(2)" v-if="form.yewuyuanSign!=''" :src="form.yewuyuanSign" class="w-200 "
					mode="widthFix"></image>

				<view style="color: red;" @click.stop="toSign(2)" v-else class="fw-700">点击签字</view>
				<view class="allline"></view>
			</view>

			<view class="roww center_center border_bottom p-all-30">
				<view>电子章</view>
				<view class="w-20"></view>
				<image src="../../static/json/logo.png" class="w-150 h-150"></image>
				<view class="allline"></view>
			</view> -->

			<view class="" 
			style="font-size: 30rpx;font-weight: bold;padding:30rpx 30rpx 15rpx 30rpx;">打款计划</view>

			<block v-for="(item,index) in payPlans">
				<view class="roww center_center border_bottom p-all-30">
					<view>第{{index+1}}笔打款金额</view>
					<view class="w-20"></view>
					<input class="allline" 
					v-model="payPlans[index].payAmount" 
					type="digit" placeholder="请输入金额" />
				</view>
				<view class="roww center_center border_bottom p-all-30">
					<view>第{{index+1}}笔打款时间</view>
					<view class="w-20"></view>
					<picker mode="date" @change="changeDateKuan($event,index)">
						<block v-if="item.planTime!=''">{{item.planTime}}</block>
						<block v-else>请选择</block>
					</picker>
					<view class="allline"></view>
				</view>
				<view style="border-bottom: 1px solid red;margin-bottom: 20rpx;"></view>
			</block>

			<view class="roww center_center m-top-30 m-bottom-30">
				<view style="color: blue;" @click.stop="addKuan()">+添加计划</view>
			</view>

			<view class="" style="font-size: 30rpx;font-weight: bold;padding:30rpx 30rpx 15rpx 30rpx;">合同模版</view>
			
			<view class="colonn">
				<view class="roww  border_bottom" style="padding:10rpx 30rpx 30rpx 30rpx;"
				v-for="(item,index) in hetongMobans"
				@click.stop="hetongMubanIndexClick(index)"
				>
					<view>{{index+1}}.</view>
					<view>{{item.name}}</view>
					<view class="allline"></view>
					<image src="/static/sel.png" v-if="hetongMubanIndex==index" 
					 class="w-40 h-40"></image>
					<image v-else src="/static/nosel.png" 
					class="w-40 h-40"></image>
				</view>
			</view>

			<view class="roww center_center">
				<view class="btrn1" @click.stop="toSubmit">提交合同</view>
			</view>
			<view class="h-30"></view>

		</view>


		<!-- 搜索展位 -->
		<view class="huuibeijing" v-if="alertBotth" style="z-index: 1000;">
			<view class="sshtong colonn">
				<view class="roww  rowsb h-100" style="line-height: 100rpx;">
					<view class="m-left-30 yincang1">关闭</view>
					<view>选择展位</view>
					<view class="m-right-30" @click.stop="alertBotthClick">关闭</view>
				</view>
				<view class="roww border_bottom center_center h-100 "
					style="padding:30rpx 20rpx;background-color: #f5f5f5;">
					<input v-model="boothExh.boothNo" class="allline" placeholder="请输入展位" />
					<view class="sousuobtn" @click.stop="getZhanwei">搜索</view>
				</view>
				<view class="h-30"></view>
				<scroll-view class="h-620" scroll-y>
					<view class="colonn" style="text-align: center;">
						<view class="roww rowsa">
							<view class="allline">展馆名</view>
							<view class="allline">展位号</view>
							<view class="allline">价格</view>
							<view class="allline">操作</view>
						</view>
						<view class="roww rowsa m-top-30 m-bottom-30" v-for="(item,index) in boothList">
							<view class="allline">{{item.params.hallName}}</view>
							<view class="allline">{{item.boothNo}}</view>
							<view class="allline">{{item.rmbPrice}}</view>
							<view class="allline fw-700" style="color: red;" @click.stop="yudingBooth(item)">添加</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 搜索服务 -->
		<view class="huuibeijing" v-if="aleretService" style="z-index: 1000;">
			<view class="sshtong colonn">
				<view class="roww  rowsb h-100" style="line-height: 100rpx;">
					<view class="m-left-30 yincang1">关闭</view>
					<view>选择服务</view>
					<view class="m-right-30" @click.stop="aleretServiceClick">关闭</view>
				</view>
				<view class="roww border_bottom center_center h-100 "
					style="padding:30rpx 20rpx;background-color: #f5f5f5;">
					<input v-model="serviceInput.projectName" class="allline" placeholder="请输入服务名称" />
					<view class="sousuobtn" @click.stop="staffservicelist">搜索</view>
				</view>
				<view class="h-30"></view>
				<scroll-view class="h-620" scroll-y>
					<view class="colonn" style="text-align: center;">
						<view class="roww rowsa">
							<view class="allline">服务名</view>
							<view class="allline">分类</view>
							<view class="allline">价格</view>
							<view class="allline">操作</view>
						</view>
						<view class="roww rowsa m-top-30 m-bottom-30" 
						v-for="(item,index) in fuwuList">
							<view class="allline w-400">{{item.projectName}}</view>
							<view class="allline">{{item.params.categoryName}}</view>
							<view class="allline">{{item.rmbPrice}}</view>
							<!-- <view class="allline fw-700" style="color: red;"
							 @click.stop="selServiceAdd(item)">添加</view> -->
							 <view class="allline fw-700" style="color: red;"
							 @click.stop="selServiceAdd(item)" >添加</view>
							
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
				boothExh: {
					'pageSize': '10',
					'pageNum': '1',
					'boothNo': '',
					'exhId': "",
				},
				serviceInput: {
					'pageSize': '10',
					'pageNum': '1',
					'exhId': "",
					'projectName': '', //服务名称
				},
				form: {
					'qiyeName': '',
					'contactsId': '',
					'contactsName': '', //联系人名
					'contactsTel': '', //联系人电话
					'contactsSign': '', //联系人签字
					'yewuyuanSign': '', //业务员签字
					'zhangId': '',

					'yewuname': '',
					'yewutel': '',
					'kuan': [{

						"index": 0,
						"planName": "", //备注
						"payAmount": "", //付款金额
						"planPercent": "100", //百分比
						"planTime": "", //付款时间
					}]
				},
				boothList: [], //展位列表
				selBotth: [], //选择的展位列表
				selService: [], //选中的服务列表
				selServiceDate: [], //预定的服务数据（从后台拿的）
				selBoothDate: [], //预定的展位数据
				alertBotth: false,
				aleretService: false,

				selqiye: null, //从上页传来得
				lianxirenList: [], //获取企业联系人

				signType: 1, //1是企业2.业务员
				zhangList: [], //章列表
				fuwuList: [], //服务列表  
				fuwuTypeList: [], //服务分类列表
				money: 0,
				payPlans: [
					{
						"index": 0,
						"planName": "", //备注
						"payAmount": "", //付款金额
						"planPercent": "100", //百分比
						"planTime": "", //付款时间
					},
				],
				hetongMobans:[],//合同模版
				hetongMubanIndex:-1,
				userInfo:{},
			}
		},
		onLoad() {
			this.userInfo=uni.getStorageSync("userInfo")
			this.selqiye = uni.getStorageSync("selqiye");
			this.form.qiyeName = this.selqiye.params.exhibitorName;
			console.log("aa", this.form);
			this.getQiyeList();
			this.getDianzizhang();
			this.getuInfo();
			this.staffservicelist();
			this.servicecategorylist();

			this.getFuwuSel();
			this.getYudingBooth();
			this.selHetongMuban();
		},
		onShow() {

			console.log("aaa", this.signType, )
			// 查询
			if (this.signType == 1) {
				this.form.contactsSign = uni.getStorageSync("img")
			} else if (this.signType == 2) {
				this.form.yewuyuanSign = uni.getStorageSync("img")
			}

		},
		methods: {
			
			toSubmit() {
				if(!this.isSubmit()){
					return false;
				}
				var data = {
					"exhId":uni.getStorageSync("exhId"),
					"contractName": "展商合同",
					"exhibitorId": this.selqiye.exhibitorId,
					"contactId": this.form.contactsId,
					"customerName": this.form.qiyeName,
					"customerAddress": this.selqiye.params.exhibitorAddress,
					"customerPerson": this.form.contactsName,
					"customerTel": this.form.contactsTel,
					"customerFax": this.selqiye.exhibitorFax,
					"registerCost": "0", //注册费
					"totalRmb": this.money,
					"afterDiscount":this.money, 
					"templateId": this.hetongMobans[this.hetongMubanIndex].id,
					"params": {
						'booths': this.selBoothDate,
						'services': this.selServiceDate,
						'payPlans': this.payPlans
					}
				}
				this.$axios
					.axios('POST', this.$paths.contractcreate, data)
					.then((res) => {
						if (res.code == 200) {
							this.$tools.showToast("合同提交完成");
							
							uni.showModal({
								title: '提示',
								content: '是否要生成合同文件',
								success:  (res1)=> {
									if (res1.confirm) {
										this.toNewHetong(res);
									} else if (res1.cancel) {
										uni.navigateBack({  
											delta:1
										})
									}
								}
							});
							
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
				
				
			},
			isSubmit() {
				var selBotth = this.selBoothDate;
				var selService = this.selServiceDate;
				
				
				if (selBotth.length <= 0 && selService.length <= 0) {
					this.$tools.showToast("展位或者服务任选一项才能提交");
					return false;
				}
				
				if(this.form.contactsId==""){
					this.$tools.showToast("请选择企业联系人");
					return false;
				}
				
				var kuans = this.payPlans;
				if (kuans.length <= 0) {
					this.$tools.showToast("至少添加一项打款计划");
					return false;
				}
				var isKuan=true;
				for(var a=0;a<kuans.length;a++){
					if(kuans[a].payAmount==''
					||!kuans[a].planTime
					||kuans[a].planTime==""){
						isKuan=false;
					}
				}
				if(!isKuan){
					this.$tools.showToast("打款计划未完善");
					return false;
				}
				console.log("aaaa",kuans)
				var jihuaMoney = 0;
				for (var a = 0; a < kuans.length; a++) {
					jihuaMoney = jihuaMoney + parseFloat(kuans[a].payAmount);
				}
				console.log("--",jihuaMoney,this.money);
				if (jihuaMoney != this.money) {
					this.$tools.showToast("计划打款总金额不对");
					return false;
				}
				if(this.hetongMubanIndex<0){
					this.$tools.showToast("请选择合同模版");
					return false;
				}
				return true;
			},
			
			// 生成合同文件
			toNewHetong(res){
				var data = {
					id:res.contractId+""
				}
				this.$axios
					.axios('post', this.$paths.staffcontractgenerate, data)
					.then((res) => {
						if (res.code == 200) {
							this.$tools.showToast("文件生成成功");
							uni.redirectTo({
								url:"/pages2/yewuyuanQianzi/yewuyuanQianzi?id="+data.id
							})
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 提交
			hetongMubanIndexClick(index){
				this.hetongMubanIndex=index;
			},
			// 查询合同模版
			selHetongMuban() {
				var data = {
					exhId: uni.getStorageSync("exhId"),
					pageNum: "1",
					pageSize: "1000",
				}
				this.$axios
					.axios('get', this.$paths.contracttemplatelist, data)
					.then((res) => {
						if (res.code == 200) {
							this.hetongMobans = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 退订服务  
			toTuidingfuwu(item) {
				var data = {
					'ids': item.id
				}
				this.$axios
					.axios('POST', this.$paths.staffservicedel + item.id, data)
					.then((res) => {
						if (res.code == 200) {
							this.$tools.showToast("退订成功");
							setTimeout(res => {
								this.getFuwuSel();
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 删除展位
			delBooths(item) {
				var selqiye = uni.getStorageSync("selqiye");
				var data = {
					'exhId': uni.getStorageSync("exhId"),
					'exhibitorId': selqiye.exhibitorId,
					'params': {
						'booths': item.id
					}
				}
				this.$axios
					.axios('POST', this.$paths.boothreturnbooth, data)
					.then((res) => {
						if (res.code == 200) {
							this.$tools.showToast("退订成功");
							setTimeout(res => {
								this.getYudingBooth();
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},

			// 获取预定的展位
			getYudingBooth() {
				var selqiye = uni.getStorageSync("selqiye");
				var data = {
					'pageSize': '300',
					'pageNum': '1',
					'exhId': uni.getStorageSync("exhId"),
					'exhibitorId': selqiye.exhibitorId,
				}
				this.$axios
					.axios('GET', this.$paths.boothlistbuy, data)
					.then((res) => {
						if (res.code == 200) {
							console.log("展位列表选择", res);
							this.selBoothDate = res.rows;
							var sel=[];
							var selBoothDate=res.rows;
							for(var a=0;a<selBoothDate.length;a++){
								if(selBoothDate[a].params.outStatus=='0'){
									sel.push(selBoothDate[a]);
								}
							}
							this.selBoothDate=sel;
							this.numAllMoney();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 获取预定的服务列表
			getFuwuSel() {
				var selqiye = uni.getStorageSync("selqiye");

				var data = {
					'pageSize': '300',
					'pageNum': '1',
					'exhId': uni.getStorageSync("exhId"),
					'exhibitorId': selqiye.exhibitorId,
				}

				this.$axios
					.axios('GET', this.$paths.servicelistbook, data)
					.then((res) => {
						if (res.code == 200) {
							console.log("服务选择", res);
							this.selServiceDate = res.rows;
							this.numAllMoney();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 预定服务
			yudingfuwu(serviceInfo) {
				var selService = this.selService;
				var subServiceList = [];
				var selqiye = uni.getStorageSync("selqiye");
				var exhId = uni.getStorageSync("exhId");
				var userInfo = uni.getStorageSync("userInfo")
				var obg = {
					"exhibitorId": selqiye.exhibitorId,
					"serviceId": serviceInfo.id,
					"reservationNum": 1,
					"exhId": exhId,
					"userId": userInfo.userId
				}
				subServiceList.push(obg);
				this.$axios
					.axios('POST', this.$paths.servicebuy, subServiceList)
					.then((res) => {
						if (res.code == 200) {
							this.$tools.showToast("预定成功");
							setTimeout(res => {
								this.getFuwuSel();
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 预定展位 
			yudingBooth(item) {
				var selbooth = this.selBotth;
				var boothlist = [];
				// for (var a = 0; a < selbooth.length; a++) {
				boothlist.push(item.id);
				// }
				var selqiye = uni.getStorageSync("selqiye");
				var data = {
					"id": selqiye.id,
					"exhibitorId": selqiye.exhibitorId,
					"params": {
						"booths": boothlist.join(",")
					}
				}
				this.$axios
					.axios('POST', this.$paths.boothbuybooth, data)
					.then((res) => {
						if (res.code == 200) {
							this.$tools.showToast("预定成功");
							setTimeout(res => {
								this.getYudingBooth();
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},

			// 计算总价格
			numAllMoney() {
				// selBotth:[],//选择的展位列表
				// selService:[],//服务列表
				var selBoothDate = this.selBoothDate;
				var selServiceDate = this.selServiceDate;
				var money = 0;
				for (var a = 0; a < selBoothDate.length; a++) {
					money = money + selBoothDate[a].rmbPrice;
				}
				for (var a = 0; a < selServiceDate.length; a++) {
					money = money + selServiceDate[a].params.rmbPrice;
				}
				money = money.toFixed(2);
				this.money = money;
			},
			// 删除服务
			delService(index) {
				this.selService.splice(index, 1); // 从索引 2 开始删除 1 个元素
			},
			// 服务对话框电极事件
			aleretServiceClick() {
				this.aleretService = !this.aleretService;
			},
			// 添加服务
			selServiceAdd(item) {
				var selService = this.selService;
				var isHave = false;
				for (var a = 0; a < selService.length; a++) {
					if (item.id == selService[a].id) {
						isHave = true;
					}
				}
				if (isHave) {
					this.$tools.showToast("请勿重复添加");
					return false;
				}
				selService.push(item);
				this.selService = selService;
				console.log("==", this.selService);
				this.yudingfuwu(item);
				this.numAllMoney();
			},
			// 获取服务列表
			staffservicelist() {
				if (this.serviceInput.projectName == "") {
					this.$tools.showToast("请输入搜索内容");
					return false;
				}
				var data = {
					'pageSize': '300',
					'pageNum': '1',
					'exhId': uni.getStorageSync("exhId"),
					'projectName': this.serviceInput.projectName,
				}
				this.$axios
					.axios('GET', this.$paths.staffservicelist, data)
					.then((res) => {
						if (res.code == 200) {
							this.fuwuList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 获取服务的分类 
			servicecategorylist() {
				var data = {
					'pageSize': '300',
					'pageNum': '1',
					'exhId': uni.getStorageSync("exhId"),
				}
				this.$axios
					.axios('GET', this.$paths.servicecategorylist, data)
					.then((res) => {
						if (res.code == 200) {
							this.fuwuTypeList = res.data;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			changeDateKuan(res, index) {
				this.payPlans[index].planTime = res.detail.value;
			},
			// 添加款
			addKuan() {
				var obg = {
					"index": 0,
					"planName": "", //备注
					"payAmount": "", //付款金额
					"planPercent": "100", //百分比
					"planTime": "", //付款时间
				}
				this.payPlans.push(obg);
			},
			// 获取缓存用户信息
			getuInfo() {
				var userInfo = uni.getStorageSync("userInfo");
				if (userInfo) {
					this.form.yewuname = userInfo.nickName;
					this.form.yewutel = userInfo.phonenumber;
				}
			},
			selZhangClick(zhangId) {
				this.form.zhangId = zhangId;
			},
			// 获取企业电子章
			getDianzizhang() {
				var data = {
					'pageSize': '300',
					'pageNum': '1',
					'exhibitorId': this.selqiye.exhibitorId
				}
				this.$axios
					.axios('GET', this.$paths.seallist, data)
					.then((res) => {
						if (res.code == 200) {
							this.zhangList = res.rows;
							if (this.zhangList.length > 0) {
								this.form.zhangId = this.zhangList[a].id;
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 联系人信息选择改变
			lianxirenChange(res) {
				this.form.contactsId = this.lianxirenList[parseInt(res.detail.value)].id;
				this.form.contactsName = this.lianxirenList[parseInt(res.detail.value)].contactName;
				this.form.contactsTel = this.lianxirenList[parseInt(res.detail.value)].contactPhone;
			},
			// 获取企业联系人
			getQiyeList() {
				var data = {
					'pageSize': '300',
					'pageNum': '1',
					'exhibitorId': this.selqiye.exhibitorId
				}
				this.$axios
					.axios('GET', this.$paths.exhibitorcontactlist, data)
					.then((res) => {
						if (res.code == 200) {
							this.lianxirenList = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 删除已选展位号
			delboothSel(index) {
				this.selBotth.splice(index, 1); // 从索引 2 开始删除 1 个元素

			},
			// 选择展位关闭显示事件
			alertBotthClick() {
				this.alertBotth = !this.alertBotth;
			},
			// 添加选中展位
			addSelbotth(item) {
				var selBotth = this.selBotth;
				var isHava = false;
				for (var a = 0; a < selBotth.length; a++) {
					if (selBotth[a].boothNo == item.boothNo) {
						isHava = true;
					}
				}
				if (isHava) {
					this.$tools.showToast("请勿重复添加");
					return false;
				}
				selBotth.push(item);
				this.selBotth = selBotth;

			},
			// 获取搜索展位
			getZhanwei() {
				var data = this.boothExh;
				if (data.boothNo == "") {
					this.$tools.showToast("展位号不能为空");
					return false;
				}
				data.exhId = uni.getStorageSync("exhId");
				this.$axios
					.axios('GET', this.$paths.boothlistnotbuy, data)
					.then((res) => {
						if (res.code == 200) {
							this.boothList = res.rows;
							if(this.boothList.length<=0){
								this.$tools.showToast("未查到此展位");
								return false;       
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 去签名
			toSign(type) {
				this.signType = type;
				uni.navigateTo({
					url: "/pages1/signView/signView"
				})
			}
		}
	}
</script>

<style>
	@import url(addContract.css);
</style>