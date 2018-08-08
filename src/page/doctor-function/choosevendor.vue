<template>
  <div class="choose-apparatus">
    <div class="choose-apparatus-head">
      <div class="choose-aipparatus-icon">
        <img src="../../assets/return.png">
      </div>
      <div class="choose-apparatus-title">供应商选择</div>
    </div>
    <div class="choose-apparatus-serachorder">
      <div class="choose-apparatus-serachorder-input">
        <input type="text" placeholder="输入关键字">
        <div class="choose-apparatus-serachorder-input-icon"></div>
      </div>
    </div>
    <div class="choose-apparatus-serach-result" v-for="item in tableData">
      <div class="choose-apparatus-serach-result-light"></div>
      <div class="choose-apparatus-serach-result-information">
        <div class="choose-apparatus-serach-result-information-lineone">供应商：</div>
        <div class="choose-apparatus-serach-result-information-linetwo">器械名称：{{item.apparatusName}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { SerachApparatus } from '../../config/api'
  export default {
    data() {
      return {
        tableData: [
        ]
      }
    },
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.SerachApparatus()
    },
    methods: {
      SerachApparatus () {
        SerachApparatus.get()
          .then(response => {
            this.tableData = response;
            console.info('success')
          }, response => {
            console.info('fail')
          })
      },
    },
  }
</script>
