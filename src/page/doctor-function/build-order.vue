<!--《如何编写不可维护的代码》-->
<template>
  <div class="build-order">
    <div class="build-order-head">
      <router-link :to="{ path: '/supplierIndex'}">
        <div class="build-orde-head-icon">
           <img src="../../assets/return.png">
        </div>
      </router-link>
      <div class="build-order-head-title">下达订单</div>
    </div>
    <div class="build-order-information">
      <div class="build-order-information-title"><div class="build-order-information-hidenicon hidenicon"></div>订单信息填写</div>
      <div class="build-order-information-operation">
        <div class="build-order-information-operation-title">手术排班</div>
        <div class="build-order-information-operation-chooseresult">
          <input type="text" placeholder="患者" v-model="resDate1.patientName" class="operation_select" id="operation_select" disabled>
        </div>
      </div>
      <div class="build-order-information-operation-detail">
        <router-link :to="{ path: '/chooseoperation'}">
          <button class="build-order-information-operation-detail-button">手术排班详情</button>
        </router-link>
      </div>
    </div>
    <div class="build-order-patient-detail">
      <div class="build-order-patient-detail-title" @click="patientToggle"><div class="build-order-patient-detail-hidenicon hidenicon"></div>患者详情<span class="icon_toggle" id="icon_toggle"></span></div>
      <div class="build-order-patient-detail-information" v-show="patientStatus">
        <div class="build-order-patient-detail-id">
          <div class="build-order-patient-detail-id-name">患者ID</div>
          <div class="build-order-patient-detail-id-data">
            <input type="number" class="patId pat" v-model='resDate1.patientId' v-on:input="inputFunc">
          </div>
        </div>
        <div class="build-order-patient-detail-patid">
          <div class="build-order-patient-detail-patid-name">患者病案号</div>
          <div class="build-order-patient-detail-patid-data">
            <input type="number" class="patProfile pat" v-model='resDate1.inpNo' v-on:input="inputFunc">
          </div>
        </div>
        <div class="build-order-patient-detail-name">
          <div class="build-order-patient-detail-name-name">患者姓名</div>
          <div class="build-order-patient-detail-name-data">
            <input type="text" class="patName pat" v-model='resDate1.patientName' v-on:input="inputFunc">
          </div>
        </div>
        <div class="build-order-patient-detail-age">
          <div class="build-order-patient-detail-age-name">患者年龄</div>
          <div class="build-order-patient-detail-age-data">
            <input type="text" maxlength="3" oninput="value=value.replace(/[^\d]{1,3}/g,'')"  class="patAge pat" v-model='resDate1.age' v-on:input="inputFunc">
          </div>
        </div>
        <div class="build-order-patient-detail-sex">
          <div class="build-order-patient-detail-sex-name">患者性别</div>
          <div class="redioSex">
            <input type="radio" name="people" class="patSex man" :class="{'radioChecked': radioFlag == 0}" @click="iptChecked(0)">
            <label for="man">男</label>
            <input type="radio" name="people" class="patSex womon":class="{'radioChecked': radioFlag == 1}" @click="iptChecked(1)">
            <label for="womon">女</label>
          </div>
        </div>
      </div>
    </div>
    <div class="build-order-package">
      <div class="build-order-package-title" @click="toolToggle"><div class="build-order-package-hidenicon hidenicon"></div>套餐器材<span class="icon_toggle" id="icon_toggle2"></span></div>
      <div v-show="toolStatus">
        <div class="build-order-package-choosepackage">
          <div class="build-order-package-choosepackage-title">
            选择套餐
          </div>
          <div class="build-order-package-choosepackage-data">
            <div class="build-order-package-choosepackage-data-content"><input type="text" v-model='combName' disabled></div>
            <router-link :to="{ path: '/choosePackage'}">
              <div class="build-order-package-choosepackage-data-icon"></div>
            </router-link>
          </div>
        </div>
        <div class="build-order-package-chooseappturate">
          <div class="build-order-package-chooseappturate-title">
            手术器械
          </div>
          <div class="build-order-package-chooseappturate-data">
            <div class="build-order-package-chooseappturate-content"><input type="text" v-model="this.apparatusName_code" disabled></div>
            <router-link :to="'/chooseapparatus/'+term">
              <div class="build-order-package-chooseappturate-icon"></div>
            </router-link>
          </div>
        </div>
        <div class="build-order-package-vendor">
          <div class="build-order-package-vendor-title">
            供应商
          </div>
          <div class="build-order-package-vendor-data">
            <div class="build-order-package-vendor-data-content"><input type="text" v-model='vendorName' disabled></div>
            <router-link :to="{ path: '/chooseSupplier'}">
              <div class="build-order-package-vendor-data-icon"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="build-order-remark">
      <div class="build-order-remark-title" @click="remarkToggle"><div class="build-order-remark-hidenicon hidenicon"></div>医嘱与备注<span class="icon_toggle" id="icon_toggle3"></span></div>
      <div class="build-order-remark-information" v-show="remarkStatus">
        <div class="build-order-remark-information-input">
          <textarea type="text" placeholder="请输入文字信息..." class="patRemark" id="patRemark" v-model="textareaCnt" v-on:input="textareaFunc"></textarea>
        </div>
      </div>
    </div>
    <div class="build-order-confirm">
      <div class="build-order-confirm-button">
        <button  @click="buildorder">下单</button>
      </div>
    </div>
<!--     <div class=" foot_section_build">
      Copyright © Rivamed
    </div> -->
    <transition name="fade">
          <div class="mask_modal confirmBox" v-show="maskShow">
            <div class="modal_cnt">
              <div class="icon_close" @click="maskShow=!maskShow"></div>
              <div class="ask_cnt">确认提交该订单吗?</div>
              <div class="btn_group">
                <button class="btn_confirm_small" id="btn_buildorder" @click="buildorderConfirm">确定</button>
                <button class="btn_cancel_small" @click="maskShow=!maskShow">取消</button>
              </div>
            </div>
          </div>
    </transition>
    <transition name="fade">
      <div class="mask_modal confirmBox" v-show="infoWarning">
        <div class="modal_cnt">
          <div class="icon_close" @click="infoWarning=!infoWarning"></div>
          <div class="ask_cnt">{{warningText}}</div>
          <div class="btn_group">
            <div class="btn_confirm_small" @click="infoWarning=!infoWarning">确定</div>
          </div>
        </div>
      </div>
   </transition>
  </div>
</template>
<script>
  import { Doctor } from '../../config/api'
  import Bus from '../../js/eventBus.js';  
  export default {
    data () {
      return {
        maskShow:false,
        patientStatus: true,
        toolStatus: true,
        remarkStatus: true,
        infoWarning:false,
        storage:{},
        term:0,
        warningText:'',
        resDate1:{
          patientId:'',
          inpNo:'',
          patientName:'',
          age:'',
          sex:'男'
        },
        resDate2:{},
        apparatusName_code:'',
        combName:'',
        apparatusName:'',
        vendorName:'',
        inpNo:'',
        iscreated:false,
        sexDrop:false,
        activeArrow:true,
        activeArrow2:true,
        activeArrow3:true,
        sexChoosedsFlag:0,
        textareaCnt:'',
        radioFlag:0,
      }
    },
    mounted () {
      let storage = window.localStorage;
      let inpNo=storage.getItem('inpNo')
      let combName=storage.getItem('combName')
      let packageId=storage.getItem('packageId')
      let apparatusFlag=storage.getItem('apparatusFlag')
     if ((packageId!=undefined||packageId!=null)&&apparatusFlag!=0) {
        //手术套餐选择包含手术器械
        this.comboId(packageId)
      }
      this.combName = combName;
      let apparatusName=storage.getItem('apparatusName')
      this.apparatusName = apparatusName;
      let vendorName=storage.getItem('vendorName')
      this.vendorName = vendorName;
      let apparatusName_code=storage.getItem('CodeName')
      this.apparatusName_code = apparatusName_code;
      // //监听页面刷新
      // window.onbeforeunload = function(event) {
      //  window.localStorage.clear();
      // };
      //恢复input输入功能
      var pat=document.getElementsByClassName('pat')   
        for (var i=0; i< pat.length; i++){
          pat[i].removeAttribute("disabled");
      }
      //判断是否加急订单
      if(inpNo!=null){
        this.findScheduleById(inpNo);
      }
      else{
        this.resDate1.patientId=storage.getItem('res1patient0')
        this.resDate1.inpNo=storage.getItem('res1patient1')
        this.resDate1.patientName=storage.getItem('res1patient2')
        this.resDate1.age=storage.getItem('res1patient3')
        console.log(storage.getItem('res1patient4'))
        document.getElementsByClassName('patSex')[0].disabled =false
        document.getElementsByClassName('patSex')[1].disabled =false
        if(storage.getItem('res1patient4')==null||storage.getItem('res1patient4')==""){
          this.radioFlag=0
        }
        else{
          this.radioFlag=storage.getItem('res1patient4')
        }
      }
      this.textareaCnt=storage.getItem('patRemark')
      let coStatus=storage.getItem('coStatus')
      //判断是否是加急订单
      if(coStatus){//.setAttribute("disabled", "disabled");
        var pat=document.getElementsByClassName('pat')   
        for (var i=0; i< pat.length; i++){
          pat[i].setAttribute("disabled", "disabled");
        }
      }
    },
    methods: {
      inputFunc (){
        //初始患者信息输入内容
        var pat=document.getElementsByClassName('pat')   
        let storage = window.localStorage;
        for (var i=0; i< pat.length; i++){
          storage.setItem('res1patient'+i,pat[i].value)
        }
      },
      textareaFunc (){
        var pat=document.getElementById('patRemark').value
        var newString = pat.replace(/\n/g, ';').replace(/\r/g, '_#')
        let storage = window.localStorage;
        storage.setItem('patRemark',newString)
      },
      findScheduleById (target) {
        Doctor.findScheduleById(target)
          .then(response => {
            //this.resDate1 = response;
            this.resDate1.patientId=response.patientId
            this.resDate1.inpNo=response.inpNo
            this.resDate1.patientName=response.patientName
            this.resDate1.age=response.age
            if(response.sex=='男'){
               this.radioFlag=0
            }
            else{
              this.radioFlag=1
            }
            document.getElementsByClassName('patSex')[0].disabled =true
            document.getElementsByClassName('patSex')[1].disabled =true 
          }, response => {
            console.info('fail')
          })
      },
      //手术套餐选择
      comboId (packageId){
        Doctor.comboId(packageId)
          .then(response => {
            this.resDate2 = response;
            this.apparatusName_code=response.apparatusName+'/'+response.code
            window.localStorage.setItem("appratusId",response.id)
            console.info('success')
          }, response => {
            console.info('fail')
          })
      },
      iptChecked (index){
        this.radioFlag=index
        window.localStorage.setItem('res1patient4',index)
      },
      //切换滑块
      patientToggle: function() {
          this.patientStatus = !this.patientStatus;
          if(this.activeArrow){
            let iconToggle = document.getElementById('icon_toggle');
            iconToggle.className='icon_toggle_active'
            this.activeArrow=!this.activeArrow
          }
          else{
            let iconToggle = document.getElementById('icon_toggle');
            iconToggle.className='icon_toggle'
            this.activeArrow=!this.activeArrow
          }
         
      },
      toolToggle: function() {
          this.toolStatus = !this.toolStatus;
          if(this.activeArrow2){
            let iconToggle2 = document.getElementById('icon_toggle2');
            iconToggle2.className='icon_toggle_active'
            this.activeArrow2=!this.activeArrow2
          }
          else{
            let iconToggle2 = document.getElementById('icon_toggle2');
            iconToggle2.className='icon_toggle'
            this.activeArrow2=!this.activeArrow2
          }
      },
      remarkToggle: function() {
          this.remarkStatus = !this.remarkStatus;
         if(this.activeArrow3){
            let iconToggle3 = document.getElementById('icon_toggle3');
            iconToggle3.className='icon_toggle_active'
            this.activeArrow3=!this.activeArrow3
          }
          else{
            let iconToggle3 = document.getElementById('icon_toggle3');
            iconToggle3.className='icon_toggle'
            this.activeArrow3=!this.activeArrow3
          }
      },
      buildorder:function(){
        let storage = window.localStorage;
        let coStatus=storage.getItem('coStatus')
        let patientId = this.resDate1.patientId
        let patientProfile =this.resDate1.inpNo
        let patientName = this.resDate1.patientName
        let patientAge = this.resDate1.age
        if(this.radioFlag==0){
          this.resDate1.sex='男'
        }
        else{
          this.resDate1.sex='女'
        }
        let patientSex = this.resDate1.sex
        let patientRemark = document.getElementById('patRemark').value;
        let vendorId = storage.getItem('vendorId')
        let vendorName = storage.getItem('vendorName')
        let comboId = storage.getItem('packageId')
        let appratusId = storage.getItem('appratusId')
        console.log(patientSex)
        if((patientId ==null||patientId =='')|| (patientProfile  ==null||patientProfile  =='')|| (patientName ==null||patientName =='')|| (patientSex ==null||patientSex =='')|| (patientAge ==null||patientAge =='')){
          this.warningText="患者信息不能为空!"
          this.infoWarning=true
        }
        else if(comboId == null||comboId == ''){
          this.warningText="请选择套餐!"
          this.infoWarning=true
        }
        else if((vendorId ==null||vendorId =='')|| (vendorName ==null||vendorName =='')){
          this.warningText="请选择供应商!"
          this.infoWarning=true
        }
        else if(appratusId ==null||appratusId ==''){
          this.warningText="请选择手术器械!"
          this.infoWarning=true
        }
        else{
          this.maskShow=! this.maskShow
        }
      },
      buildorderConfirm:function(){
        let btnBuildorder = document.getElementById('btn_buildorder');
        btnBuildorder.setAttribute("disabled", true);
        let storage = window.localStorage;
        let coStatus=storage.getItem('coStatus')
        if(coStatus=='true'){
          coStatus=false
        }
        else{
          coStatus=true
        }
        console.log(coStatus)
        let param = {
            comboId: storage.getItem('packageId'),
            patientId: this.resDate1.patientId,
            inpNo: this.resDate1.inpNo,
            name: this.resDate1.patientName,
            age: this.resDate1.age,
            sex: this.resDate1.sex,
            vendorId:storage.getItem('vendorId'),
            vendorName:storage.getItem('vendorName'),
            remark: storage.getItem('patRemark'),
            rushOrder : coStatus,
            appratusId : storage.getItem('appratusId'),
            scheduleId : storage.getItem('operateId')
          };
        Doctor.placeOrder(param)
          .then(response => {
            this.maskShow=!this.maskShow
            console.log(response)
            let btnBuildorder = document.getElementById('btn_buildorder');
            btnBuildorder.removeAttribute("disabled");
            this.$router.push({path: '/supplierIndex'});
          }).catch(error => {
            if (error.response) {
              var res=error.response.data
              var mes=error.response.data.message
              mes=mes.substr(mes.lastIndexOf(':')+1)
              console.log(mes)
              let btnBuildorder = document.getElementById('btn_buildorder');
              btnBuildorder.removeAttribute("disabled");
              this.maskShow=!this.maskShow
              this.infoWarning=!this.infoWarning
              this.warningText=mes
              // console.log(error.response.status);
              // console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
        }
    }
  }
</script>
<style type="text/css">
  .foot_section_build{
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    border-top: solid 1px #c6cbd1;
    color: #b6c4c2;
    font-size: 0.39rem;
  }
</style>
