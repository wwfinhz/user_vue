<template>
    <div class="tousuxxcss">
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="tstitle"
            label="标题"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="tser"
            label="投诉人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tscontent"
            label="投诉内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tstime"
            label="日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="tsstatus"
            label="投诉状态"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="">
              <el-button size="small" >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { findtsbyhzid } from '../../api/api'
export default {
data() {
            return {
              tableData: []
            }
        },

        methods: {
            gettousus(){
              let user = JSON.parse(sessionStorage.getItem('user'));
              var Params = { hzid :  user.hzid};
              findtsbyhzid(Params).then((res)=>{
                if(res.data.data !==null)
                    console.log(res.data.data); 
                  this.tableData = res.data.data;
                   console.log(res.data.data);
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
            this.gettousus();
            this.checkhuzhu();
        },
}
</script>

<style>
    .tousuxxcss{
      margin-top: 5%;
    }
</style>