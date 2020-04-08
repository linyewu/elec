<template>
	<div class="roles">
		<!-- 查询和添加 -->
		<div class="sys-research">
			<el-row class="row-search">
				<el-col :span="8">
					<!-- 查询 -->
					<el-input placeholder="请输入搜索内容" v-model="searchText" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="searchCustomers"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button plain @click="tenantDialogVisible = true">添加租户</el-button>
				</el-col>
				<el-col :span="4">
					<el-button plain @click="roomDialogVisible = true">添加房间</el-button>
				</el-col>
			</el-row>
		</div>
		<!-- start 添加租户弹窗 -->
		<el-dialog title="租户添加" :visible.sync="tenantDialogVisible" @close="closeRoleAddDialog" width="30%">
			<el-form label-width="80px" :model="tenantForm" :rules="rules" ref="addtenantFormRef">
				<el-form-item label="房间号" prop="roomId">
					<el-input v-model="tenantForm.roomId"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="tenantForm.phone"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="tenantDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addTenant('addtenantFormRef')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- end 添加租户弹窗 -->
		<!-- start 添加房间弹窗 -->
		<el-dialog title="房间添加" :visible.sync="roomDialogVisible" @close="closeRoomAddDialog" width="30%">
			<el-form label-width="80px" :model="roomForm" :rules="rules" ref="addroomFormRef">
				<el-form-item label="房间号" prop="roomId">
					<el-input v-model="roomForm.roomId"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="roomForm.address"></el-input>
				</el-form-item>
				<el-form-item label="价格" prop="price">
					<el-input v-model="roomForm.price"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="roomDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRoom('addroomFormRef')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- end 添加房间弹窗 -->
		<!-- start 编辑租户弹窗 -->
		<el-dialog title="租户编辑" :visible.sync="tenantEditDialogVisible" width="30%">
			<el-form label-width="80px" :rules="rules" :model="tenantEditForm">
				<el-form-item label="房间号" prop="roomId">
					<el-input v-model="tenantEditForm.roomId"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="tenantEditForm.phone"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="tenantEditDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editTenant">确 定</el-button>
			</span>
		</el-dialog>
		<!-- end 编辑租户弹窗 -->
		<!-- 表格 -->
		<el-table :data="tenantList.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" border>
			<!-- 可展开行 -->

			<el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
			<el-table-column prop="name" label="姓名" width="170" align="center"></el-table-column>
			<el-table-column prop="sex" label="性别" width="170" align="center"></el-table-column>
			<el-table-column prop="roomId" label="房间号" width="170" align="center"></el-table-column>
			<el-table-column prop="phone" label="电话" width="170" align="center"></el-table-column>
			<el-table-column prop="enabled" label="通断电" width="170" align="center">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.enabled" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
					 inactive-value="0" @change="changeUserState(scope.row)"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button size="mini" plain type="primary" icon="el-icon-edit" @click="handleEditTenant(scope.$index, scope.row)">编辑
					</el-button>
					<el-button size="mini" plain type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.customerId)">删除
					</el-button>

				</template>
			</el-table-column>
		</el-table>
		<!-- start 分页 -->
		<div style="margin-top: 10px;text-align: center">
			<el-pagination @size-change="handleSizeChange" @current-change="changePage" :current-page.sync="currentPage"
			 :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<!-- end 分页 -->
	</div>

</template>

<script>
	// 引入
	import axios from 'axios'

	export default {
		data() {
			var checkPhone = (rule, value, callback) => {
				const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
				if (!value) {
					return callback(new Error('电话号码不能为空'))
				}
				setTimeout(() => {
					// Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
					// 所以我就在前面加了一个+实现隐式转换

					if (!Number.isInteger(+value)) {
						callback(new Error('请输入数字值'))
					} else {
						if (phoneReg.test(value)) {
							callback()
						} else {
							callback(new Error('电话号码格式不正确'))
						}
					}
				}, 100)
			}

			return {
				searchText: '', // 角色查询内容
				tenantDialogVisible: false,
				tenantEditDialogVisible: false,
				roomDialogVisible: false,
				tenantForm: {
					roomId: '',
					phone: ''
				},
				roomForm: {
					roomId: '',
					address: '',
					price: ''
				},
				tenantEditForm: {
					roomId: '',
					phone: ''
				},
				popoverRole: true,
				total: 0,
				pageSize: 10,
				currentPage: 1,
				tenantList: [{
					name: '小黄',
					sex: '男',
					roomId: '302',
					phone: '15415263698',
					enabled: ''
				}],
				// 树形控件的数据
				rightsTree: [],

				// Tree树形控件，默认使用数据中的 label 属性作为节点名称，使用 children 属性指定该接待你的子节点
				// 但是，如果我们自己的数据结构与默认的结构不同，可以通过 defaultProps 来修改默认的两个属性
				defaultProps: {
					// children: 'children',
					label: 'authName'
				},
				// 当前被分配权限的角色id
				roleId: -1,
				rules: {
					phone: [{
						validator: checkPhone,
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.searchCustomers()
		},
		methods: {
			// 查询
			searchCustomers() {
				var _this = this
				var customerName = _this.searchText

				axios.post('restful/customer/select', {
						'customerName': customerName === '' ? '' : _this.searchText
					}, {
						headers: {
							'content-type': 'application/json'
						},
						withCredentials: true
					}).then(function(response) {
						//          _this.customerList = response.data.customers
						//          _this.total = response.data.customers.length
						//      console.log(_this.customerList)
					})
					.catch(function(error) {
						console.log(error)
					})

			},
			// 添加角色
			addTenant() {
				var _this = this
				axios.post('restful/customer/add',
						_this.tenantForm, {
							headers: {
								'content-type': 'application/json'
							},
							withCredentials: true
						}).then(function(response) {
						console.log(response)
						if (response.data.returnCode === '1111') {
							_this.tenantDialogVisible = false
							_this.searchCustomers()
							_this.$message({
								type: 'success',
								message: '添加监护人成功'
							})
						} else {
							_this.$message({
								type: 'error',
								message: '添加监护人失败'
							})
						}
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			addRoom(){
				
			},
			// 关闭添加角色对话框
			closeRoleAddDialog() {
				// 重置表单
				this.$refs.addtenantFormRef.resetFields()
			},
			closeRoomAddDialog(){
				this.$refs.addroomFormRef.resetFields()
			},
			// 编辑
			editTenant() {
				var _this = this
				axios.post('restful/customer/update', _this.tenantEditForm, {
						headers: {
							'content-type': 'application/json'
						},
						withCredentials: true
					}).then(function(response) {
						console.log(response)
						if (response.data.returnCode === '1111') {
							_this.tenantEditDialogVisible = false
							_this.$message({
								type: 'success',
								message: '编辑监护人信息成功'
							})
							_this.searchCustomers()
						} else {
							_this.$message({
								type: 'error',
								message: '编辑监护人信息失败'
							})
						}
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			// 删除
			async deleteRole(customerId) {
				console.log(customerId)

				var _this = this
				try {
					await _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					console.log(customerId)
					axios.post('restful/customer/delete', {
							'customerId': customerId
						}, {
							headers: {
								'content-type': 'application/json'
							},
							withCredentials: true
						}).then(function(response) {
							console.log(response)
							if (response.data.returnCode === '1111') {
								_this.$message({
									type: 'success',
									message: '删除信息成功'
								})
							}
							_this.searchCustomers()
						})
						.catch(function(error) {
							console.log(error)
						})
				} catch (err) {
					// 取消删除
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				}
			},
			// 编辑信息
			handleEditTenant(index, row) {
				this.tenantEditDialogVisible = true
				this.tenantEditForm = Object.assign({}, row) // 解决修改弹出框数据时，表格数据会发生同步改变
				// console.log(row)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
				this.pageSize = val
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
				this.currentPage = val
			},
			changePage(val) {
				console.log(`当前页: ${val}`)
				this.currentPage = val
			},

			// 给角色分配权限
			async assignRights() {}
		}
	}
</script>

<style lang="less" scoped>
	.sys-research {
		height: 60px;
		padding: 20px 20px 0;
	}

	.level1 {
		border-bottom: 1px dotted #ccc;
		padding: 10px 0;

		&:last-child {
			border: 0;
		}
	}

	.level2 {
		padding: 5px 0;
	}

	.level3 {
		margin: 3px;
	}
</style>
