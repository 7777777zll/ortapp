<template>
  <div class="docindex">
    <div class="docindex-head">
      <div class="docindex-head-title">骨科高值耗材APP</div>
      <div class="docindex-head-icon"></div>
    </div>
    <div class="docindex-banner"></div>
    <div class="docindex-function">
      <router-link :to="{ path: '/buildorder'}">
        <div class="docindex-function-orderview">
          <div class="docindex-function-orderview-icon"></div>
            <div class="docindex-function-orderview-title">下达订单</div>      
          <div class="docindex-function-orderview-titleE">To view</div>
        </div>
      </router-link>
      <router-link :to="{ path: '/buildorder'}">
        <div class="docindex-function-orderhistory">
          <div class="docindex-function-orderhistory-icon"></div>
          <div class="docindex-function-orderhistory-title">历史订单</div>
          <div class="docindex-function-orderhistory-titleE">details</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { CountByReadyStatus } from '../config/api'
  export default {
    data() {
      return {
        tableData: [
        ]
      }
    },
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.onSubmit()
    },
    methods: {
      onSubmit () {
        CountByReadyStatus.get()
          .then(response => {
            console.info('success')
          }, response => {
            console.info('fail')
          })
      },
    },
  }
</script>
