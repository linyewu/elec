<template>
	<div class="tenantCharge">
		<el-form ref="form" :model="form" label-width="80px">
			<el-row>
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<el-form-item label="房间号">
							<el-select v-model="form.roomId" placeholder="请选择房间号">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple-light">
						<el-form-item label="时间区间">
							<el-select v-model="form.roomId" placeholder="请选择时间区间">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<el-form-item label="显示方式">
							<el-select v-model="form.roomId" placeholder="请选择显示方式">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple-light"></div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<el-button type="primary" @click="">确定</el-button>
					</div>
				</el-col>
				<!-- <el-col :span="4">
					<div class="grid-content bg-purple-light"></div>
				</el-col> -->
			</el-row>


		</el-form>

		<div class="min-body">
			<!--start echarts表格-->
			<div id="myChart" ref="mychart" style="width: 500px;height:200px;"></div>
			<!--end echarts表格-->

		</div>
	</div>

</template>

<script>
	// 引入
	import axios from 'axios'

	import echarts from 'echarts'

	export default {
		data() {
			return {
				form: {
					roomId: ''
				}
			}
		},
		created() {
			console.log('进入')
			var that = this
			this.$nextTick(() => {
				let myChart = that.$echarts.init(document.getElementById('myChart'));
				// let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					title: {
						text: '用电情况'
					},
					tooltip: {},
					xAxis: {
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: [{
						type: 'value',
						show: true, //显示纵轴false-不显示，true-显示
						name: '次/每分钟' //这里是纵轴标题
					}],
					toolbox: {
						show: true,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {
								readOnly: false
							},
							magicType: {
								type: ['line', 'bar']
							},
							restore: {},
							saveAsImage: {}
						}
					},
					series: [{
						name: '销量',
						type: 'line',
						data: [820, 932, 901, 934, 1290, 1330, 1320]
					}]
				});
			});
		},
		updated() {},
		mounted() {},
		methods: {}
	}
</script>

<style lang="less" scoped>


</style>
