<template>
	<div class="home_main">

		<el-container>
			<el-header><span style="color: black;font-size: 30px;">个人资料</span><br /><br /><br /></el-header>
			<el-container>

				<el-main>
					<!-- <span style="float: left;color: #999999;font-size: 30px;">Id: {{this.famiyList.familyId}}</span><br /><br /><br /><hr /> -->
					<span style="float: left;color: black;font-size: 20px;">用户名: {{this.Info.username}}</span>
					<el-button style="float: right;margin-right: 20px;" type="primary" @click="handleeditMessage">修改资料</el-button>
					<el-button style="float: right;margin-right: 20px;" type="primary" @click="handleeditPassword">修改密码</el-button>
					<br /><br /><br />
					<span style="float: left;color: black;font-size: 20px;">性别: {{this.Info.gender}}</span><br /><br /><br />
					<span style="float: left;color: black;font-size: 20px;">角色: {{this.Info.role_type}}</span><br /><br /><br />
					<span style="float: left;color: black;font-size: 20px;">电话: {{this.Info.phone_number}}</span><br /><br /><br />

					<!-- start 编辑资料弹窗 -->
					<el-dialog title="编辑资料" :visible.sync="messageEditDialogVisible" width="30%">
						<el-form label-width="80px" :model="messageEditForm" ref="messageEditForm">
							<el-form-item label="用户名" prop="username">
								<el-input v-model="messageEditForm.username"></el-input>
							</el-form-item>
							<el-form-item label="性别" prop="gender">
								<el-select v-model="messageEditForm.gender" placeholder="请选择活动区域">
									<el-option label="男" value="male"></el-option>
									<el-option label="女" value="female"></el-option>
								</el-select>
								<!-- <el-input v-model="messageEditForm.sex"></el-input> -->
							</el-form-item>
							<!-- <el-form-item label="地址" prop="room_id">
								<el-input v-model="Info.room_id"></el-input>
							</el-form-item> -->
							<el-form-item label="电话" prop="phone_number">
								<el-input v-model="messageEditForm.phone_number"></el-input>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="messageEditDialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="editOnwerInfo">确 定</el-button>
						</span>
					</el-dialog>
					<!-- end 编辑资料弹窗 -->
					<!-- start 编辑密码弹窗 -->
					<el-dialog title="修改密码" :visible.sync="passwordEditDialogVisible" width="30%">
						<el-form label-width="80px" class="demo-ruleForm" status-icon :rules="rules2" ref="passwordEditForm" :model="passwordEditForm">
							<el-form-item label="原密码" prop="oldPassword">
								<el-input type="password" v-model="passwordEditForm.re_password"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="familyPassword">
								<el-input type="password" v-model="passwordEditForm.password" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="familyPassword2">
								<el-input type="password" v-model="passwordEditForm.password2" auto-complete="off"></el-input>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="resetForm('passwordEditForm')">取 消</el-button>
							<el-button type="primary" @click="editPassword('passwordEditForm')">确 定</el-button>
						</span>
					</el-dialog>
					<!-- end 编辑密码弹窗 -->

				</el-main>

			</el-container>
		</el-container>
	</div>
</template>
<style scoped>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
<script>
	import axios from 'axios'

	export default {
		data() {

			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.passwordEditForm.password2 !== '') {
						this.$refs.passwordEditForm.validateField('password2');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.passwordEditForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				passwordEditDialogVisible: false,
				messageEditDialogVisible: false,
				messageEditForm: {
					username: '',
					phone_number: '',
					gender: '',
					xingming: '2'
				},
				passwordEditForm: {
					re_password: '',
					password: '',
					password2: ''
				},
				personName: '',
				familyPhone: '',
				familyTouPic: '',
				Info: {
					username: '',
					phone_number: '',
					role_type: '',
					gender: ''
				},
				rules2: {
					password: [{
							validator: validatePass,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '密码长度为6-20个字符',
							trigger: 'blur'
						}
					],
					password2: [{
							validator: validatePass2,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '密码长度为6-20个字符',
							trigger: 'blur'
						}
					]
				}
			}

		},
		created() {
			this.personName = localStorage.getItem('user_name')
			this.familyPhone = localStorage.getItem('familyPhone')
			this.searchOnwerInfo()

		},
		methods: {
			searchOnwerInfo() {
				var _this = this
				axios.get('api/users/1/', {}, {
						headers: {
							'content-type': 'application/json'
						},
						withCredentials: true
					}).then(function(response) {
						console.log(response)
						var data = response.data
						_this.Info.username = data.username
						_this.Info.phone_number = data.phone_number
						if (data.gender === 'male') {
							_this.Info.gender = '男'
						} else {
							_this.Info.gender = '女'
						}
						if (data.role_type === 'LANDLORD') {
							_this.Info.role_type = '房东'
						} else {
							_this.Info.role_type = '租客'
						}
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			editOnwerInfo() {
				var _this = this
				axios.put('api/users/1/',
						_this.messageEditForm, {
							headers: {
								'content-type': 'application/json'
							},
							withCredentials: true
						}).then(function(response) {
						console.log(response)
						if (response.status === 200) {
							_this.messageEditDialogVisible = false
							_this.resetForm('messageEditForm')
							_this.$message({
								type: 'success',
								message: '修改资料成功'
							})
							_this.searchOnwerInfo()
						} else {
							_this.$message({
								type: 'error',
								message: '修改资料失败'
							})
						}

					})
					.catch(function(error) {
						console.log(error)
					})
			},
			editPassword(formName) {

				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.passwordEditForm.password == this.passwordEditForm.password) {
							console.log('密码对比')
							var _this = this
							axios.post('api/users/set_password/', _this.passwordEditForm, {
									headers: {
										'content-type': 'application/json'
									},
									withCredentials: true
								}).then(function(response) {
									console.log(response)
									if (response.status === 200) {
										_this.passwordEditDialogVisible = false
										_this.resetForm('passwordEditForm')
										_this.$message({
											type: 'success',
											message: '修改密码成功'
										})
										_this.searchOnwerInfo()
									} else {
										_this.$message({
											type: 'error',
											message: '修改密码失败'
										})
									}
								})
								.catch(function(error) {
									console.log(error)
								})
						} else {
							alert('原密码不正确')
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				})


			},

			handleeditPassword() {
				console.log('编辑密码')
				var _this = this
				_this.passwordEditForm.familyPhone = _this.familyPhone
				_this.passwordEditDialogVisible = true
			},
			handleeditMessage() {
				console.log('编辑资料')
				var _this = this
				_this.messageEditDialogVisible = true
				_this.messageEditForm.username = _this.Info.username
				_this.messageEditForm.gender = _this.Info.gender
				_this.messageEditForm.phone_number = _this.Info.phone_number
			},
			resetForm(formName) {
				this.messageEditDialogVisible = false
				this.passwordEditDialogVisible = false
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
