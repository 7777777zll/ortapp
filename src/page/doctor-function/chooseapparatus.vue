<template>
  <div class="choose-apparatus">
    <div class="choose-apparatus-head">
      <router-link :to="{ path: '/buildorder'}">
        <div class="choose-aipparatus-icon">
          <img src="../../assets/return.png">
        </div>
      </router-link>
      <div class="choose-apparatus-title" v-show="!iptSearch">手术器械选择</div>
      <div class="view-order-serachorder" >
        <div class="view-order-serachorder-input" v-show="iptSearch">
          <input type="text" placeholder="请输入器械id或器械名称" value="" id="ipt_value" v-model="prames.term">
            <span @click="searchWhat" class="searchText">搜索</span>
        </div>
      </div>
      <div class="order_search_icon" v-show="!iptSearch" @click="iptSearch=!iptSearch">
        <img src="../../assets/search_normal.png">
      </div>
    </div>
   <!--  <div class="choose-apparatus-serachorder">
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
          <div class="choose-apparatus-serach-result-information-lineone">器械ID：{{item.id}}</div>
          <div class="choose-apparatus-serach-result-information-linetwo">器械名称：{{item.apparatusName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { SerachApparatus } from '../../config/api'
  export default {
    data() {
      return {
        tableData: [],
        listnoData:false,
        prames:{
          term: '',
        },
        term:'',
        noData:true,
        iptSearch:false,
      }
    },
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.term=this.$route.params.term
      this.SerachApparatus()
    },
    methods: {
      searchWhat:function(){
          // this.iptSearch=false
          // if(this.prames.term){
          //   this.prames.term=""
          //   this.SerachApparatus()
          // }
          // else{
          //   this.prames.term=""
          // }
           this.SerachApparatus()
      },
      SerachApparatus () {
        this.tableData.length=0
        this.noData=true
        this.listnoData=false
        SerachApparatus.get({params: this.prames})
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
        storage.setItem("appratusId",this.tableData[index].id)
        storage.setItem("apparatusName",this.tableData[index].apparatusName)
        storage.setItem("apparatusCode",this.tableData[index].code)
        storage.setItem("apparatusFlag",0)
        storage.setItem("CodeName",this.tableData[index].apparatusName+'/'+this.tableData[index].code)
        this.$router.push({path:'/toolsDetail/'+item.id+'/'+this.term})
        // this.$router.push({path:'/buildorder'});
      }
    },
  }
</script>
