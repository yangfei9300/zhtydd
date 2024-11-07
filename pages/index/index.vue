<template>
	<view>
		<swiper class="w-750 h-350">
			<swiper-item class="w-750 h-350" v-for="(item,index) in banners">
				<image :src="item.image" class="w-750 h-350" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<!-- <view class="h-40"></view> -->
		<!-- <view class="roww rowsa ">
			<view class="roww" v-for="(item,index) in menuType" @click="menuTypeClick(index)">
				{{item}}
			</view>
		</view> -->
		<!-- <view class="h-40"></view> -->

		<block v-if="managementType!=3">
			<picker :range="exhTypeList" range-key="typeName" @change="exhTypeChange">
				<view class="roww p-all-30 border_bottom">
					<view v-if="exhTyppeIndex>=0">{{exhTypeList[exhTyppeIndex].typeName}}</view>
					<view v-else>展会项目选择</view>
					<view class="allline"></view>
					<image class="w-35 h-35" src="/static/youjiantou1.png"></image>
				</view>
			</picker>

			<picker :range="exhList" range-key="exhName" @change="exhChange">
				<view class="roww p-all-30 border_bottom">
					<view v-if="exhIndex>=0" class="w-650">{{exhList[exhIndex].exhName}}</view>
					<view v-else>展会选择</view>
					<view class="allline"> </view>
					<image class="w-35 h-35" src="/static/youjiantou1.png"></image>
				</view>
			</picker>
		</block>

		<picker :range="qiyeExh" range-key="exhName" @change="exhChangeQiye" v-if="managementType==3">
			<view class="roww p-all-30 border_bottom">
				<view v-if="qiyeExhIndex>=0" class="w-650">{{qiyeExh[qiyeExhIndex].exhName}}</view>
				<view v-else>展会选择</view>
				<view class="allline"> </view>
				<image class="w-35 h-35" src="/static/youjiantou1.png"></image>
			</view>
		</picker>




		<block v-if="managementType==3">
			<view class="h-100"></view>
			<view class="colonn">



				<view class="roww center_center">
					<view class="fw-800">预定展位列表</view>
				</view>
				<view class="h-20"></view>
				<view style="background-color: #f5f5f5;" class="roww center_center p-all-20 border_bottom">
					<view>馆名</view>
					<view class="allline"></view>
					<view>展位号</view>
					<view class="allline"></view>
					<view>金额</view>
				</view>
				<block v-for="(item,index) in qiyebooths">
					<view class="roww center_center p-all-20 border_bottom">
						<view>{{item.params.hallName}}</view>
						<view class="allline"></view>
						<view>{{item.boothNo}}</view>
						<view class="allline"></view>
						<view>{{item.rmbPrice}}元</view>
					</view>
				</block>
				<!-- <view class="roww center_center p-all-20 border_bottom">
					<view>AT0001</view>
					<view class="allline1"></view>
					<view>签订合同中</view>
				</view> -->
				<view class="h-15"></view>
				<!-- <view class="roww center_center">
					<view style="color: blue;">+预定展位</view>
				</view> -->
				<view class="h-50"></view>
				<view class="roww center_center">
					<view class="fw-800">服务列表</view>
				</view>
				<view class="h-20"></view>
				<view class="roww center_center p-all-20 border_bottom" style="background-color: #f5f5f5;">
					<view>服务名</view>
					<view class="allline1"></view>
					<view>金额</view>
				</view>
				<block v-for="(item,index) in qiyeservices">
					<view class="roww center_center p-all-20 border_bottom">
						<view>{{item.params.projectName}}</view>
						<view class="allline1"></view>
						<view>{{item.params.rmbPrice}}</view>
					</view>
				</block>
				<!-- <view class="roww center_center p-all-20 border_bottom">
					<view>表演</view>
					<view class="allline1"></view>
					<view>已预订1人</view>
				</view> -->
				<view class="h-15"></view>
				<!-- <view class="roww center_center">
					<view style="color: blue;">+预定服务</view>
				</view>
				 -->
			</view>
		</block>






		<block v-if="managementType==2">
			<view class="huanhang">
				<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
					@click.stop="tozyjph(1)">
					<view style="font-size: 25rpx;color:#999999;">周业绩排行</view>
				</view>
				<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
					@click.stop="tozyjph(2)">
					<view style="font-size: 25rpx;color:#999999;">月业绩排行</view>
				</view>
				<view @click.stop="tozyjph1(1)" class="colonn fs-30 center_center w-250 h-150 rowsba"
					style="border: 1px solid #f5f5f5;">
					<view style="font-size: 25rpx;color:#999999;">周收款排行</view>
				</view>
				<view @click.stop="tozyjph1(2)" class="colonn fs-30 center_center w-250 h-150 rowsba"
					style="border: 1px solid #f5f5f5;">
					<view style="font-size: 25rpx;color:#999999;">月收款排行</view>
				</view>
			</view>
			<!-- <block v-if="exhIndex>=0"> -->
				<view class="colonn  pore">
					<view class="h-100"></view>
					<view class="colonn h-500 pore">
						<view class="container">
							<view class="container-wrap">
								<echarts ref="echarts" :option="option" canvasId="echarts"></echarts>
							</view>
						</view>
					</view>
				</view>

				<!-- 周业绩 -->
				<view class="colonn  ">
					<scroll-view class="pore h-500" scroll-x style="width: 750rpx;">
						<view class="container">
							<view class="container-wrap">
								<echarts ref="echarts2" :option="option2" canvasId="echarts2"></echarts>
							</view>
						</view>
					</scroll-view>
				</view>
				
				<view class="h-100"> </view>
				<!-- 月业绩 -->
				<view class="colonn  ">
					<scroll-view class="pore h-500" scroll-x style="width: 750rpx;">
						<view class="container">
							<view class="container-wrap">
								<echarts ref="echarts3" :option="option3" canvasId="echarts3"></echarts>
							</view>
						</view>
					</scroll-view>
				</view>
				
			<!-- </block> -->



		</block>

		<block v-if="managementType==2">
			<view class="h-30"></view>
			<view class="fs-40 fw-600" style="padding-bottom: 0rpx;padding-left: 30rpx;">展商概览</view>
			<view style="padding: 30rpx;">
				截止到目前，当前展会一共有
				<text class="fw-800" style="color: rgb(255, 165, 0);">
					<block v-if="zsglInfo.qianzai">{{zsglInfo.count}}</block>
					<block v-else>0</block>
				</text>
				家展商，
				其中 潜在展商
				<text class="fw-800" style="color: rgb(0, 255, 34);;">
					<block v-if="zsglInfo.qianzai">{{zsglInfo.qianzai}}</block>
					<block v-else>0</block>
				</text>
				家，
				预订展商
				<text class="fw-800" style="color: rgb(255, 0, 255);">
					<block v-if="zsglInfo.yuding">{{zsglInfo.yuding}}</block>
					<block v-else>0</block>
				</text>
				家，
				签约展商
				<text class="fw-800" style="color: rgb(255, 0, 255);">
					<block v-if="zsglInfo.qianyue">{{zsglInfo.qianyue}}</block>
					<block v-else>0</block>
				</text>
				家，
				部分付款
				<text class="fw-800" style="color: rgb(0, 0, 255);">
					<block v-if="zsglInfo.bufen">{{zsglInfo.bufen}}</block>
					<block v-else>0</block>
				</text>
				家，
				全部付款
				<text class="fw-800" style="color:rgb(128, 128, 128);">
					<block v-if="zsglInfo.quanbu">{{zsglInfo.quanbu}}</block>
					<block v-else>0</block>
				</text>
				家，
				退展展商
				<text class="fw-800" style="color: rgb(255, 0, 0);">
					<block v-if="zsglInfo.quanbu">{{zsglInfo.tuizhan}}</block>
					<block v-else>0</block>
				</text>
				家。
			</view>


			<view class="roww p-all-30 border_bottom">
				<view>操作台</view>
				<view class="allline"></view>
				<!-- <image class="w-35 h-35" src="/static/youjiantou1.png"></image> -->
			</view>

			<view class="huanhang">

				<view class="colonn fs-30 center_center w-250 h-170 rowsba" style="border: 1px solid #f5f5f5;"
					@click.stop="addContract()">
					<image src="/static/xinjian.png" class="w-50 h-50"></image>
					<view class="h-25"></view>
					<view style="font-size: 25rpx;color:#999999;">新建合同</view>
				</view>

				<view class="colonn fs-30 center_center w-250 h-170 rowsba" style="border: 1px solid #f5f5f5;"
					@click.stop="tohetong1()">
					<image src="/static/caozuo.png" class="w-50 h-50"></image>
					<view class="h-25"></view>
					<view style="font-size: 25rpx;color:#999999;">操作中合同</view>
				</view>

				<view class="colonn fs-30 center_center w-250 h-170 rowsba" style="border: 1px solid #f5f5f5;"
					@click.stop="tohetong1()">
					<image src="/static/yiwancheng.png" class="w-50 h-50"></image>
					<view class="h-25"></view>
					<view style="font-size: 25rpx;color:#999999;">已完成合同</view>
				</view>

				<view class="colonn fs-30 center_center w-250 h-170 rowsba" style="border: 1px solid #f5f5f5;"
					@click.stop="tozhanweiList">
					<image src="/static/all.png" class="w-50 h-50"></image>
					<view class="h-25"></view>
					<view style="font-size: 25rpx;color:#999999;">所有展位</view>
				</view>

			</view>

			<block v-if="yjgkInfo.week">
				<view class="roww p-all-30 border_bottom">
					<view>周业绩（{{time1Week}}）</view>
					<view class="allline"></view>
					<!-- <image class="w-35 h-35" src="/static/youjiantou1.png"></image> -->
				</view>
				<view class="huanhang">
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
						@click.stop="tohetong1()">
						<view style="font-weight: bold;" class="fs-30">{{yjgkInfo.week.count}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">已签合同数</view>
					</view>
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
						@click.stop="tozhanweiList">
						<view style="font-weight: bold;" class="fs-30">{{toSumBiaozhan(yjgkInfo.week.totalArea)}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">已售展位数</view>
					</view>
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
						@click.stop="tohetong1()">
						<view style="font-weight: bold;" class="fs-30">{{yjgkInfo.week.zongjine}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">合同总金额</view>
					</view>
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
						@click.stop="tohetong1()">
						<view style="font-weight: bold;" class="fs-30">￥{{yjgkInfo.week.yishou}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">已收总金额</view>
					</view>
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
						@click.stop="tohetong1()">
						<view style="font-weight: bold;" class="fs-30">￥{{yjgkInfo.week.weishou}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">未收总金额</view>
					</view>

				</view>
			</block>


			<block v-if="yjgkInfo.month">

				<view class="roww p-all-30 border_bottom">
					<view>月业绩（{{time1Month}}）</view>
					<view class="allline"></view>
					<!-- <image class="w-35 h-35" src="/static/youjiantou1.png"></image> -->
				</view>

				<view class="huanhang">
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;">
						<view style="font-weight: bold;" class="fs-30">{{yjgkInfo.month.count}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">已签合同数</view>
					</view>
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
						@click.stop="tozhanweiList">
						<view style="font-weight: bold;" class="fs-30">{{toSumBiaozhan(yjgkInfo.month.totalArea)}}
						</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">已售展位数</view>
					</view>
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;">
						<view style="font-weight: bold;" class="fs-30">{{yjgkInfo.month.zongjine}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">合同总金额</view>
					</view>
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;">
						<view style="font-weight: bold;" class="fs-30">￥{{yjgkInfo.month.zongjine}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">已收总金额</view>
					</view>
					<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;">
						<view style="font-weight: bold;" class="fs-30">￥{{yjgkInfo.month.weishou}}</view>
						<view class="h-15"></view>
						<view style="font-size: 25rpx;color:#999999;">未收总金额</view>
					</view>
				</view>
			</block>
		</block>

		<block v-if="managementType==2">
			<view class="p-all-30">观众模块</view>
			<view class="huanhang" v-if="turnoutNum">
				<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
					@click.stop="toyudengji">
					<view style="font-weight: bold;" class="fs-45" v-if="turnoutNum.params">
						{{ turnoutNum.params.referrerCount ? turnoutNum.params.referrerCount : 0 }}
					</view>
					<view class="h-15"></view>
					<view style="font-size: 25rpx;color:#999999;">已邀观众</view>
				</view>
				<view class="colonn fs-30 center_center w-250 h-150 rowsba" style="border: 1px solid #f5f5f5;"
					@click.stop="toyudengji">
					<view style="font-weight: bold;" class="fs-45" v-if="turnoutNum.params">
						{{ turnoutNum.params.referrerArriveCount ? turnoutNum.params.referrerArriveCount : 0 }}
					</view>
					<view class="h-15"></view>
					<view style="font-size: 25rpx;color:#999999;">已入场观众</view>
				</view>
			</view>
		</block>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				option: {
					'series': null
				},
				option1: {
					'series': null
				},
				option2: {
					'series': null
				},
				option3: {
					'series': null
				},
				menuType: ['管理者', '业务员', '企业'],
				managementType: 1, //1.管理者 2.业务员 3.企业
				exhTypeList: [], //展会类型列表
				exhTyppeIndex: -1, //选择的展会项目部下标
				exhIndex: -1, //选择的展会的下标
				exhList: [], //展会列表
				zsglInfo: {}, //展商概览
				yjgkInfo: {
					'allExh': null,
					'month': null,
					'week': null,
					'year': null,
				}, //业绩概况
				turnoutNum: {
					params: null
				}, //邀约信息
				bingData: null,

				qiyeExh: [], //企业参加展会列表
				qiyeExhIndex: -1,
				qiyebooths: [], //企业已预定展位
				qiyeservices: [], //企业服务
				banners: [], //轮播图

				time1Week: "", //当前周的时间
				time1Month: "", //当前月的时间
			}
		},
		onLoad() {

			var userInfo = uni.getStorageSync("userInfo");
			if (!userInfo) {
				this.$tools.showToast("请先登录");
				setTimeout(res => {
					uni.clearStorageSync();
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}, 1000)
			}

			var identityType = uni.getStorageSync("identityType");
			if (identityType == 1) {
				this.managementType = 3;
				this.getuserexhlist();
			} else if (identityType == 2) {
				this.managementType = 2;
				this.getExhList();
			}
			this.carousellistGet();

			var time1Week = this.getCurrentWeekRange();
			var time1Month = this.getCurrentMonthRange();
			this.time1Week = time1Week;
			this.time1Month = time1Month;
		},
		onReady() {},
		methods: {

			getCurrentWeekRange() {
				const today = new Date();
				const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
				const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate difference to Monday
				const monday = new Date(today);
				monday.setDate(today.getDate() + diffToMonday); // Get Monday's date

				const sunday = new Date(monday);
				sunday.setDate(monday.getDate() + 6); // Get Sunday's date (6 days after Monday)

				const formatDate = (date) => {
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, '0');
					const day = String(date.getDate()).padStart(2, '0');
					return `${year}.${month}.${day}`;
				};
				return `${formatDate(monday)} - ${formatDate(sunday)}`;
			},
			getCurrentMonthRange() {
				const today = new Date();
				const year = today.getFullYear();
				const month = today.getMonth(); // 0 (January) to 11 (December)

				const firstDay = new Date(year, month, 1); // First day of the month
				const lastDay = new Date(year, month + 1, 0); // Last day of the month

				const formatDate = (date) => {
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, '0');
					const day = String(date.getDate()).padStart(2, '0');
					return `${year}.${month}.${day}`;
				};

				return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
			},


			// 计算合计多少标展
			toSumBiaozhan(area) {
				area = area / 9;
				area = area.toFixed(2);
				return area;
			},

			// 获取轮播图
			carousellistGet() {
				var data = {
					'pageSize': '1000',
					'pageNum': '1'
				};
				this.$axios
					.axios('get', this.$paths.carousellist, data)
					.then((res) => {
						if (res.code == 200) {
							this.banners = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},

			//商家接口开始
			exhChangeQiye(res) {
				this.qiyeExhIndex = parseInt(res.detail.value);

				this.getbooths();
			},

			// 获取已预定得展位和
			getbooths() {
				var userInfo = uni.getStorageSync("userInfo");
				var data = {
					exhId: this.qiyeExh[this.qiyeExhIndex].id,
					pageSize: 1000,
					exhibitorId: userInfo.exhibitorId
				};
				this.$axios
					.axios('get', this.$paths.customerbuybooth, data)
					.then((res) => {
						if (res.code == 200) {
							this.qiyebooths = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
				this.$axios
					.axios('get', this.$paths.customerbuyservice, data)
					.then((res) => {
						if (res.code == 200) {
							this.qiyeservices = res.rows;
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			// 获取商家  参加的展会
			getuserexhlist() {
				var userInfo = uni.getStorageSync("userInfo");
				var data = {
					exhibitorId: userInfo.exhibitorId
				};
				this.$axios
					.axios('get', this.$paths.userexhlist, data)
					.then((res) => {
						if (res.code == 200) {
							this.qiyeExh = res.rows;
							if (this.qiyeExh.length > 0) {
								this.qiyeExhIndex = 0;
								this.getbooths();
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},

			// 商家接口结束
			// 签单排行 (统计图展示)
			infosaleranking() {
				// exhId
				var data = {
					exhId: this.exhList[this.exhIndex].id,
				};
				this.$axios
					.axios('POST', this.$paths.infosaleranking, data)
					.then((res) => {
						if (res.code == 200) {

							var thisMonth = res.thisMonth;
							var thisWeek = res.thisWeek;

							var weeksArea = [
								[],
								[]
							];
							for (var a = 0; a < thisWeek.length; a++) {
								weeksArea[0].push(thisWeek[a].params.nickName);
								weeksArea[1].push(thisWeek[a].params.zongjine);
							}
							var monthsArea = [
								[],
								[]
							];
							for (var a = 0; a < thisMonth.length; a++) {
								monthsArea[0].push(thisMonth[a].params.nickName);
								monthsArea[1].push(thisMonth[a].params.zongjine);
							}

							this.loadbin(weeksArea, monthsArea);

						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},
			loadbin(weeksArea, monthsArea) {
				this.option2 = {
					title: {
						text: '每个周的业绩',
						left: 'center'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line' // 默认为直线，可选为：'line' | 'shadow'
						},
						confine: true
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666',
							interval: 0, // 显示所有标签,
							rotate: 90, // 旋转30度  
						},
						data: weeksArea[0],
					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}],
					series: [{
						name: '金额',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},

						barGap: '200px',
						data: weeksArea[1],
					}]
				};



				this.option3 = {
					title: {
						text: '每个人的月业绩',
						left: 'center'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line' // 默认为直线，可选为：'line' | 'shadow'
						},
						confine: true
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666',
							interval: 0, // 显示所有标签,
							rotate: 90, // 旋转30度  
						},
						data: monthsArea[0],

					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}],
					series: [{
						name: '金额',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						barGap: '200px',
						data: monthsArea[1],
					}]
				};
			},

			// 展位售出情况
			staffinfoboothGet() {
				var data = {
					exhId: this.exhList[this.exhIndex].id,
				};
				this.$axios
					.axios('POST', this.$paths.staffinfobooth, data)
					.then((res) => {
						if (res.code == 200) {
							this.bingData = res.data.params;
							this.bingChange();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch((err) => {});
			},

			// 饼状图数据修改
			bingChange() {
				this.option = {
					backgroundColor: "#ffffff",
					title: {
						text: '展位售卖情况',
						left: 'center'
					},
					series: [{
						label: {
							normal: {
								fontSize: 14
							}
						},
						type: 'pie',
						center: ['50%', '50%'],
						radius: ['0%', '40%'],
						data: [{
							value: this.bingData.bindContractArea,
							name: '已售面积' + '（' + this.bingData.bindContractArea + 'm）'
						}, {
							value: this.bingData.noBindArea,
							name: '未售面积' + '（' + this.bingData.noBindArea + 'm）'
						}, {
							value: this.bingData.bindNoContractArea,
							name: '签售中面积' + '（' + this.bingData.bindNoContractArea + 'm）'
						}]
					}],

				};
			},


			// 观众模块
			getPeople() {
				var userInfo = uni.getStorageSync("userInfo");
				var data = {
					exhId: this.exhList[this.exhIndex].id,
					referrerId: userInfo.phonenumber
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
			// 获取业绩概况  /api/sign/staff/exh/info/sale
			infosaleexhGet() {
				var data = {
					'exhId': this.exhList[this.exhIndex].id,
					'userId': ""
				}
				var userInfo = uni.getStorageSync("userInfo");
				if (!userInfo) {
					this.$tools.showToast("请先登录");
					return false;
				}
				data.userId = userInfo.userId;
				this.$axios
					.axios('POST', this.$paths.infosaleexh, data)
					.then(res => {
						if (res.code == 200) {
							console.log("业绩概况", res);
							this.yjgkInfo = {
								'allExh': res.count.params,
								'month': res.thisMonth.params,
								'week': res.thisWeek.params,
								'year': res.thisYear.params,
							}
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取展商概况（业务员）
			exhinfoexhibitorGet() {
				var data = {
					'exhId': this.exhList[this.exhIndex].id,
					'userId': ""
				}
				var userInfo = uni.getStorageSync("userInfo");
				if (!userInfo) {
					this.$tools.showToast("请先登录");
					return false;
				}
				data.userId = userInfo.userId;
				this.$axios
					.axios('POST', this.$paths.exhinfoexhibitor, data)
					.then(res => {
						if (res.code == 200) {
							this.zsglInfo = res.data.params;
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			zhanhuiGets() {
				// 获取展商概况
				this.exhinfoexhibitorGet();
				// 获取业绩概况
				this.infosaleexhGet();
				// 获取邀请观众数量
				this.getPeople();
				this.staffinfoboothGet();
				this.infosaleranking();
			},
			// 业务员展会修改方法
			exhChange(res) {
				this.exhIndex = (res.detail.value);
				uni.setStorageSync("exhIndex", this.exhIndex + 1);
				uni.setStorageSync("exhId", this.exhList[this.exhIndex].id);
				uni.setStorageSync("exhInfo", this.exhList[this.exhIndex]);
				var identityType = uni.getStorageSync("identityType");
				if (identityType == 1) {
					this.getbooths();
				} else {
					this.zhanhuiGets();
				}
			},
			// 业务员展会类型修改函数
			exhTypeChange(res) {
				this.exhTyppeIndex = parseInt(res.detail.value);
				this.exhIndex = -1;
				uni.removeStorageSync("exhId");
				this.getExhListYw();
				// 保存选择的展会下标
				uni.setStorageSync("exhTyppeIndex", this.exhTyppeIndex);
			},
			// 业务员获取展会类型列表
			getExhList() {
				var data = {
					pageSize: "1000",
					pageNum: "1",
				}
				this.$axios
					.axios('get', this.$paths.exhtypelist, data)
					.then(res => {
						if (res.code == 200) {
							this.exhTypeList = res.rows;
							var exhTyppeIndex = uni.getStorageSync("exhTyppeIndex");
							if (exhTyppeIndex) {
								this.exhTyppeIndex = parseInt(exhTyppeIndex);
								this.getExhListYw();
							} else {
								uni.setStorageSync("exhTypeList", this.exhTypeList);
							}
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 业务员获取展会列表
			getExhListYw() {
				var data = {
					pageSize: "100",
					pageNum: "1",
					typeId: "",
				}
				var exhTyppeIndex = this.exhTyppeIndex;
				if (exhTyppeIndex >= 0) {
					data.typeId = this.exhTypeList[this.exhTyppeIndex].id
				}
				this.$axios
					.axios('get', this.$paths.exhtlist, data)
					.then(res => {
						if (res.code == 200) {
							this.exhList = res.rows;
							uni.setStorageSync("exhList", this.exhList);
							var exhIndex = uni.getStorageSync("exhIndex");
							if (exhIndex) {
								exhIndex = parseInt(exhIndex) - 1
								if (exhIndex <= (this.exhList.length - 1)) {
									this.exhIndex = (exhIndex);
									this.zhanhuiGets();
								}
							}
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 获取展会列表(企业获取)  exhlistuser
			exhlistuser() {
				var data = {
					pageSize: "100",
					pageNum: "1",
					exhibitorId: "",
				}
				var userInfo = uni.getStorageSync("userInfo");
				if (userInfo) {
					data.exhibitorId = userInfo.exhibitorId;
				}
				this.$axios
					.axios('get', this.$paths.exhlistuser, data)
					.then(res => {
						if (res.code == 200) {
							this.exhList = res.rows;
							uni.setStorageSync("exhList", this.exhList);
						} else {
							this.$tools.showToast(res.msg)
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 菜单点击事件
			menuTypeClick(index) {
				this.managementType = index + 1;
				if (this.managementType == 1) {
					// this.loadbin();
				}
			},
			addContract() {
				// uni.navigateTo({
				// 	url: "/pages1/addContract/addContract"
				// })
				var exhId = uni.getStorageSync("exhId");
				if (!exhId) {
					this.$tools.showToast("请先选择具体展会");
					return false;
				}

				uni.navigateTo({
					url: "/pages2/exhibitorList/exhibitorList"
				})
			},

			toyudengji() {
				uni.navigateTo({
					url: "/pages1/yudengji/yudengji"
				})
			},
			// 前往展位列表
			tozhanweiList() {
				uni.navigateTo({
					url: "/pages1/zhanweiList/zhanweiList"
				})
			},
			// 前往周业绩月业绩
			tozyjph(type) {
				var exhId = uni.getStorageSync("exhId");
				if (!exhId) {
					this.$tools.showToast("请先选择展会");
					return false;
				}
				if (type == 3) {
					uni.navigateTo({
						url: "/pages1/yudengji/yudengji"
					})
					return;
				}
				uni.navigateTo({
					url: "/pages1/zhouyejipaihang/zhouyejipaihang?type=" + type
				})
			},
			tozyjph1(type) {
				uni.navigateTo({
					url: "/pages3/daozhangPaihang/daozhangPaihang?type=" + type
				})
			},
			// 前往合同列表
			tohetong1() {
				uni.navigateTo({
					url: "/pages1/hetongList/hetongList"
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>