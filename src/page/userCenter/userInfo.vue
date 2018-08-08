<template>
  <transition name='show-hide'>
    <div class="userInfo" v-show="userIsShow">
      <div class="mask" @click="isShowFunc"></div>
      <div class="userWrap">
        <div class="userInfo_cnt">
          <div class="userInfo_top">
            <!-- <img src="../../assets/flex/leftbar_hp.png" class="login_head"> -->
            <p class="login_name">
              <span class="name_show">{{roleName}}</span><span>, hello!</span>
            </p>
          </div>
          <div class="userInfo_middle">
          <router-link :to="{ path: '/modifyPsw'}">
            <div class="block block1">
               <div class="block_cell">
                  <span class="img_icon img_icon1"></span>
                  <span class="text">修改密码</span>
               </div>
             </div>
           </router-link>
           <div class="block block2" @click="signOut">
             <div class="block_cell">
                <span class="img_icon img_icon2"></span>
                <span class="text">退出</span>
             </div>
           </div>
          </div>
        </div>
        <div class="about">
          <p class="about_cnt1">骨科高值耗材 APP</p>
          <p class="about_cnt2">Android 测试版本</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { Group } from '../../config/api'
export default {
  data() {
    return {
      userIsShow:false,
      resDate:[],
      roleName:''
    }
  },
  created () {
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
    isShowFunc() {
      // this.userIsShow=!this.userIsShow
      console.log(this.userIsShow)
      this.$emit('status-change', this.userIsShow);
    },
    signOut (){
      let url=window.location.origin+'/logout'
      console.log(url)
      window.location.href=url
    }
  }
};
</script>