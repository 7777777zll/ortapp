<template>
  <div class="choose-operation">
    <div class="choose-operation-head">
      <router-link :to="'/buildorder'">
      <div class="choose-operation-icon">
        <img src="../../assets/return.png">
      </div>
    </router-link>
    <div class="choose-operation-title" v-show="!iptSearch">手术排班搜索</div>
    <div class="view-order-serachorder" >
      <div class="view-order-serachorder-input" v-show="iptSearch">
        <input type="text" placeholder="请输入病案号或病人姓名" value="" id="ipt_value" v-model="prames.term">
        <span @click="searchWhat" class="searchText">搜索</span>
      </div>
    </div>
    <div class="order_search_icon" v-show="!iptSearch" @click="iptSearch=!iptSearch">
      <img src="../../assets/search_normal.png">
    </div>
  </div>
    <!--   <div class="choose-operation-serachoperation">
        <div class="choose-operation-serachoperation-input">
          <input type="text" placeholder="请输入病人姓名或者病案号" v-model="prames.term">
          <div class="choose-operation-serachoperation-input-icon" @click="operationSearch"></div>
        </div>
      </div> -->
      <div class="mescroll" id="mescroll">
        <div id="dataList" class="data-list">  
          <div class="choose-operation-serachresult" v-for="(item, index) in resDate" @click="savevalue(index)">
            <div class="choose-operation-serachresult-left-light"></div>
            <div class="choose-operation-serachresult-left">
              <div class="choose-operation-serachresult-redius-top"></div>
              <div class="choose-operation-serachresult-redius-bottom"></div>
              <div class="choose-operation-serachresult-redius-left"></div>
              <div class="choose-operation-serachresult-redius-right"></div>
              <div class="choose-operation-serachresult-left-num">{{$index< 10 ? '0' + $index: $index}}</div>
              <div class="choose-operation-serachresult-left-icon1"></div>
              <div class="choose-operation-serachresult-left-name">{{item.doctorName}}</div>
              <div class="choose-operation-serachresult-left-icon2"></div>
              <div class="choose-operation-serachresult-left-address">{{item.operationRoom}}</div>
            </div>
            <div class="choose-operation-serachresult-right">
              <div class="choose-operation-serachresult-right-label-title"><label>手术名称</label></div>
              <div class="choose-operation-serachresult-right-label"><label>{{item.operationName}}</label></div>
              <div>
                <div class="choose-operation-serachresult-right-areaone">
                  <div class="choose-operation-serachresult-right-label-title"><label>姓名</label></div>
                  <div class="choose-operation-serachresult-right-label"><label>{{item.patientName}}</label></div>
                </div>
                <div class="choose-operation-serachresult-right-areatwo">
                  <div class="choose-operation-serachresult-right-label-title"><label>性别</label></div>
                  <div class="choose-operation-serachresult-right-label"><label>{{item.sex}}</label></div>
                </div>
              </div>
              <div>
                <div class="choose-operation-serachresult-right-areaone">
                 <div class="choose-operation-serachresult-right-label-title"><label>病案号</label></div>
                 <div class="choose-operation-serachresult-right-label"><label>{{item.inpNo}}</label></div>
               </div>
               <div class="choose-operation-serachresult-right-areatwo">
                <div class="choose-operation-serachresult-right-label-title"><label>手术诊断</label></div>
                <div class="choose-operation-serachresult-right-label"><label>{{item.operationDiagnosis}}</label></div>
              </div>
            </div>
            <div>
              <div class="choose-operation-serachresult-right-areaone">
                <div class="choose-operation-serachresult-right-label-title"><label>病房</label></div>
                <div class="choose-operation-serachresult-right-label"><label>{{item.wardRoom}}</label></div>
              </div>
              <div class="choose-operation-serachresult-right-areatwo">
               <div class="choose-operation-serachresult-right-label-title"><label>床号</label></div>
               <div class="choose-operation-serachresult-right-label"><label>{{item.bedNumber}}</label></div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>
<script>
  import { Doctor,Group } from '../../config/api'
  import Bus from '../../js/eventBus.js';  
  import MeScroll from 'mescroll.js'
  export default {
    data() {
      return {
        resDate: [],
        resDateGroup: '',
        prames:{
          term: '',
          page:0,
        },
        iptSearch:false,
      }
    },
    mounted () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.operationSearch()
    },
    methods: {
      // inputFunc:function(){
      //    this.operationSearch()
      // },
      searchWhat:function(){
        this.operationSearch()
      },
      operationSearch () {
       this.resDate.length=0
       if(this.mescroll){
         this.mescroll.destroy();
         this.mescroll.removeEmpty();
       }
       var self = this;
          // 上拉加载
          this.mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
            up: {
                  callback: self.upCallback, //上拉回调
                  empty:{ 
                    warpId:"dataList",
                    //icon : "../res/img/mescroll-empty.png" , 
                    tip : "亲,暂无相关数据哦~" , 
                  }
                }
              })
          document.getElementById("dataList").style.display="block";
        // Doctor.getOperationScheduled({params: this.prames})
        //   .then(response => {
        //     this.resDate = response;
        //     console.info('success')
        //   }, response => {
        //     console.info('fail')
        //   })
},
      //上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数
      upCallback(page) {
        var pageIndex = page.num-1;
          //联网加载数据
          var self = this;
          this.getListDataFromNet(pageIndex, page.size, function(curPageData,totalSize) { 
            //如果是第一页需手动制空列表
            if(pageIndex == 0) self.resDate = [];   
            //更新列表数据
            self.resDate = self.resDate.concat(curPageData);  
            self.mescroll.endSuccess(curPageData.length);
            //self.mescroll.endBySize(curPageData.length, totalSize); 
          }, function() {
            console.log('联网失败')
            self.mescroll.endErr();
          });
        },
        getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
          this.prames.page=pageNum
          Doctor.getOperationScheduled({params: this.prames})
          .then((response) => {
            var data=response.content;
            var total=response.total;
              successCallback&&successCallback(data,total);//成功回调  
            }, (response) => {
              console.log('fail')
            })   
        },
        savevalue(index){
         //Bus.$emit('getTarget', this.resDate[index].inpNo); 
         let storage = window.localStorage;
         storage.setItem('inpNo',this.resDate[index].inpNo)
         storage.setItem('coStatus',true)
         storage.setItem('operateId',this.resDate[index].id)
        // storage.operationId = item.id;
        // storage.patientId = item.patientId;
        // storage.patientName = item.patientName;
        // storage.sex = item.sex;
        // storage.age = item.age;
        this.$router.push({path:'/buildorder'})
      }
    },
  }
</script>
<style lang='scss'>
  .choose-operation{
    .mescroll{
      top:1.8rem;
    }
  }
</style>
