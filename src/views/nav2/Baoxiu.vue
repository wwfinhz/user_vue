<template>
  <div class="baoxiucss">
    <el-form ref="baoxiu" :model="baoxiu" :rules="Rules" label-width="80px">
  			<!-- <el-form-item label="报修时间" prop="bxtime">
    			<el-input v-model="baoxiu.bxtime" auto-complete="off"></el-input>
  			</el-form-item> -->
        <el-form-item label="报修类别" >
    			<el-select v-model="value" placeholder="" prop="bxcatalog">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
  			</el-form-item>
  			<el-form-item label="报修内容" prop="bxcontent">
    			<el-input type="textarea" v-model="baoxiu.bxcontent" auto-complete="off"></el-input>
  			</el-form-item>
  			<el-form-item style="text-align:center">
				  <el-button type="primary" :loading="logining" @click="addBaoxiu">提交</el-button>
    		  <el-button>取消</el-button>
  			</el-form-item>
		</el-form>
  </div>
</template>

<script>
import { findfcbyhzid ,addbaoxiu} from '../../api/api'
  export default {
    data() {
      
      return {
        logining:false,
        baoxiu:{
          bxtime:'',
          bxcontent:'',
          bxcatalog:'',
        },
        Rules:{
          bxtime:[
	          { required: true, message: '请输入报修时间', trigger: 'blur' }
          ],
          bxcontent: [
						{ required: true, message: '请输入报修内容', trigger: 'blur' }
          ],
          bxcatalog: [
            { required: true, message: '请输入报修类别', trigger: 'blur' }
          ]
        },
        options: [{
          value: '水力故障',
          label: '水力故障'
        }, {
          value: '电力故障',
          label: '电力故障'
        }, {
          value: '其他故障',
          label: '其他故障'
        }],
        value: ''
      }
    },
    mounted(){
      let user = JSON.parse(sessionStorage.getItem('user'));
			var Params = { hzid : user.hzid };
			findfcbyhzid(Params).then((res)=>{
					if (res.data.code) {
                		this.$message({
                 			message: res.data.msg,
                			type: 'error'
                		});
                		return
					  }
          sessionStorage.setItem('fangchan', JSON.stringify(res.data.data));
        });
    },
    computed: {
      
    },
    methods: {
      addBaoxiu: function(){
        this.$refs.baoxiu.validate((valid)=>{
            if (valid) {
				 		this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.logining = true;
							
              let fangchan = JSON.parse(sessionStorage.getItem('fangchan'));
              let user = JSON.parse(sessionStorage.getItem('user'));
              var Params = { 
                hzid : user.hzid ,
                fcid : fangchan.fcid,
                bxcontent : this.baoxiu.bxcontent,
                bxcatalog : this.value};
							console.log(Params);
							
							addbaoxiu(Params).then((res)=>{
								this.logining = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
                console.log(res.data.data);
                this.$refs.baoxiu.resetFields();
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
<style scoped>
  .baoxiucss{
    margin-top: 5%;
		margin-right: 30%;
		margin-left: 10%;
  }
</style>