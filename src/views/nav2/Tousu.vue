<template>
  <div class="tousucss">
	  <el-form ref="tousu" :model="tousu" :rules="Rules" label-width="80px">
  			<el-form-item label="投诉标题" prop="tstitle">
    			<el-input v-model="tousu.tstitle" auto-complete="off"></el-input>
  			</el-form-item>
        <el-form-item label="投诉人" prop="tser">
    			<el-input v-model="tousu.tser" auto-complete="off"></el-input>
  			</el-form-item>
  			<el-form-item label="投诉内容" prop="tscontent">
    			<el-input type="textarea" v-model="tousu.tscontent" auto-complete="off"></el-input>
  			</el-form-item>
  			<el-form-item style="text-align:center">
				  <el-button type="primary" :loading="logining" @click="addTousu">提交</el-button>
    		  <el-button>取消</el-button>
  			</el-form-item>
		</el-form>
  </div>
</template>

<script>
import { addtousu} from '../../api/api'
export default {
    data() {
      
      return {
        logining:false,
        tousu:{
          tstime:'',
          tscontent:'',
          tser:'',
          tstitle:''
        },
        Rules:{
          tstime:[
	          { required: true, message: '请输入投诉时间', trigger: 'blur' }
          ],
          tscontent: [
						{ required: true, message: '请输入投诉内容', trigger: 'blur' }
          ],
          tser: [
						{ required: true, message: '请输入投诉人', trigger: 'blur' }
          ],
          tstitle: [
						{ required: true, message: '请输入投诉标题', trigger: 'blur' }
					],
        },
      }
    },
    methods: {
      addTousu: function(){
        this.$refs.tousu.validate((valid)=>{
            if (valid) {
				 		this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.logining = true;
							
              let user = JSON.parse(sessionStorage.getItem('user'));
              var Params = { 
                hzid : user.hzid ,
                tscontent : this.tousu.tscontent,
                tstitle : this.tousu.tstitle,
                tser : this.tousu.tser};
							console.log(Params);
							
							addtousu(Params).then((res)=>{
								this.logining = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
                console.log(res.data.data);
                this.$refs.tousu.resetFields();
              });
						 });
					}
        });
      },
      checkhuzhu(){
              let fangchan = JSON.parse(sessionStorage.getItem('fangchan'));
              if(fangchan===null){
                this.$confirm('暂无用户入住房产，请联系物业', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
                }).then(() => {
                  this.$router.push('/user');
                });
              }
              
            },
    },
    mounted: function () {
      this.checkhuzhu()
    }
}
</script>

<style>
  .tousucss{
     margin-top: 5%;
		 margin-right: 30%;
		 margin-left: 10%;
  }
</style>