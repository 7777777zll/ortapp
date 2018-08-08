<template>
  <div class="ordercheck">
    <div v-show="mainCnt">
      <div class="ordercheck-head">
        <div class="icon" @click="goBack">
          <img src="../assets/return.png">
        </div>
        <div class="title">订单详情</div>
      </div>
      <dataLoading v-show="noData"></dataLoading>
      <div v-show="!noData" class="order_check_main_show">
        <div class="ordercheck-title">
         <div class="orderborntime" style="margin-bottom: 0.3rem;">
            <div class="timetitle">订单状态</div>
            <div class="time" style="color: green;">
              <span v-if="showForm.status === 1" data='1'>已完成</span>
              <span v-if="showForm.status === 2" data='2'>已作废</span>
              <span v-if="showForm.status === 3" data='3'>待审核</span>
              <span v-if="showForm.status === 4" data='4'>已审核</span>
              <span v-if="showForm.status === 5" data='5'>已确认</span>
              <span v-if="showForm.status === 6" data='6'>加急</span>
              <span v-if="showForm.status === 7" data='7'>中途取消</span>
              <span v-if="showForm.status === 8||showForm.status === 14" data='8'>已取消</span>
              <span v-if="showForm.status === 9" data='9'>已到货</span>
              <span v-if="showForm.status === 10" data='10'>已验收</span>
              <span v-if="showForm.status === 11" data='11'>已拒收</span>
              <span v-if="showForm.status === 12" data='12'>已计费</span>
              <span v-if="showForm.status === 13" data='13'>部分计费</span>
            </div>
          </div>
          <div class="orderborntime simpleTime">
            <div class="timetitle">订单生成时间</div>
            <div class="time">{{showForm.createDate}}</div>
          </div>
        </div>
        <div class="patient-detail" v-if="this.resDate.group!='supplier'&&showForm.patientOrthopaedics">
          <div class="detail-left">
            <div class="title">患者ID</div>
            <div class="data">{{showForm.patientOrthopaedics.patientId}}</div>
            <div class="title">姓名</div>
            <div class="data" v-if="showForm.patientOrthopaedics.name!=null">{{showForm.patientOrthopaedics.name==null? '--':showForm.patientOrthopaedics.name}}</div>
            <div class="title">年龄</div>
            <div class="data">{{showForm.patientOrthopaedics.age==null? '--':showForm.patientOrthopaedics.age}}</div>
          </div>
          <div class="detail-right">
            <div class="title">病案号</div>
            <div class="data">{{showForm.patientOrthopaedics.inpNo==null? '--':showForm.patientOrthopaedics.inpNo}}</div>
            <div class="title">性别</div>
            <div class="data">{{showForm.patientOrthopaedics.sex==null? '--':showForm.patientOrthopaedics.sex}}</div>
            <div class="title">身高</div>
            <div class="data">{{showForm.patientOrthopaedics.height==null? '--':showForm.patientOrthopaedics.height}}</div>
          </div>
          <div class="leftcircle leftcircle-2"></div>
          <div class="rightcircle rightcircle-2"></div>
          <div class="leftcircle leftcircle-3"></div>
          <div class="rightcircle rightcircle-3"></div>
        </div>
        <div class="ordercheck-package">
          <div class="toppart">
            <div class="title">套餐器材</div>
            <div class="icon"></div>
          </div>
            <div class="choose-package-title">耗材套餐</div>
            <router-link :to="'/packageDetail/'+showForm.id+'/'+titleFlag">
              <div class="href_wrap">
                <div class="choose-package-data fl" v-if="showForm.orthopaedicsCombo">{{showForm.orthopaedicsCombo.combName}}</div>
                <div class="href_arrow_icon fr"></div>
                <div class="cb"></div>
              </div>
            </router-link>
            <div class="choose-package-title">手术器械</div>
            <router-link :to="'/toolsDetail/'+showForm.id+'/'+titleFlag">
              <div class="href_wrap">
                <div class="choose-package-data fl">{{appatatus}}</div>
                <div class="href_arrow_icon fr"></div>
                <div class="cb"></div>
              </div>
            </router-link>
            <div class="choose-package-title">供应商</div>
            <div class="choose-package-data">{{showForm.vendorName}}</div>
          </div>
          <div class="ordercheck-remark" v-show="showForm.remark!=null">
            <div class="title">医嘱与备注</div>
            <div class="icon"></div>
            <div class="data" v-html="showForm.remark">{{showForm.remark}}</div>
          </div>
          <div class="ordercheck-add" v-show="showForm.additional!=null">
            <div class="title">遗漏追加</div>
            <div class="icon"></div>
            <div class="data" v-html="showForm.additional">{{showForm.additional}}</div>
          </div>
          <div class="ordercheck-cancel" v-show="showForm.cancelReason!=null">
            <div class="title">取消原因</div>
            <div class="icon"></div>
            <div class="data" v-html="showForm.cancelReason">{{showForm.cancelReason}}</div>
          </div>
          <div class="ordercheck-cancel" v-show="showForm.invalidReason!=null">
            <div class="title">{{showForm.status==8?'取消原因':'作废原因'}}</div>
            <div class="icon"></div>
            <div class="data" v-html="showForm.invalidReason">{{showForm.invalidReason}}</div>
          </div>
          <div class="order_detail_group">
            <div class="ordercheck-cancel-confirm" @click="passcheckFun" v-show="passCheck">
              <!-- <button>{{this.resDate.group== 'supplier'?'确认订单':this.resDate.group== 'equip-staff'?'审核通过':'验收通过'}}</button> -->
              <button>{{passText}}</button>
            </div>
            <router-link :to="'/historyPackageDetail/'+showForm.id" v-show="charging">
              <div class="ordercheck-cancel-confirm" @click="chargFun"><button>提报计费</button></div>
            </router-link>
            <div class="ordercheck-cancel-denied" @click="rejectcheckFun" v-show="rejectCheck">
             <!-- <button>{{this.resDate.group== 'equip-staff'?'拒绝收货':'拒绝验收'}}</button> -->
             <button>{{rejectText}}</button>
             </div>
             <div class="ordercheck-cancel-denied" @click="cancelCntFunc" v-show="cancelCheck"><button>{{cancelText}}</button></div>
            <div class="ordercheck-cancel-confirm" @click="maskShow2=!maskShow2" v-show="reAdd"><button>追加订单</button></div>
            <div class="ordercheck-cancel-denied" @click="maskShow3=!maskShow3" v-show="revoke"><button>取消订单</button></div>
          </div>
        </div>
    </div>
    <transition name="fade">
          <div class="mask_modal confirmBox" v-show="maskShow">
            <div class="modal_cnt">
              <div class="ask_cnt">确认取消该订单吗?</div>
              <div class="btn_group">
                <div class="btn_confirm_small" @click="receiveRequest">确定</div>
                <div class="btn_cancel_small" @click="maskShow=!maskShow">取消</div>
              </div>
            </div>
          </div>
    </transition>
    <div class="orderConfirmPage" v-show="checkPass">
      <div class="orderConfirmPage_cnt">
        <img src="../assets/status/Statuspage_ddsh.jpg">
        <p class="info_one">已{{status}}该订单!</p>
        <p class="info_two">3秒跳转列表页!</p>
        <!-- <div class="login_btn_confirm" @click="refresh">刷新</div> -->
      </div>
      <div class="foot_section">
        Copyright © Rivamed
      </div>
    </div>
     <transition name="fade">
        <div class="mask_modal" v-show="maskShow2">
          <div class="modal_cnt">
            <div class="modal_head">备注</div>
            <textarea class="modal_info" placeholder='请输入追加订单信息' id="modal_info" v-model="prames2.additional"></textarea>
            <div class="btn_group">
              <div class="btn_confirm_small" @click="reAddFun">确定</div>
              <div class="btn_cancel_small" @click="maskShow2=!maskShow2">取消</div>
            </div>
          </div>
        </div>
    </transition>
     <transition name="fade">
        <div class="mask_modal" v-show="maskShow3">
          <div class="modal_cnt">
            <div class="modal_head">备注</div>
            <textarea class="modal_info" placeholder='请输入取消订单信息' id="modal_info2" v-model="prames3.additional"></textarea>
            <div class="btn_group">
              <div class="btn_confirm_small" @click="revokeFun">确定</div>
              <div class="btn_cancel_small" @click="maskShow3=!maskShow3">取消</div>
            </div>
          </div>
        </div>
    </transition>
     <transition name="fade">
        <div class="mask_modal" v-show="maskShow4">
          <div class="modal_cnt">
            <div class="modal_head">备注</div>
            <textarea class="modal_info" placeholder='请输入作废理由' id="modal_info3" v-model="prames4.invalidReason"></textarea>
            <div class="btn_group">
              <div class="btn_confirm_small" @click="cancelFun">确定</div>
              <div class="btn_cancel_small" @click="maskShow4=!maskShow4">取消</div>
            </div>
          </div>
        </div>
    </transition>
    <transition name="fade">
        <div class="mask_modal confirmBox" v-show="infoWarning">
          <div class="modal_cnt">
            <div class="ask_cnt" v-html="warningText"></div>
            <div class="btn_group">
              <div class="btn_confirm_small" @click="supplyInfoFunc">确定</div>
              <div class="btn_cancel_small" @click="infoWarning=!infoWarning">取消</div>
            </div>
          </div>
        </div>
     </transition>
    </div>
  </div>
</template>
<script>
  import dataLoading from '../page/dataLoading.vue'
  import { SerachOrder, Group, Doctor} from '../config/api'
  export default {
    data() {
      return {
        status:0,
        passCheck:false,
        rejectCheck:false,
        cancelCheck:false,
        mainCnt:true,
        warningText:'',
        infoWarning:false,
        checkPass:false,
        maskShow:false,
        maskShow2:false,
        maskShow3:false,
        maskShow4:false,
        isReceive:true,
        isReject:false,
        charging:false,
        revoke:false,
        reAdd:false,
        appatatus:'',
        btnFlag:0,
        titleFlag:0,
        operationId:'',
        showForm: [],
        packageData:[],
        timer:null,
        noData:true,
        checkFlag:[],
        prames:{
          id:'',
          status:'',
          orthopaedicConsumablesDetail:[]
        },
        pramesDate:{
          orderId:'',
        },
        resDate:{
          group:{}
        },
        prames2:{
          id:'',
          additional:''
        },
        prames3:{
          id:'',
          additional:''
        },
        prames4:{
          id:'',
          status:'',
          invalidReason:''
        },
        passText:'审核通过',
        rejectText:'拒绝收货',
        cancelText:'作废订单',
      }
    },
    components:{dataLoading},
    created: function () {
      // window.parent.scrollTo(0, 0);
      this.titleFlag=this.$route.params.term
      console.log(this.titleFlag)
      this.get_data();
      this.orderDetail()
    },
    // updated () {
    //   this.$nextTick(function(){
    //     let position = this.$store.state.position //返回页面取出来
    //     window.scroll(0, position)
    //     console.log('位置:'+position)
    //   }) 
    // },
    methods: {
      get_data: function(params) {
        let param = Object.assign({}, this.iptVal);
        Group.getUserinformation(param)
          .then(response => {
            this.resDate = response;
            console.log(this.resDate.group)
            console.info('success')
          }, response => {
            console.info('fail')
          });
        //
      },
      orderDetail () {
          SerachOrder.orderId({params: this.$route.params.id}).then(res => {
            // window.parent.scrollTo(0, 0);
            this.noData=!this.noData
            this.showForm = res
            this.pramesDate.orderId= this.showForm.id
            this.operationId=res.orthopaedicsCombo.id
            if(this.showForm.additional!=null){
              this.showForm.additional=this.showForm.additional.replace(/[;]/g,"<br>")
            }
            if(this.showForm.cancelReason!=null){
              this.showForm.cancelReason=this.showForm.cancelReason.replace(/[;]/g,"<br>")
            }
            if(this.showForm.invalidReason!=null){
              this.showForm.invalidReason=this.showForm.invalidReason.replace(/[;]/g,"<br>")
            }
            if(this.showForm.remark!=null){
              this.showForm.remark=this.showForm.remark.replace(/[;]/g,"<br>")
            }
           
            console.log(this.operationId)
            //获取器械名称
            Doctor.comboId(this.operationId)
            .then(response => {
              this.appatatus = response.apparatusName+'/'+response.code;
              let storage = window.localStorage;
              storage.setItem('appatatusShow',this.appatatus)
              storage.setItem('appatatusNameShow',response.apparatusName)
              console.info('success')
            }, response => {
              console.info('fail')
            })
            this.prames.id=this.showForm.id
            this.prames2.id=this.showForm.id
            this.prames3.id=this.showForm.id
            this.prames4.id=this.showForm.id
            if(res.status==4||res.status==6){
              this.prames.status=5
            }
            if(res.status==12||res.status==5||res.status==1||res.status==2){
              this.isReceive=false
            }
            if(res.status==9||res.status==11||res.status==5){
              this.passCheck=true
              this.rejectCheck=true
            }
            if(this.resDate.group == 'doctor'){
              this.passCheck=false
              this.rejectCheck=false
            }
            if(this.resDate.group == 'doctor'&&res.status==3||this.resDate.group == 'doctor'&&res.status==4){
              this.revoke=true
              this.reAdd=true
            }
            if(this.resDate.group!= 'doctor'&&this.$route.params.term==1){
               this.passCheck=false
               this.rejectCheck=false
               this.charging=false
            }
            if(this.resDate.group == 'supplier'&&(res.status==4||res.status==6)){
               this.passCheck=true
               this.rejectCheck=false
               this.passText='确认订单'
            }
            // 器材处已确认/已拒收/未审核
            if(this.resDate.group== 'equip-staff'&&(res.status==5||res.status==11)){
              this.cancelCheck=true
              this.passCheck=true
              this.rejectCheck=true
              this.passText='确认收货'
              this.cancelText='作废订单'
              this.rejectText='拒绝收货'
            }
            // 器材处中途取消/未审核
            if(this.resDate.group== 'equip-staff'&&(res.status==7||res.status==3)){
              this.rejectCheck=false
            }
            // 器材处中途取消
            if(this.resDate.group== 'equip-staff'&&res.status==7){
               this.passCheck=true
               this.passText='审核通过'
            }
            // 器材处未审核
            if(this.resDate.group== 'equip-staff'&&res.status==3){
              this.passCheck=true
              this.rejectCheck=false
              this.passText='审核通过'
              this.cancelCheck=true
              this.cancelText='取消订单'
            }
            if((this.resDate.group== 'equip-staff'||this.resDate.group== 'nurse')&&this.showForm.orderType==3){
              this.rejectCheck=false
              this.cancelCheck=false
            }
            if(this.resDate.group== 'nurse'&&res.status==10){
              this.charging=true
            }

            if(this.resDate.group== 'nurse'){
              this.passText='验收通过'
              this.rejectText='拒绝验收'
            }
          })
      },
      receiveRequest () {
        SerachOrder.put({params: this.prames}).then(res => {
          this.maskShow=!this.maskShow
          this.isReceive=false
        })
      },
      passcheckFun () {
        if(this.showForm.status==3||this.showForm.status==7){
          this.prames.status=4
        }
        if(this.showForm.status==5){
          this.prames.status=9
        }
        if(this.showForm.status==11){
          this.prames.status=9
        }
        if(this.showForm.status==9){
          this.prames.status=10
        }
        if(this.showForm.status==7){
          this.prames.status=8
        }
        if(this.showForm.status==6){
          this.prames.status=5
        }
        if(this.resDate.group == 'supplier'&&this.showForm.status==4){
          this.prames.status=5
        }
        if(this.resDate.group== 'supplier'){
          this.status='成功确认'
        }
        else{
          this.status='成功处理'
        }
        if(this.resDate.group == 'supplier'){
          this.packageDetailBySup();
        }
        else{
          this.mainCnt=!this.mainCnt
          this.checkPass=!this.checkPass
          console.log(this.checkPass)
          SerachOrder.put({params: this.prames}).then(res => {
            this.timer=setTimeout(function(){
                window.history.go(-1)
            },3000)
          })  
        }
      },
      rejectcheckFun () {
        this.mainCnt=!this.mainCnt
        this.checkPass=!this.checkPass
        if(this.showForm.status==3||this.showForm.status==7){
          this.prames.status=2
        }
        if(this.showForm.status==9){
          this.prames.status=11
        }
        if(this.showForm.status==11){
          this.prames.status=4
        }
        if(this.showForm.status==5){
          this.prames.status=4
        }
        this.status='拒绝审核'
        SerachOrder.put({params: this.prames}).then(res => {
         this.timer=setTimeout(function(){
            window.history.go(-1)
          },3000)
        })
      },
      //器材处作废/取消订单
      cancelFun () {
        var modalInfo=document.getElementById('modal_info3')
        if(this.showForm.status==5||this.showForm.status==11){
          this.prames4.status=2
        }
        if(this.showForm.status==3){
          this.prames4.status=8
        }
        var newString = modalInfo.value.replace(/\n/g, ';').replace(/\r/g, '_#')
        if(modalInfo.value.length==0){
          modalInfo.style.border="red solid 1px"
        }
        else{
          this.prames4.invalidReason=newString
          SerachOrder.put({params: this.prames4}).then(res => {
              window.history.go(-1)
          })
        }
      },
      refresh (){
        clearTimeout(this.timer);
         this.timer=setTimeout(function(){
            window.history.go(-1)
          },1000)
      },
      cancelCntFunc (){
        var modalInfo=document.getElementById('modal_info3')
        this.maskShow4=!this.maskShow4
        if(this.showForm.status==3){
          modalInfo.setAttribute("placeholder","请输入取消理由");
        }
      },
      //医生中途取消
      revokeFun () {
        var modalInfo=document.getElementById('modal_info2')
        var newString = modalInfo.value.replace(/\n/g, ';').replace(/\r/g, '_#')
        if(modalInfo.value.length==0){
          modalInfo.style.border="red solid 1px"
        }
        else{
            this.prames3.additional=encodeURIComponent(newString)
            Doctor.cancelOrder({params: this.prames3}).then(res => {
              window.history.go(-1)
          })
         }
      },
      reAddFun () {
        var modalInfo=document.getElementById('modal_info')
        var newString = modalInfo.value.replace(/\n/g, ';').replace(/\r/g, '_#')
        if(modalInfo.value.length==0){
          modalInfo.style.border="red solid 1px"
        }
        else{
           this.prames2.additional= encodeURIComponent(newString)
            Doctor.appendOrder({params: this.prames2}).then(res => {
              window.history.go(-1)
          })
         }
      },
      goBack (){
        if(this.$route.params.term==1){
           this.$router.push({path:'/historyOrder'})
        }
        else{
           this.$router.push({path:'/vieworder'})
        }
      },
      packageDetailBySup (){
        SerachOrder.packageDeatil({params: this.pramesDate}).then(res => {
            this.packageData = res
            var _this=this
            this.packageData.forEach((item) =>{
                  if(item.validityDate==''||item.validityDate==null||item.sterilizationNumber==''||item.sterilizationNumber==null){
                        this.infoWarning=true
                        _this.warningText='您要直接确认该订单么?<p style="color:red;font-size: 0.35rem;">警告: 请先核对订单信息,然后对耗材套餐数据进行编辑 !</p>'
                        let s=0
                        _this.checkFlag.push(s)
                        return false
                    }
                    else{
                    let t=1
                      _this.checkFlag.push(t)
                      return false
                    }
              });
             // 判断检验结果是否都通过,直到全部通过
                var templeteFlag=true
                if(_this.checkFlag.length>0){
                  for(var i=0;i<_this.checkFlag.length;i++){
                    if(_this.checkFlag[i]!=1){
                      this.infoWarning=true
                      _this.warningText='您要直接确认该订单么?<p style="color:red;font-size: 0.35rem;">警告: 请先核对订单信息,然后对耗材套餐数据进行编辑 !</p>'
                      templeteFlag=false
                      return false
                    }
                  }
                }
                if(_this.checkFlag.length>0&&templeteFlag){
                  this.mainCnt=!this.mainCnt
                  this.checkPass=!this.checkPass
                  console.log(this.checkPass)
                  SerachOrder.put({params: this.prames}).then(res => {
                    this.timer=setTimeout(function(){
                      window.history.go(-1)
                    },3000)
                  })  
                }
          })
      },
      supplyInfoFunc (){
        this.infoWarning=!this.infoWarning
        this.mainCnt=!this.mainCnt
        this.checkPass=!this.checkPass
        console.log(this.checkPass)
        SerachOrder.put({params: this.prames}).then(res => {
          this.timer=setTimeout(function(){
            window.history.go(-1)
          },3000)
        })  
      }
    }
  }
</script>
<style lang='scss'>
.fade-enter-active, .fade-leave-active{
  transition: all 0.5s ease     
}
.fade-enter, .fade-leave-active{
  opacity: 0 
}
.orderConfirmPage{
    position: absolute;
    top: 0;
    z-index: 100;
    background: #fff;
    .reback_nav{
      height:95px;
      line-height:95px;
      font-size:30px;
      color:#000;
      padding-left:32px;
      font-family:'微软雅黑';
      border-bottom:solid 1px #c6cbd1;
      background:#fff;
      .icon_return{
        display:inline-block;
        margin-right:48px;
        height:44px;
        vertical-align: middle;
          margin-top: -12px;

      }
    }
    .orderConfirmPage_cnt{
      background:#fff;
      text-align:center;
      color:#656464;
      font-size:28px;
      .info_two{
        margin:32px 0 90px;
      }
    }
  }
</style>