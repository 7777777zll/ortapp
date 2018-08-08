<template>
  <div class="viewShow">
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
  export default {
    components: {}
  }
</script>

<style lang="scss">
   @import "./style/style.scss";
   .viewShow{
      width:100%;
      overflow: auto;
      overflow-x:hidden;
   }
  .foot_section_fix {
    text-align: center;
    height: 64px;
    line-height: 64px;
    border-top: 1px solid #c6cbd1;
    color: #b6c4c2;
    font-size: 22px;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
</style>
