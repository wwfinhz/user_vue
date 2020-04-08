<template>
  <div class="jiaofeicss">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="jftime"
            label="月份"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="jfwater"
            label="水费"
            width="180">
          </el-table-column>
          <el-table-column
            prop="jfelectricity"
            label="电费"
            width="180">
          </el-table-column>
          <el-table-column
            prop="jfgas"
            label="燃气费"
            width="180">
          </el-table-column>
          <el-table-column
            prop="jfstatus"
            label="缴费状态"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="jiaofei(scope.row)">缴费</el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
import { findjfbyhzid ,addjiaofei} from '../../api/api'
export default {
        data() {
            return {
              tableData: []
            }
        },

        methods: {
            getjiaofeis(){
              let user = JSON.parse(sessionStorage.getItem('user'));
              var Params = { hzid :  user.hzid};
              findjfbyhzid(Params).then((res)=>{
                if(res.data.data !==null){
                    console.log(res.data.data); 
                    this.tableData = res.data.data;
                  }
              });
            },
            jiaofei(row){
              var sum = parseInt(row.jfwater)+parseInt(row.jfgas)+parseInt(row.jfelectricity)+150;
              this.$confirm('确认缴费?    共计 ￥ '+sum+' 元，其中物业费每月收取150元', '提示', {
					      type: 'warning'
				      }).then(() => {
                let Params ={ jfid : row.jfid};
                addjiaofei(Params).then((res)=>{
                  this.$message({
							       message: '缴费成功',
							       type: 'success'
                  });
                  this.getjiaofeis();
                });
				      }).catch(() => {

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
            this.getjiaofeis();
            this.checkhuzhu();
        },
}
</script>

<style>
  .jiaofeicss{
    margin-top: 5%;
  }
</style>