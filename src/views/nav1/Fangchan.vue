<template>
	<div class="fangchancss">
		<section>
			<el-card class="box-card">
  				<h5>户主姓名：{{ hzname }}</h5>
				<h5>所处楼号：{{ hzbulid }}</h5>
				<h5>所处单元：{{ hzunit }}</h5>
				<h5>所处房号：{{ hzchamber }}</h5>
			</el-card>
		</section>
	</div>
</template>

<script>
import { findfcbyhzid } from '../../api/api'
	export default {
		data() {
			return {
				hzname:'',
				hzbulid:'暂无信息，请联系物业',
				hzunit:'暂无信息，请联系物业',
				hzchamber:'暂无信息，请联系物业',
			}
		},
		methods: {
			// onSubmit() {
			// 	console.log('submit!');
			// }
			getFangchan: function(){
				let user = JSON.parse(sessionStorage.getItem('user'));
				this.hzname = user.hzname;
				var Params = { hzid : user.hzid };
				findfcbyhzid(Params).then((res)=>{
					if (res.data.code) {
                		this.$message({
                 			message: res.data.msg,
                			type: 'error'
                		});
                		return
					  }
					  console.log(res.data.data);
					  if(res.data.data!==null){
						sessionStorage.setItem('fangchan', JSON.stringify(res.data.data));
						this.hzbulid = res.data.data.fcbulid+"   楼";
						this.hzunit = res.data.data.fcunit+"   单元";
						this.hzchamber = res.data.data.fcchamber+"   室";
					  }else{
						  this.$message({
                 			message: "暂无住户信息，请联系物业",
                			type: 'error'
                		});
						  this.$router.push('/user');
					  }
				});
			}
		},
		mounted() {
			this.getFangchan();
		}
	}

</script>
<style scoped>
	.fangchancss{
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