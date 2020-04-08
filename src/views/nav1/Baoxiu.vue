<template>
  <div class="baoxiucss">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="bxtime"
            label="报修时间"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="bxcontent"
            label="报修内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="bxcatalog"
            label="报修类别"
            width="100">
          </el-table-column>
          <el-table-column
            prop="bxcler"
            label="维修人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="bxclphone"
            label="维修人电话"
            width="180">
          </el-table-column>
          <el-table-column
            prop="bxstatus"
            label="报修状态"
            width="180">
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
import { findbxbyhzid } from '../../api/api'
export default {
  data() {
            return {
              tableData: []
            }
        },

        methods: {
            getbaoxius(){
              let user = JSON.parse(sessionStorage.getItem('user'));
              var Params = { hzid :  user.hzid};
              findbxbyhzid(Params).then((res)=>{
                if(res.data.data !==null)
                    console.log(res.data.data); 
                  this.tableData = res.data.data;
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
            this.getbaoxius();
            this.checkhuzhu();
        },
}
</script>

<style>
  .baoxiucss{
    margin-top: 5%;
  }
</style>