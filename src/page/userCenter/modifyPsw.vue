<template>
  <div class="modifyPsw">
    <div class="reback_nav">
      <img src="../../assets/return.png" class="icon_return" onclick="window.history.go(-1)">
      <span>修改密码</span>
    </div>
    <div class="modifyPsw_cnt">
      <div class="modifyPsw_top">
        <!-- <img src="../../assets/password/password_hp.png" class="login_head"> -->
        <p class="login_name">{{roleName}}</p>
        <p class="login_hello">hello</p>
      </div>
      <div class="modifyPsw_middle">
        <div class="block">
          <label class="label">旧密码</label>
          <input type="text" placeholder="Password" class="psw_ipt" id="oldName" v-model="pswData.oldpassword">
          <!-- <div class="errorInfo">请输入</div> -->
        </div>
        <div class="block">
          <label class="label">新密码</label>
          <input type="text" placeholder="Password" class="psw_ipt" id="newName" v-model="pswData.newpassword">
        </div>
        <div class="block block_foot">
          <label class="label">再次输入</label>
          <input type="text" placeholder="Password" class="psw_ipt" id="confirmName"  v-model="confirmPsw">
        </div>
        <div class="btn_confirm" @click="onSubmit">确定</div>
      </div>
    </div>
<!--     <div class="foot_section">
      Copyright © Rivamed
    </div> -->
    <transition name="fade">
      <div class="mask_modal" v-show="maskShow">
        <div class="prompt_cnt">
          <div class="prompt_info">
            {{mdyInfo}}
          </div>
          <div class="btn_group">
            <div class="btn_confirm_small" @click="hrefToIndex">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { User,Group } from '../../config/api'
export default {
  data () {
    return {
      iptVal:'',
      roleName:'',
      rightStatus:0,
      maskShow:false,
      mdyInfo:'',
      confirmPsw: '',
      pswData: {
        oldpassword: '',
        newpassword: ''
      }
    }
  },
  created () {
    // 底部固定元素出现在弹出键盘上面的问题
    // var h = document.body.scrollHeight;
    // window.onresize = function(){
    //   if (document.body.scrollHeight < h) {
    //     document.getElementsByClassName("foot_section")[0].style.display = "none";
    //   }else{
    //     document.getElementsByClassName("foot_section")[0].style.display = "block";
    //   }
    // };
    this.get_data();
  },
  methods: {
    get_data: function(params) {
        let param = Object.assign({}, this.iptVal);
        Group.getUserinformation(param)
          .then(response => {
            this.resDate = response;
            this.roleName=response.name
            console.info('success')
          }, response => {
            console.info('fail')
          });
        //
    },
    onSubmit () {
      let param = Object.assign({}, this.pswData)
      let reg=/^[0-9a-zA-Z]{4,15}$/;
      if(this.pswData.oldpassword==''||this.pswData.newpassword==''||this.confirmPsw==''){
        this.maskShow=!this.maskShow
        this.mdyInfo='请输入密码!'
        return false;
      }
      else if(this.pswData.newpassword.indexOf(" ") != -1||this.confirmPsw.indexOf(" ") != -1){
        this.maskShow=!this.maskShow
        this.mdyInfo='密码中间不允许有空格!'
        return false;
      }
      else if(!reg.test(this.pswData.oldpassword)||!reg.test(this.pswData.newpassword)||!reg.test(this.confirmPsw)){
        this.maskShow=!this.maskShow
        this.mdyInfo='请输入4-15位由数字或字母组成的密码!'
        return false
      }
      else if(this.pswData.oldpassword==this.pswData.newpassword){
        this.maskShow=!this.maskShow
        this.mdyInfo='原密码和新密码相同!'
        return false;
      }
      else if(this.confirmPsw!=this.pswData.newpassword){
        this.maskShow=!this.maskShow
        this.mdyInfo='两次密码不一致!'
        return false;
      }
      else{
        User.modifyPsw(param)
        .then(response => {
          this.maskShow=!this.maskShow
          this.mdyInfo='密码修改成功!'
          this.rightStatus=1
          console.log(response)
        }, response => {
          this.maskShow=!this.maskShow
          this.mdyInfo='原密码不正确!'
        })
      } 
    },
    hrefToIndex (){
      this.maskShow=!this.maskShow
      if (this.rightStatus==1) {
        setTimeout(function(){
          window.history.go(-1)
        },1000)
      }
    }
  }
}
</script>
