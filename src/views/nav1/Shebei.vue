<template>
    <div class="shebeicss">
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="sbname"
            label="设备名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="sbcount"
            label="数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sbstatus"
            label="状态"
            width="180">
          </el-table-column>
          <el-table-column
            prop="borrowtime"
            label="出借时间"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="">
              <el-button size="small" @click="open">归还</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { findsbbyhzid } from '../../api/api'
export default {
data() {
            return {
              tableData: []
            }
        },

        methods: {
            getshebeis(){
              let user = JSON.parse(sessionStorage.getItem('user'));
              var Params = { hzid :  user.hzid};
              findsbbyhzid(Params).then((res)=>{
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
            open(){
              this.$alert('您需要将物品交予物业服务人员入库，才能消除记录。', '归还提示', {
                confirmButtonText: '确定'
              });
            }
        },

        mounted: function () {
            this.getshebeis();
            this.checkhuzhu();
        },
}
</script>

<style>
    .shebeicss{
        margin-top: 5%;
    }
</style>