<template>
	<view>
		<view class="colonn  ">
			<scroll-view class="pore h-500" scroll-x style="width: 750rpx;">
				<view class="container" style="">
					<view class="container-wrap">
						<echarts 
						 v-if="option2.series"
						style="width: 1500rpx;" 
						ref="echarts2" :option="option2" canvasId="echarts2">
						</echarts>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="h-100"> </view>
		<!-- 月业绩 -->
		<view class="colonn  ">
			<scroll-view class="pore h-500" scroll-x style="width: 750rpx;">
				<view class="container" style="">
					<view class="container-wrap">
						<echarts 
						 v-if="option3.series"
						style="width: 1500rpx;" ref="echarts3" :option="option3" canvasId="echarts3">
						</echarts>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},
		onLoad() {
			this.loadbin()
		},
		methods: {
			loadbin() {
				this.option = {
					title: {
						text: '展位售卖情况',
						left: 'center'
					},
					backgroundColor: "#ffffff",
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
							value: 55,
							name: '已售卖展位'
						}, {
							value: 20,
							name: '未售出展位'
						}, {
							value: 20,
							name: '签售中展位'
						}]
					}]
				};
			
			
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
						data: ['李强', '邵明阳', '张孝丽', '陈丽', '刘医', '孙晶晶', '时佰卿', '吕文豪', '孙娟', '李强', '邵明阳', '张孝丽',
							'陈丽', '刘医', '孙晶晶', '时佰卿', '吕文豪', '孙娟'
						],
			
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
						name: '热度',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
			
						barGap: '200px',
						data: [400, 370, 140, 444, 800, 670, 440, 344, 528, 400, 370, 140, 444, 800, 670, 440,
							344, 528
						],
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
						data: ['李强', '邵明阳', '张孝丽', '陈丽', '刘医', '孙晶晶', '时佰卿', '吕文豪', '孙娟', '李强', '邵明阳', '张孝丽',
							'陈丽', '刘医', '孙晶晶', '时佰卿', '吕文豪', '孙娟'
						],
			
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
						name: '热度',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
			
						barGap: '200px',
						data: [400, 370, 140, 444, 800, 670, 440, 344, 528, 400, 370, 140, 444, 800, 670, 440,
							344, 528
						],
					}]
				};
				console.log("---",this.option,this.option2,this.option3);
			
			
			},
		}
	}
</script>

<style>
@import url(tongjitu.css);
</style>
