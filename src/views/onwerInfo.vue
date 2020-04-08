<template>
  <div class="home_main">
			
	<el-container>
		<el-header><span style="color: black;font-size: 30px;">个人资料</span><br /><br /><br /></el-header>
		  <el-container>
			
			<el-main>
				<!-- <span style="float: left;color: #999999;font-size: 30px;">Id: {{this.famiyList.familyId}}</span><br /><br /><br /><hr /> -->
				<span style="float: left;color: black;font-size: 20px;">用户名: {{this.famiyList.familyName}}</span>
				<el-button style="float: right;margin-right: 20px;" type="primary" @click="handleeditPassword">修改密码</el-button>
				<br /><br /><br />
				<span style="float: left;color: black;font-size: 20px;">性别: {{this.famiyList.familySex}}</span><br /><br /><br />
				<span style="float: left;color: black;font-size: 20px;">房间号: {{this.famiyList.familyAddress}}</span><br /><br /><br />
				<span style="float: left;color: black;font-size: 20px;">电话: {{this.familyPhone}}</span><br /><br /><br />
				
				
				<!-- start 编辑角色弹窗 -->
				<el-dialog
				  title="修改密码"
				  :visible.sync="passwordEditDialogVisible"
				  width="30%">
				  <el-form label-width="80px" class="demo-ruleForm" status-icon :rules="rules2" ref="passwordEditForm" :model="passwordEditForm">
				    <el-form-item label="" prop="familyPhone" style="display: none; ">
				    <el-input v-model="passwordEditForm.familyPhone"></el-input>
				    </el-form-item>
				    <el-form-item label="原密码" prop="oldPassword" >
				    <el-input type="password" v-model="passwordEditForm.oldPassword"></el-input>
				    </el-form-item>
				    <el-form-item label="密码" prop="familyPassword">
							<el-input type="password" v-model="passwordEditForm.familyPassword" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="familyPassword2">
							<el-input type="password" v-model="passwordEditForm.familyPassword2" auto-complete="off"></el-input>
						</el-form-item>
				  </el-form>
				  <span slot="footer" class="dialog-footer">
				  <el-button @click="resetForm('passwordEditForm')">取 消</el-button>
				  <el-button type="primary" @click="editPassword('passwordEditForm')">确 定</el-button>
				</span>
				</el-dialog>
				<!-- end 编辑角色弹窗 -->
				
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
          if (this.passwordEditForm.familyPassword2 !== '') {
            this.$refs.passwordEditForm.validateField('familyPassword2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordEditForm.familyPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        imageUrl: require('../assets/img/QQ图片20170101150550.jpg'),
				passwordEditDialogVisible:false,
				messageEditForm: {
				  familyId: '',
				  familyPhone: '',
				  back: ''
				},
				passwordEditForm: {
				  familyPhone: '',
				  familyPassword: '',
					familyPassword2:'',
					oldPassword: ''
				},
				personName:'',
				familyPhone:'',
				familyTouPic:'',
				famiyList: [],
				rules2: {
				    familyPassword: [
				      { validator: validatePass, trigger: 'blur' },
							{ min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' }
				    ],
				    familyPassword2: [
				      { validator: validatePass2, trigger: 'blur' },
							{ min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' }
				    ]
				  }
				}
			
    },
		created () {
		  this.personName=localStorage.getItem('user_name')
			this.familyPhone=localStorage.getItem('familyPhone')
			this.searchFamily()
			
		},
    methods: {
			searchFamily(){
			  var _this = this
			  axios.post('restful/family/selectTwo',
			    {
			      'familyPhone': _this.familyPhone
			    },
			    {
			      headers: {
			        'content-type': 'application/json'
			      },
			      withCredentials: true
			    }).then(function (response) {
			    console.log(response)
			    _this.famiyList = response.data.familyDto2
					localStorage.setItem('user_name', _this.famiyList.familyName)
					localStorage.setItem('familyTouPic', _this.famiyList.familyTouPic)
					_this.familyTouPic=localStorage.getItem('familyTouPic')
					_this.imageUrl='http://47.106.37.197:9110/'+_this.familyTouPic
					console.log(_this.famiyList.familyTouPic)
					console.log('家属信息')
					console.log(_this.famiyList)
			  })
			    .catch(function (error) {
			      console.log(error)
			    })
			},
			editFamily () {
			  var _this = this
			  axios.post('restful/family/updateTwo', _this.messageEditForm,
			    {
			      headers: {
			        'content-type': 'application/json'
			      },
			      withCredentials: true
			    }).then(function (response) {
			    console.log(response)
			    if (response.data.returnCode === '1111') {
			      _this.messageEditDialogVisible = false
			      _this.$message({
			        type: 'success',
			        message: '编辑监护人信息成功'
			      })
			      _this.searchFamily()
			    } else {
			      _this.$message({
			        type: 'error',
			        message: '编辑监护人信息失败'
			      })
			    }
			  })
			    .catch(function (error) {
			      console.log(error)
			    })
			},
      handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
		var _this=this
		var params = {
						  'familyTouPic': file.name,
							'familyPhone':this.familyPhone
		}
		console.log(params)
		axios.post('restful/family/updateTouPic',params,
			{
				headers: {
					'content-type': 'application/json'
				},
				withCredentials: true
			}).then(function (response) {
			console.log(response)
			if (response.data.returnCode === '1111') {
			  _this.passwordEditDialogVisible = false
				_this.resetForm('passwordEditForm')
			  _this.$message({
			    type: 'success',
			    message: '修改头像成功'
			  })
			  _this.searchFamily()
			} else {
			  _this.$message({
			    type: 'error',
			    message: '修改头像失败'
			  })
			}
		})
			.catch(function (error) {
				console.log(error)
			})
		// _this.fileListName=[]
      },
			editMessage(){
				
			},
			editPassword(formName){
				
				this.$refs[formName].validate((valid) => {
          if (valid) {
						if(this.passwordEditForm.oldPassword==this.famiyList.familyPassword){
							console.log('密码对比')
							var _this = this
							axios.post('restful/family/updatePassword', _this.passwordEditForm,
							  {
							    headers: {
							      'content-type': 'application/json'
							    },
							    withCredentials: true
							  }).then(function (response) {
							  console.log(response)
							  if (response.data.returnCode === '1111') {
							    _this.passwordEditDialogVisible = false
									_this.resetForm('passwordEditForm')
							    _this.$message({
							      type: 'success',
							      message: '修改密码成功'
							    })
							    _this.searchFamily()
							  } else {
							    _this.$message({
							      type: 'error',
							      message: '修改密码失败'
							    })
							  }
							})
							  .catch(function (error) {
							    console.log(error)
							  })
						}else{
							alert('原密码不正确')
						}
            
          } else {
            console.log('error submit!!');
            return false;
          }
        })
				
				
			},
			
			handleeditPassword(){
				console.log('编辑密码')
				var _this=this
				_this.passwordEditForm.familyPhone=_this.familyPhone
				_this.passwordEditDialogVisible = true
			},
			resetForm(formName){
				this.passwordEditDialogVisible = false
				this.$refs[formName].resetFields();
			},
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

