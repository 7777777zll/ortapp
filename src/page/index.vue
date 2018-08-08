<template>
  <div class="welcome">
    <div class="cnt">
      <img src="../assets/start/Startpage_logo.png" class="logo">
      <p class="text">骨科高值耗材APP 测试版</p>
    </div>
    <div class="foot_section">
          Copyright © Rivamed
      </div>
  </div>
</template>
<style lang="scss">
.welcome{
    
  .cnt{
    width:60%;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%,-50%);
    .logo{
      width:100%;
    }
    .text{
      font-size:0.5rem;
      color:#575656;
      margin-top:42px;
    }
  }
  .foot_section{
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    border-top: solid 1px #c6cbd1;
    color: #b6c4c2;
    font-size: 0.39rem;
    position: fixed;
    width: 100%;
    bottom:0;
  }
}
</style>
<script>
  export default {
    data() {
      return {
        lists:[]
      }
    },
    created () {
      var _this=this
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      setTimeout(function(){
        _this.$router.push({path:'/supplierIndex'})
      },2000)
    },
    methods: {

    },
  }
</script>
