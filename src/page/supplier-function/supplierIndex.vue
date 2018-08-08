<template>
  <div class="docindex">
    <transition name='show-show'>
      <userInfo v-show="userIsShow" @status-change="servicesChange"></userInfo>
    </transition>
    <div class="docindex-head">
      <div class="docindex-head-title">骨科高值耗材APP</div>
      <div @click="userIsShow=!userIsShow" class="docindex-head_right">
        <div class="docindex-head-name">{{roleName}}</div>
        <!-- <div class="docindex-head-icon" @click="userIsShow=!userIsShow"></div> -->
        <span id="head_toggle" class="head_toggle"></span>
      </div>
    </div>
    <div class="docindex-banner">
      <img src="../../assets/home/home_banner.jpg">
    </div>
    <div class="docindex-function">
        <div class="docindex-function-orderview" @click="judgement">
          <div class="docindex-function-orderview-icon">
             <div class="number" v-show="numIsShow">{{num}}</div>
          </div>
          <div class="docindex-function-orderview-title" v-if="resDate.group === 'doctor'">下达订单</div>
          <div class="docindex-function-orderview-title" v-if="resDate.group === 'supplier'">订单查看</div>
          <div class="docindex-function-orderview-title" v-if="resDate.group === 'nurse'">订单确认</div>
          <div class="docindex-function-orderview-title" v-if="resDate.group === 'equip-staff'">订单审核</div>
          <div class="docindex-function-orderview-titleE"  v-if="resDate.group === 'doctor'">issued</div>
          <div class="docindex-function-orderview-titleE"  v-if="resDate.group === 'nurse'">confirm</div>
          <div class="docindex-function-orderview-titleE" v-if="resDate.group === 'equip-staff'">audit</div>
          <div class="docindex-function-orderview-titleE" v-if="resDate.group === 'supplier'">To view</div>
        </div>
        <div class="docindex-function-orderhistory" @click="checkout">
          <div class="docindex-function-orderhistory-icon">
            <div class="number" v-show="hisnumIsShow">{{hisnum}}</div>
          </div>
          <div class="docindex-function-orderhistory-title">全部订单</div>
          <div class="docindex-function-orderhistory-titleE">details</div>
        </div>
    </div>
  </div>
</template>

<script>
  import { Group } from '../../config/api'
  import { CountByReadyStatus } from '../../config/api'
  import  userInfo  from '../userCenter/userInfo.vue'
  export default {
    data() {
      return {
        numFlag:1,
        num:0,
        hisnum:0,
        numIsShow:false,
        hisnumIsShow:false,
        userIsShow:false,
        resDate:{
          group:{}
        },
        intervalid:'',
        prames:{
          type:''
        },
        roleName:'',
      }
    },
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.get_data();
      this.onSubmit(1);
      var _this=this
      this.intervalid=setInterval(function(){
        _this.get_data();
        _this.onSubmit(1);
      },5000)
      //清楚localStorage
      localStorage.clear();
    },
    beforeDestroy () {
      clearInterval(this.intervalid)
    },
    components:{ userInfo },
    methods: {
      onSubmit (flag) {
        // flag=1代表历史订单未查看数量,2为订单查看为查看数量
        if(this.resDate.group){
          this.prames.type=flag
          CountByReadyStatus.get({params: this.prames})
            .then(response => {
              console.log(this.resDate.group)
              if(response!=0&&flag==2&&this.resDate.group!='doctor'){
                console.log("no")
                this.numIsShow=true
                this.num=response
              }
              if(this.resDate.group == 'doctor'&&response!=0){
                console.log("yes")
                this.numIsShow=false
                this.hisnumIsShow=true
                this.hisnum=response
              }
              // 器材处/供应商/护士/历史订单查看作废
              if(this.resDate.group != 'doctor'&&response!=0&&flag==1){
                console.log("no")
                this.hisnumIsShow=true
                this.hisnum=response
              }
              console.info('success')
            }, response => {
              console.info('fail')
            })
          }
      },
      get_data: function(params) {
        let param = Object.assign({}, this.iptVal);
        Group.getUserinformation(param)
          .then(response => {
            this.resDate = response;
            this.roleName=response.name
            if(this.resDate.group !== 'doctor'){
              this.onSubmit(2)
            }
            console.info(this.resDate);
            console.info('success')
          }, response => {
            console.info('fail')
          });
        //
      },
      judgement(){
        if(this.resDate.group === 'doctor'){
          localStorage.clear();
          this.$router.push({path:'/buildorder'})
        }else{
          this.$router.push({path:'/vieworder'})
          }
        },
      checkout(){
        if(this.resDate.group === 'doctor'){
          this.$router.push({path:'/vieworder'})
        }else{
          this.$router.push({path:'/historyOrder'})
        }
      },
      servicesChange (status){
        if (!status) {
          this.userIsShow=false
        };
      }
    },
  }
</script>
<style lang='scss'>
  .show-show-enter-active {
    transition: all .2s ease;
  }
  .show-show-leave-active {
      transition: all .2s ease;
  }
  .show-show-enter, .show-show-leave-active {
      transform: scale(0);
      opacity: 0;
  }
  .show-hide-enter-active {
    transition: all .2s ease;
  }
  .show-hide-leave-active {
      transition: all .2s ease;
  }
  .show-hide-enter, .show-hide-leave-active {
      transform: scale(0);
      opacity: 0;
  }
</style>