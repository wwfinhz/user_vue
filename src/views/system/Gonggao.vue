<template>
    <div class="ggcss">
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="ggtitle"
            label="标题"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="ggtime"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="show(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--详情界面-->
		<el-dialog title="公告详情" :visible.sync="gonggaoVisible">
			<el-card class="box-card">
  				<h5>公告标题：{{ ggtitle }}</h5>
				  <h5>公告发布时间：{{ ggtime }}</h5>
				  <h5>公告内容：{{ ggcontent }}</h5>
			</el-card>
		</el-dialog>
    </div>
</template>

<script>
import { findallgg } from '../../api/api'
    export default {
        data() {
            return {
                tableData: [],
                gonggaoVisible:false,
                ggtime:'',
                ggtitle:'',
                ggcontent:'',
            }
        },

        methods: {
            getgonggaos(){
              // var Params = { index : 1 };
              findallgg().then((res)=>{
                this.tableData = res.data.data;
              });
            },
            show(row){
                this.gonggaoVisible = true;
                this.ggtitle = row.ggtitle;
                this.ggtime = row.ggtime;
                this.ggcontent = row.ggcontent;
            }
        },

        mounted: function () {
            this.getgonggaos();
        },
        
    }
</script>

<style scoped>
    .ggcss{
        margin-top: 5%;
        
    }
</style>
