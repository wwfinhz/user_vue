<template>
<div class="updatehz">
	<section>
		<el-form ref="form" :model="form" label-width="80px">
  			<el-form-item label="户主姓名">
    			<el-input v-model="form.name" :readonly="readonly"></el-input>
  			</el-form-item>
  			<el-form-item label="注册账户">
    			<el-input v-model="form.phone" :readonly="readonly"></el-input>
  			</el-form-item>
			<el-form-item label="户主年龄">
    			<el-input v-model="form.age" :readonly="readonly"></el-input>
  			</el-form-item>
			<el-form-item label="户主性别">
    			<el-input v-model="form.sex" :readonly="readonly"></el-input>
  			</el-form-item>
  			<el-form-item>
				<el-button type="primary" @click="handleEdit()">更改信息</el-button>
    			<el-button type="primary" @click="handlepwdEdit()">更改密码</el-button>
    			<el-button>取消</el-button>
  			</el-form-item>
		</el-form>
		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editmsgFormVisible">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" label="男">男</el-radio>
						<el-radio class="radio" label="女">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="editForm.age" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-input v-model="editForm.phone" auto-complete="off" :readonly="readonly"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editmsgFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editmsgLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--修改密码界面-->
		<el-dialog title="修改密码" :visible.sync="editpwdFormVisible">
			<el-form :model="editpwdForm" label-width="80px" :rules="editpwdFormRules" ref="editpwdForm">
				<el-form-item label="原密码" prop="password">
					<el-input v-model="editpwdForm.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newpassword">
					<el-input type="password" v-model="editpwdForm.newpassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="confirmpassword">
					<el-input type="password" v-model="editpwdForm.confirmpassword" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editpwdFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editpwdSubmit" :loading="editpwdLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
	</div>
</template>

<script>
	import { updatehuzhu,findbyhzid } from '../../api/api'
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if(value !== this.password){
					callback(new Error('原密码不正确'));
				} else {
					if (this.editpwdForm.password !== '') {
						this.$refs.editpwdForm.validateField('checkPassagain');
					}
					callback();
				}
			};
			var validatePass1 = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请输入新密码'));
				} else {
				if (this.editpwdForm.newpassword !== '') {
					this.$refs.editpwdForm.validateField('checkPassagain');
				}
				callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请再次输入密码'));
				} else if (value !== this.editpwdForm.newpassword) {
				callback(new Error('两次输入密码不一致!'));
				} else {
				callback();
				}
			};
			return {
        		form: {
          		name: '',
				phone:'',
				age:'',
				sex:'',
				},
				password:'',
				readonly: true,
				editmsgFormVisible: false,//编辑界面是否显示
				editpwdFormVisible: false,//修改密码界面是否显示
				editmsgLoading: false,
				editpwdLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					name: '',
					phone:'',
					age:'',
					sex:'',
				},
				editpwdFormRules: {
					password:[
						{validator: validatePass, trigger: 'blur'}
					],
					newpassword:[
						{validator: validatePass1, trigger: 'blur'}
					],
					confirmpassword:[
						{validator: validatePass2, trigger: 'blur'}
					],
				},
				//修改密码界面数据
				editpwdForm:{
					password:'',
					newpassword:'',
					confirmpassword:'',
				},
      		}
		},
		methods: {
			getUser(){
				let user = JSON.parse(sessionStorage.getItem('user'));
				// findhuzhu(user.hzid).then((res) => {
				// 	console.log(res);
					
				// 	this.total = res.data.total;
				// 	this.users = res.data.users;
				// 	this.listLoading = false;
				// 	//NProgress.done();
				// });
				console.log("前-自动获取user:"+user.hzage);
				var Params = { hzid : user.hzid };
				findbyhzid(Params).then((res)=>{
					if (res.data.code) {
                		this.$message({
                 			message: res.data.msg,
                			type: 'error'
                		});
                		return
					  }
					  sessionStorage.setItem('user', JSON.stringify(res.data.data));
					  
					  let user = JSON.parse(sessionStorage.getItem('user'));
					  console.log("后-自动获取user:"+user.hzname);
					  this.resetSetItem('watchStorage',user.hzname);
					  this.form.name = user.hzname || '点击更改信息更新';
					  this.form.age = user.hzage || '点击更改信息更新';
					  this.form.phone = user.hzphone || '点击更改信息更新';
					  this.form.sex = user.hzsex || '点击更改信息更新';
				});
				
			},
			onSubmit() {
        	console.log('submit!');
			},
			//显示修改密码界面
			handlepwdEdit: function (){
				this.editpwdFormVisible = true;
				let user = JSON.parse(sessionStorage.getItem('user'));
				this.password = user.hzpassword;
			},
			//修改
			editpwdSubmit: function (){
				let user = JSON.parse(sessionStorage.getItem('user'));
				this.$refs.editpwdForm.validate((valid) =>{
					if (valid) {
				 		this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editpwdLoading = true;
							var Params = { 
								hzphone: user.hzphone, 
								hzpassword: this.editpwdForm.newpassword 
							};
							console.log(Params);
							
							updatehuzhu(Params).then((res)=>{
								this.editpwdLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.editpwdFormVisible = false;
								this.getUser();
								
							});

						 });
					}
				});
				
			},
			//显示编辑界面
			handleEdit: function () {
				let user = JSON.parse(sessionStorage.getItem('user'));
				console.log("点击更新user:"+user.hzname);
				
				this.editmsgFormVisible = true;
				this.editForm.name = user.hzname || '';
				this.editForm.age = user.hzage || '';
				this.editForm.phone = user.hzphone || '';
				this.editForm.sex = user.hzsex || '';
				
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
				 		this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editmsgLoading = true;
							var Params = { 
								hzphone: this.editForm.phone, 
								hzage: this.editForm.age ,
								hzname:this.editForm.name,
								hzsex:this.editForm.sex
							};
							
							updatehuzhu(Params).then((res)=>{
								this.editmsgLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.editmsgFormVisible = false;
								this.getUser();
								console.log("跳转");
								
							});

						 });
					}
				});
			},
		},
		mounted() {
			this.getUser();
		}
	
}
</script>

<style scoped>
	.updatehz{
		margin-top: 5%;
		margin-right: 30%;
		margin-left: 10%;
	}
</style>