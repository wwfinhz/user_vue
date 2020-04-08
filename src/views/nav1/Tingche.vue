<template>
	<div class="tcwcss">
		<section>
			<el-card class="box-card">
  				<h5>户主姓名：{{ hzname }}</h5>
				<h5>停车位地点：{{ tcspace }}</h5>
				<h5>停车位状态：{{ tcstatus }}</h5>
			</el-card>
		</section>
	</div>
	
</template>
<script>
	import { findtcbyhzid } from '../../api/api'
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				hzname:'',
				tcspace:'未拥有停车位',
				tcstatus:'',
			}
		},
		methods: {
			getTingchewei: function(){
				let user = JSON.parse(sessionStorage.getItem('user'));
				this.hzname = user.hzname;
				var Params = { hzid : user.hzid };
				findtcbyhzid(Params).then((res)=>{
					if (res.data.code) {
                		this.$message({
                 			message: res.data.msg,
                			type: 'error'
                		});
                		return
					  }
					if(res.data.data!=null){
						this.tcspace = res.data.data.tcspace;
						this.tcstatus = res.data.data.tcstatus;
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
		mounted() {
			this.getTingchewei();
			this.checkhuzhu();
		}
	};

</script>

<style scoped>
	.tcwcss{
		margin-top: 5%;
		margin-right: 30%;
		margin-left: 10%;
	}

	.text {
    	font-size: 14px;
  	}

  	.item {
    	padding: 18px 0;
  	}

  	.box-card {
    	width: 100%;
  	}
</style>