<template>
  <div class="view-order">
    <div class="view-order-head">
      <router-link :to="{ path: '/supplierIndex'}">
       <div class="view-order-head-icon">
          <img src="../assets/return.png">
       </div>
      </router-link>
      <div class="view-order-head-title" v-show="!iptSearch">全部订单列表</div>
      <div class="view-order-serachorder">
        <div class="view-order-serachorder-input" v-show="iptSearch">
          <input type="text" placeholder="请输入手术id或手术名称" value="" v-model="prames.conditions" v-if="resDate.group == 'supplier'&&orderType!=3">
          <input type="text" placeholder="请输入手术id或病案号" value="" v-model="prames.conditions" v-if="resDate.group != 'supplier'">
          <input type="text" placeholder="请输入手术id或套餐名称" value="" v-model="prames.conditions" v-if="resDate.group == 'supplier'&&orderType==3">
           <span @click="searchWhat" class="searchText">搜索</span>
           <!-- <span @click="iptSearch=!iptSearch">取消</span> -->
        </div>
      </div>
      <div class="order_search_icon" v-show="!iptSearch" @click="iptSearchChange">
        <img src="../assets/search_normal.png">
      </div>
    </div>
    <div class="type_wrap">
       <ul class="type_ul_wrap">
         <li :class="{type_tab_active: typeActive == 1}" class="type_li_cell" v-on:click.stop="setTypeSelectVal(1)">
              <span class="option_text">普通订单</span>
              <span class="order_num" v-if="ordertypeNum!=0">{{ordertypeNum}}</span>
        </li>
        <li :class="{type_tab_active: typeActive == item}" class="type_li_cell" v-for="(item,index) in typeDropList" v-on:click.stop="setTypeSelectVal(item)">
              <span class="option_text" v-if="item === 2" data='2'>追加订单</span>
              <span class="order_num" v-if="item === 2&&ordertypeNum2!=0">{{ordertypeNum2}}</span>
              <span class="option_text" v-if="item === 3" data='3'>加急订单</span>
              <span class="order_num" v-if="item === 3&&ordertypeNum3!=0">{{ordertypeNum3}}</span>
        </li>
      </ul>
    </div>
    <div class="tab_wrap">
      <ul class="ul_wrap">
        <li :class="{tab_active: active == -1}" class="li_cell" v-on:click.stop="setSelectVal(-1)"
            >
          <span class="option_icon option_icon_all"></span>
          <span class="option_text">全部</span>
          <span class="icon_heart"></span>
        </li>
        <li :class="{tab_active: active == item}" v-for="(item,index) in dropList" class="li_cell" v-on:click.stop="setSelectVal(item)">
              <span class="option_text" v-if="item === 1" data='1'>已完成</span>
              <span class="option_text" v-if="item === 2" data='2'>已作废</span>
              <span class="option_text" v-if="item === 3" data='3'>待审核</span>
              <span class="option_text" v-if="item === 4" data='4'>已审核</span>
              <span class="option_text" v-if="item === 5" data='5'>已确认</span>
              <span class="option_text" v-if="item === 6" data='6'>加急</span>
              <span class="option_text" v-if="item === 7" data='7'>中途取消</span>
              <span class="option_text" v-if="item === 8||item === 14" data='8'>已取消</span>
              <span class="option_text" v-if="item === 9" data='9'>已到货</span>
              <span class="option_text" v-if="item === 10" data='10'>已验收</span>
              <span class="option_text" v-if="item === 11" data='11'>已拒收</span>
              <span class="option_text" v-if="item === 12" data='12'>已计费</span>
              <span class="option_text" v-if="item === 13" data='13'>部分计费</span>
        </li>
      </ul>
      <div class="slide_warn_icon"></div>
    </div>
    <div class="mescroll" id="mescroll">
      <div  id="dataList" class="data-list">
        <div class="view-order-serach-result" :class="{'itemChoosed':itemChoosedFun(index)}"  v-for="(item,index) in pdlist" @click="historyToDetail(item,index)">
          <div class="view-order-serach-result-wrap">
            <router-link :to="'/ordercheck/'+item.id">
              <div class="view-order-serach-result-light"></div>
              <div class="view-order-serach-result-information">
                <div class="view-order-serach-result-information-patientId">手术ID：{{item.id}}</div>
                <div class="view-order-serach-result-information-orderid" v-if="item.patientOrthopaedics.ortOperationSchedule!=null">手术名称：{{item.patientOrthopaedics.ortOperationSchedule.operationName}}</div>
                <div class="view-order-serach-result-information-orderid" v-show="resDate.group != 'supplier'">病案号：{{item.patientOrthopaedics.inpNo}}</div>
                <div class="view-order-serach-result-information-orderid" v-show="resDate.group == 'supplier'">套餐名称：{{item.orthopaedicsCombo.combName}}</div>
              </div>
               <div class="view-order-serach-result-status" v-if="item.status === 1">已完成</div>
              <div class="view-order-serach-result-status" v-if="item.status === 2">已作废</div>
              <div class="view-order-serach-result-status" v-if="item.status === 3">待审核</div>
              <div class="view-order-serach-result-status" v-if="item.status === 4">已审核</div>
              <div class="view-order-serach-result-status" v-if="item.status === 5">已确认</div>
              <div class="view-order-serach-result-status" v-if="item.status === 6">加急</div>
              <div class="view-order-serach-result-status" v-if="item.status === 7">中途取消</div>
              <div class="view-order-serach-result-status" v-if="item.status === 8||item.status === 14">已取消</div>
              <div class="view-order-serach-result-status" v-if="item.status === 9">已到货</div>
              <div class="view-order-serach-result-status" v-if="item.status === 10">已验收</div>
              <div class="view-order-serach-result-status" v-if="item.status === 11">已拒收</div>
              <div class="view-order-serach-result-status" v-if="item.status === 12">已计费</div>
              <div class="view-order-serach-result-status" v-if="item.status === 13">部分计费</div>
              <!-- <div class="view-order-serach-result-status" v-if="item.status === 14">院内已作废</div> -->
            </router-link>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
  import { SerachOrder, Group, getCondition, emptyDataInfo} from '../config/api'
  import { CountByReadyStatus } from '../config/api'
  import MeScroll from 'mescroll.js'
  export default {
    data() {
      return {
        mescroll: null,
        iptText:'',
        term:1,
        orderType:1,
        ordertypeNum:0,
        ordertypeNum2:0,
        ordertypeNum3:0,
        prames:{
          term:1,
          page:0,
          status:-1,
          conditions:'',
          orderType:1,
        },
        dropSelected:'订单状态',
        seeMore: false,
        tableData: [],
        orderStatusIsShow:false,
        pdlist: [],
        dropList:[],
        typeDropList:[2,3],
        itemColor:[],
        colorChange:[],
        resDate:[],
        active:-1,
        typeActive:1,
        iptSearch:false,
        textSearchFlag:'取消',
        scroll: '',
        fixPos:0,
        imgLeftIcon: require('../assets/slide_left.png'),
        imgRightIcon: require('../assets/slide_icon.png'),
        // 订单查看已处理1,未处理2
        newMesNum:[{
          type:1,
          orderType:1,
        },{
          type:1,
          orderType:2,
        },{
          type:1,
          orderType:3,
        }],
      }
    },
    mounted: function () {
      var temp=JSON.parse(window.localStorage.getItem('temp'))
      if (temp){
         this.active = temp.status
         this.typeActive = temp.type
         this.prames.status=temp.status
         this.orderType=temp.orderType
         this.prames.orderType=temp.orderType
      }
      this.get_data()
      this.newMassage()
      this.serachOrder()
    },
    updated: function(){
      // tab切换宽度自适应
      var ulWrap=document.getElementsByClassName('ul_wrap')[0]
      var lis=document.getElementsByClassName('li_cell')
      var tabWrap=document.getElementsByClassName('tab_wrap')[0]
      var slideIcon=document.getElementsByClassName('slide_warn_icon')[0]
      var sumWid=0
      //滚动导航
      for (var i=0; i< lis.length; i++){
         sumWid+=lis[i].offsetWidth
      }
      if(sumWid<tabWrap.offsetWidth){
        ulWrap.style.width=tabWrap.offsetWidth+'px'
        slideIcon.style.display="none"
      }
      else{
        ulWrap.style.width=sumWid+'px'
        ulWrap.style.paddingRight='1rem'
        slideIcon.style.display="block"
      }
      // 返回时还原点击位置
      var temp=JSON.parse(window.localStorage.getItem('temp'))
      if (temp&&this.fixPos==0){
        tabWrap.scrollLeft=temp.menuPos
        if (tabWrap.scrollLeft==temp.menuPos) {          
          this.fixPos=1
        };
      }
      tabWrap.addEventListener('scroll',this.menu,false)
    },
    methods: {
      newMassage:function(){
          CountByReadyStatus.get({params: this.newMesNum[0]})
            .then(response => {
              this.ordertypeNum=response
              console.log(this.ordertypeNum)
              console.info('success')
            }, response => {
              console.info('fail')
            })
            CountByReadyStatus.get({params: this.newMesNum[1]})
            .then(response => {
              this.ordertypeNum2=response
              console.log(this.ordertypeNum2)
              console.info('success')
            }, response => {
              console.info('fail')
            })
            CountByReadyStatus.get({params: this.newMesNum[2]})
            .then(response => {
              this.ordertypeNum3=response
              console.log(this.ordertypeNum3)
              console.info('success')
            }, response => {
              console.info('fail')
            })
      },
      menu:function(){
        var tabWrap=document.getElementsByClassName('tab_wrap')[0]
        var slideIcon=document.getElementsByClassName('slide_warn_icon')[0]
        this.scroll = tabWrap.scrollLeft
        if(tabWrap.scrollWidth-tabWrap.scrollLeft==tabWrap.clientWidth){
          slideIcon.style.background="#fff url("+this.imgLeftIcon+") no-repeat center";
          slideIcon.style.backgroundSize="60% 60%"
        }
        if(tabWrap.scrollLeft==0){
          slideIcon.style.background="#fff url("+this.imgRightIcon+") no-repeat center";
          slideIcon.style.backgroundSize="60% 60%"
        }
      },
      searchWhat:function(){
          this.serachOrder()   
      },
      itemChoosedFun: function (index) {
        if(this.colorChange[index]!=-1){
          return true;
        }
        return false;
      },
       // 根据订单类型
      setTypeSelectVal: function (item) {
        var tabWrap=document.getElementsByClassName('tab_wrap')[0]
        this.iptSearch=false
        this.prames.conditions=''
        tabWrap.scrollLeft=0
        this.prames.status=-1
        this.active = -1
        this.orderType=item
        this.prames.orderType=this.orderType
        this.typeActive = item
        getCondition.getCondition(this.term,this.orderType)
        .then((response) => {
          this.dropList=response
            }, (response) => {
            console.log('fail')
          }) 
        this.serachOrder()
      },
      // 状态选择
      setSelectVal(item){
        this.iptSearch=false
        this.prames.conditions=''
        this.active = item
        this.prames.status=item;
        this.serachOrder()
      },
      get_data: function(params) {
        let param = Object.assign({}, this.iptVal);
        Group.getUserinformation(param)
          .then(response => {
            this.resDate = response;
            if(this.resDate.group == 'doctor'){
              this.role=0
            }
            else if(this.resDate.group == 'equip-staff'){
              this.role=1
            }
            else if(this.resDate.group == 'supplier'){
              this.role=2
            }
            else if(this.resDate.group == 'nurse'){
              this.role=3
            }
            getCondition.getCondition(this.term,this.orderType)
            .then((response) => {
              this.dropList=response
                }, (response) => {
                console.log('fail')
              })  
            console.info('success')
          }, response => {
            console.info('fail')
          }); 
      },
      serachOrder () {
         this.pdlist.length=0
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
                    // icon : "../res/img/mescroll-empty.png" , 
                    tip : "亲,暂无相关数据哦~" , 
                  }
                }
          })
          document.getElementById("dataList").style.display="block";
      },
       //上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数
      upCallback(page) {
        var pageIndex = page.num-1;
          //联网加载数据
          var self = this;
          this.getListDataFromNet(pageIndex, page.size, function(curPageData,totalSize) {  
            //如果是第一页需手动制空列表
            if(pageIndex == 0) self.pdlist = [];   
            //更新列表数据
            self.pdlist = self.pdlist.concat(curPageData);  
            for(var i=pageIndex*page.size;i<self.pdlist.length;i++){
              if(i==totalSize) break;
              if(!self.pdlist[i].doctorRead&&self.resDate.group == 'doctor'||
                !self.pdlist[i].vendorRead&&self.resDate.group == 'supplier'||
                !self.pdlist[i].equipmentRead&&self.resDate.group == 'equip-staff'||
                !self.pdlist[i].nurseRead&&self.resDate.group == 'nurse'){
                self.colorChange[i]=i
                self.itemColor[i]=true
              }
              else{
                self.colorChange[i]=-1
                self.itemColor[i]=false
              }
            }
            self.mescroll.endSuccess(curPageData.length);
            //self.mescroll.endBySize(curPageData.length, totalSize); 
          }, function() {
            console.log('联网失败')
            self.mescroll.endErr();
          });
      },
      getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
        this.prames.page=pageNum
        SerachOrder.condition({params: this.prames})
          .then((response) => {
            var data=response.content;
            var total=response.total;
              successCallback&&successCallback(data,total);//成功回调  
              }, (response) => {
              console.log('fail')
            })   
        },
        historyToDetail (item,index){
          var obj = {
            "type": this.orderType,
            "status": this.prames.status,
            "menuPos": this.scroll,
            'orderType':this.orderType
          };
          obj = JSON.stringify(obj);
          window.localStorage.setItem('temp',obj)
          this.$router.push({path:'/ordercheck/'+item.id+'/'+this.term})
          if(this.itemColor[index]){
            emptyDataInfo.emptyReadyMessage(item.id)
            .then((response) => {
             console.log(response.remark)
                }, (response) => {
                console.log('fail')
              })   
          }
        },
        iptSearchChange (){
          this.prames.conditions=''
          this.iptSearch=!this.iptSearch
        }
    },
  }
</script>
<style lang='scss'>
.listBox{
  .top-tip {
    position: absolute;
    top: -0;
    font-size:24px;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #555;
  }
  .bottom-tip {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #777;
    background: #f2f2f2;
    font-size:24px;
  }
}
</style>