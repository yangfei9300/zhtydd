<template>
	<view class="container">
		<view class="container-wrap">
			<echarts ref="echarts" :option="option" canvasId="echarts"></echarts>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option: {}
			}
		},
		onReady() {
			this.option = {
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
						name: '北京'
					}, {
						value: 20,
						name: '武汉'
					}, {
						value: 10,
						name: '杭州'
					}, {
						value: 20,
						name: '广州'
					}, {
						value: 38,
						name: '上海'
					}]
				}]
			};
		}
	}
</script>
