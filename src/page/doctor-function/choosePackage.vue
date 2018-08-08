<template>
  <div class="choose-apparatus">
    <div class="choose-apparatus-head">
      <router-link :to="{ path: '/buildorder'}">
        <div class="choose-aipparatus-icon">
          <img src="../../assets/return.png">
        </div>
      </router-link>
      <div class="choose-apparatus-title" v-show="!iptSearch">选择套餐</div>
      <div class="view-order-serachorder" >
        <div class="view-order-serachorder-input" v-show="iptSearch">
          <input type="text" placeholder="请输入套餐id或套餐名称" value="" id="ipt_value" v-model="prames.term">
          <span @click="searchWhat" class="searchText">搜索</span>
        </div>
      </div>
      <div class="order_search_icon" v-show="!iptSearch" @click="iptSearch=!iptSearch">
        <img src="../../assets/search_normal.png">
      </div>
    </div>
<!--     <div class="choose-apparatus-serachorder">
      <div class="choose-apparatus-serachorder-input">
        <input type="text" placeholder="输入关键字" v-model="prames.term">
        <div class="choose-apparatus-serachorder-input-icon" @click="SerachApparatus"></div>
      </div>
    </div> -->
      <div class="main_cnt_show">
        <div v-show="noData" class="m-load2">
         <div class="line">
             <div></div>
             <div></div>
             <div></div>
             <div></div>
             <div></div>
             <div></div>
          </div>
          <div class="circlebg"></div>
        </div>
      <p class="empty-show" v-show="listnoData">亲,暂无相关数据哦~</p>
      <div class="choose-apparatus-serach-result" v-for="(item,index) in tableData" @click="savevalue(item,index)">
        <div class="choose-apparatus-serach-result-light"></div>
        <div class="choose-apparatus-serach-result-information">
          <div class="choose-apparatus-serach-result-information-lineone">套餐ID：{{item.id}}</div>
          <div class="choose-apparatus-serach-result-information-linetwo">套餐名称：{{item.combName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { SerachOrder } from '../../config/api'
  export default {
    data() {
      return {
        tableData: [],
        listnoData:false,
        titleFlag:0,
        prames:{
          term: '',
        },
        noData:true,
        iptSearch:false,
      }
    },
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.SerachApparatus()
    },
    methods: {
      // inputFunc:function(){
      //    this.SerachApparatus()
      // },
      searchWhat:function(){
         this.SerachApparatus()
      },
      SerachApparatus () {
        this.tableData.length=0
        this.noData=true
        this.listnoData=false
        SerachOrder.getOrthopaedicPackage({params: this.prames})
          .then(response => {
            this.noData=false
            if(response.length!=0){
              this.listnoData=false
              this.tableData = response;
              console.info('success')
            }
            else{
              this.tableData.length=0
              this.listnoData=true
            }
          }, response => {
            console.info('fail')
          })
      },
      savevalue(item,index){
        let storage = window.localStorage;
        window.localStorage.setItem('appatatusNameShow',item.combName)
        storage.setItem("packageId",this.tableData[index].id)
        storage.setItem("apparatusFlag",1)
        storage.setItem("combName",this.tableData[index].combName)
        this.$router.push({path:'/packageDetail/'+item.id+'/'+this.titleFlag})
        // this.$router.push({path:'/buildorder'});
      }
    },
  }
</script>
