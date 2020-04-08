<template>
<el-container>
  <el-header class="header">
      <el-col :span="10" class="logo">
				{{sysName}}
			</el-col>
      <div v-bind:class="[isLogin?close:show]">
      <el-col :span="4" class="LoR">
				  <router-link to="/login" tag="span" class="login" title="登录">登录</router-link>
          |
          <router-link to="/register" tag="span" class="register" title="注册">注册</router-link>
			</el-col>
      </div>
      <div v-bind:class="[isLogin?show:close]">
      <el-col :span="4" class="LoR">
        <el-dropdown trigger="hover">
          <span class="self">{{UserName}}</span>
          <el-dropdown-menu slot="dropdown">
						<el-dropdown-item><router-link to="/user" tag="li">设置</router-link></el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
        </el-dropdown>
			</el-col>
      </div>
  </el-header>
  <el-main>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in pics" :key="item.id">
        <img :src="item.url" style="height:100%;width:100%">
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>社区公告</span>
              <router-link to="/gonggao">
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
              </router-link>
          </div>
          <div>
            <ul style="padding:0px;margin:0px">
              <li v-for="item,index in Data" :key="item.id" class="lll">
                <div>
                  <span class="lispan">{{ index+1 }}</span>
                  <span class="lidiv1">{{ item.ggtitle }}</span>
                  <span class="lidiv2">{{ item.ggtime }}</span>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>邻里之间</span>
            
          </div>
          <div>
            <ul style="padding:0px;margin:0px">
              <li v-for="item in items" :key="item.id" class="lll">
                <div>
                  <span class="lispan">{{item.id}}</span>
                  <span class="lidiv">{{ item.message }}</span>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热搜排行榜</span>
          </div>
          <div>
            <iframe vspace="0" hspace="0" scrolling="no" frameborder="0" id="clip" name="clip" width="300" height="322" src="http://top.baidu.com/clip?b=1&hd_h_info=1&p_name=&hd_search=1&hd_trend=1&col=1&hd_searches=0&hd_border=1&hd_meshline=0&hd_h=1" ></iframe>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</el-container>
  
</template>

<script>
import { findallgg } from '../api/api';
export default {
    data() {
        return {
            Data:[],
            sysName:'我的小区',
            isLogin:false,
            close:'close',
            show:'show',
            UserName:'',
            items: [
              { id:1,message: '远亲不如近邻，近邻不如对门。' },
              { id:2,message: '真诚赢得信任，宽容赢得理解，互敬赢得和睦。' },
              { id:3,message: '邻里一家人，互助大家亲。' },
              { id:4,message: '邻睦风亦暖，家和人自康。' },
              { id:5,message: '亲邻互助山成玉，父子同心土变金。' },
              { id:6,message: '邻邻里里老老小小，和和睦睦亲亲切切。' },
              { id:7,message: '人家帮我，永志不忘；我帮人家，莫记心上。' },
              { id:8,message: '邻里之间常沟通，帮难解因播春风。' },
              { id:9,message: '小事不计较，大事共商讨，邻里互助团结好。' },
              { id:10,message: '楼上楼下多理解，互敬互让少烦恼。' },
            ],
            pics:[
              {url:require('@/assets/pg1.png')},
              {url:require('@/assets/pg2.png')},
              {url:require('@/assets/pg3.png')},
            ],
        }
    },
    methods: {
          getgonggaos(){
              // var Params = { index : 1 };
              findallgg().then((res)=>{
                this.Data = res.data.data;
              });
            },
        init(){
            sessionStorage.setItem('index', JSON.stringify("浏览首页"));
            var user = JSON.parse(sessionStorage.getItem('user'));
            if(user!=null){
              this.isLogin = true;
              if(user.hzname!=null){
                this.UserName = "欢迎，"+user.hzname;
              }else{
                this.UserName = "请完善基本信息";
              }
            }
        },
        //退出登录
        logout: function () {
          var _this = this;
          this.$confirm('确认退出吗?', '提示', {
            //type: 'warning'
          }).then(() => {
            sessionStorage.removeItem('user');
            _this.$router.push('/login');
          }).catch(() => {

          });
        },
    },
    mounted: function () {
        this.init();
        this.getgonggaos();
    },
}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .header{
    line-height: 60px;
    background: #20a0ff;
    color: #fff;
    
  }
  .logo{
    font-size: 22px;
  }
  .LoR{
      text-align: right;
      padding-right: 20px;
      float: right; 
  }
  .login{
    cursor:pointer;
    padding-right: 10px;
  }
  
  .register{
    cursor:pointer;
    padding-left: 10px;
  }
  .close{
    display : none;
  }
  .show{
    display: block;
  }
  .self{
    cursor:pointer;
    color: #fff;
  }
  .lll{
    height:28px;
    /* text-decoration:none; */
    list-style: none;
    border-bottom:0.5px #C0C4CC dashed;
    list-style-position:inside;
    /* margin-top: 2px; */
    /* display:block; */
    font: Arial,"simsun";
  }
  .lidiv{
    width: 100%;
    height: 100%;
    line-height: 28px;
    color: #F56C6C;
  }
  .lidiv1{
    width: 100%;
    height: 100%;
    line-height: 28px;
  }
  .lidiv2{
    line-height: 28px;
    float:right;
    margin-right: 10px;
  }
  .lispan{
    width: 13px;
    height: 13px;
    display:block;
    float:left;
    font-family: "simsun";
    color: #fff;
    text-align: center;
    /* font-size: 10px; */
    line-height: 10px;
    background: #C0C1C3;
    border: 1px solid #ACAEB2;
    margin-right: 20px;
    margin-left: 15px;
    margin-top: 7px;
  }
  
</style>