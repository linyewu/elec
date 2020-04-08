<template>
	<el-row class="login" type="flex" justify="center" align="middle">
		<el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
			<el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="login-form">
				<div style="height: 40px;text-align: left;">
					<span style="font-size: 15px;">用户注册</span>
				</div>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="loginForm.username"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone_number">
					<el-input v-model="loginForm.phone_number"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="loginForm.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="rePassword">
					<el-input type="password" v-model="loginForm.rePassword"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="role_type">
					<el-select v-model="loginForm.role_type" placeholder="请选择角色">
						<el-option label="房东" value="LANDLORD"></el-option>
						<el-option label="租户" value="TENANT"></el-option>
					</el-select>
					<!-- <el-input v-model="loginForm.role"></el-input> -->
				</el-form-item>
				<el-form-item>
					<el-button class="green" @click="submitForm">注册</el-button>
					<el-button @click="resetForm('loginForm')">重置</el-button>
				</el-form-item>
				<a style="float: right;" @click="goLoginIn">立即登录</a>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
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
				// 表单数据
				loginForm: {
					phone_number: '',
					username: '',
					password: '',
					role_type: '',
					rePassword: ''
				},
				user: '',
				familyTouPic: '',
				familyPhone: '',
				oldId: '',
				// 表单验证规则
				rules: {
					phone_number: [{
							required: true,
							message: '请输入电话',
							trigger: 'blur'
						},
						{
							validator: checkPhone,
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '密码长度为6-20个字符',
							trigger: 'blur'
						}
					],
					rePassword: [{
							required: true,
							message: '请输入确认密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '密码长度为6-20个字符',
							trigger: 'blur'
						}
					],
					role_type: [{
						required: true,
						message: '请选择角色',
						trigger: 'blur'
					}],
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			resetForm() {
				// 重置表单
				this.$refs.loginForm.resetFields()
			},
			goLoginIn(){
				this.$router.push({
					path: '/login'
				})
			},
			submitForm(formName) {
				console.log(formName)
				var _this = this
				if(_this.loginForm.password != _this.loginForm.rePassword){
					_this.$message({
						type: 'error',
						message: '确认密码与密码不正确'
					})
				}else{
					axios.post('api/users/',
							_this.loginForm, {
								headers: {
									'content-type': 'application/json'
								},
								withCredentials: true
							}).then(function(response) {
							console.log(response)
							if(response.status === 201){
								console.log('success')
								_this.$message({
									type: 'success',
									message: '注册成功'
								})
								_this.$refs.loginForm.resetFields()
							}else{
								_this.$message({
									type: 'error',
									message: '注册失败'
								})
							}
							
						})
						.catch(function(error) {
							console.log(error)
						})
				}
				

			}
		}
	}
</script>

<style scoped>
	.login {
		height: 100vh;
		background-color: #52BAB5;
	}

	.login-form {
		padding: 25px;
		border-radius: 15px;
		background-color: #fff;
	}

	.green {
		background-color: #52BAB5;
		color: #fff;
	}
</style>
