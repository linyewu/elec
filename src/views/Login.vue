<template>
	<el-row class="login" type="flex" justify="center" align="middle">
		<el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
			<el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="login-form">
				<div style="height: 80px;text-align: left;">
					<span style="font-size: 30px;">租房管理系统</span>
				</div>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="loginForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="loginForm.password"></el-input>
				</el-form-item>

				
				<el-form-item>
					<el-button class="green" @click="submitForm">登录</el-button>
					<el-button @click="resetForm('loginForm')">重置</el-button>
				</el-form-item>
				<a style="float: right;" href="#" @click="goRegister">立即注册</a>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	import axios from 'axios'
	export default {

		data() {
			
			return {
				// 表单数据
				loginForm: {
					username: '',
					password: ''
				},
				user: '',
				familyTouPic: '',
				familyPhone: '',
				oldId: '',
				// 表单验证规则
				rules: {
					
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
					username: [{
						required: true,
						message: '请输入用户名或电话号码',
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
			goRegister() {
				this.$router.push({
					path: '/register'
				})
			},
			submitForm(formName) {
				console.log(formName)
				var _this = this
				axios.post('api/login/',
						_this.loginForm, {
							headers: {
								'content-type': 'application/json'
							},
							withCredentials: true
						}).then(function(response) {
						console.log(response)
						if(response.status === 200){
							var token = response.data.access
							var username = response.data.username
							var roleType = response.data.roleType
							
							sessionStorage.setItem("token",token)
							sessionStorage.setItem("username",username)
							_this.$refs.loginForm.resetFields()
							if(roleType === 'LANDLORD'){
								_this.$router.push({
									path: '/onwerHome'
								})
							}
						}else{
							_this.$message({
								type: 'error',
								message: '登录失败'
							})
						}
					})
					.catch(function(error) {
						console.log(error)
					})

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
