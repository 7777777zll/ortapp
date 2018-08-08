<template>
	<div class="historyPackageDetail">
		<div class="reback_nav">
	      <img src="../../assets/return.png" class="icon_return" onclick="window.history.go(-1)">
	      <span class="title">套餐详情</span>
	      <span class="fr"><span @click="unitFunc">{{operate?'编辑':'完成'}}</span></span>
		  <div class="cb"></div>
	    </div>
	    <div class="historyPackageDetail_cnt">
	    	<div class="detail_title cb">
	    		<div class="top_cell_pac">
					<span class="fl color_gary">手术套餐</span>
					<span class="fr">{{appatatusName}}</span>
					<div class="cb"></div>
				</div>
				<div>
					<span class="fl color_gary">手术耗材种类</span>
					<span class="fr">{{showForm.length}}</span>
					<div class="cb"></div>
				</div>
	    		<div class="radius-bottom-right"></div>
	    		<div class="radius-top-left"></div>
	    	</div>
	    	<dataLoading v-show="noData"></dataLoading>
	    	<div class="detail_cell1">
				<div class="tools_list" v-for="(items,index) in showForm">
					<div class="fl fl_cell">
						<p class="tool_label">物料名称</p>
						<p class="tool_info">{{items.consumablesName==null?'--':items.consumablesName}}</p>
						<div class="block_wrap">
		    				<div class="fl fl_cnt">
		    					<p class="tool_label">产品编码</p>
						        <p class="tool_info ">{{items.productCode==null?'--':items.productCode}}</p>
		    				</div>
		    				<div class="fl fl_right_cnt">
		    					<p class="tool_label">物料编码</p>
						        <p class="tool_info">{{items.materialCode==null?'--':items.materialCode}}</p>
		    				</div>
		    				<div class="cb"></div>
	    				</div>	
    					<div class="block_wrap">
		    				<div class="fl fl_cnt">
		    					<p class="tool_label" v-show='unitStatus'>灭菌批号</p>
								<p class="tool_info"  v-show='unitStatus'>{{items.sterilizationNumber==null?'--':items.sterilizationNumber}}</p>
		    				</div>
		    				<div class="fl fl_right_cnt">
								<p class="tool_label"  v-show='unitStatus'>有效期</p>
								<p class="tool_info tool_info_last" v-show='unitStatus'>{{items.validityDate==null?'--':items.validityDate}}</p>
		    				</div>
		    				<div class="cb"></div>
	    				</div>
						<p class="tool_label">数量</p>
						<p class="tool_info tool_info_last" v-show='unitStatus'>{{items.number==null?'0':items.number}}</p>
						<p class="tool_info_unit tool_info_last" v-show='unitStatusChange'>
							<span class="decrease" @click="numDecrease(index)">-</span>
							<span class="unit_num">{{items.number==null?'0':items.number}}</span>
							<span class="plus" @click="numPlus(index)">+</span>
						</p>
						<div class="sumNum" style="display:none">{{items.length}}</div>
		    			<div class="list_num">{{index+1}}</div>
					</div>
				</div>
	    	</div>
	    	<div class="btn_group">
	    		<div class="login_btn_confirm" @click="quotBilling">确定</div>
	    	</div>
	    </div>
	   <!--  <div class="foot_section">
	      Copyright © Rivamed
	    </div> -->
	    <transition name="fade">
		    <div class="mask_modal" v-show="maskShow">
		    	<div class="modal_cnt">
		    		<div class="modal_head">提示</div>
		    		<div class="modal_confirm_info">
		    			您的耗材使用记录将发送至HIS和供应商
		    		</div>
		    		<div class="btn_group">
		    			<div class="btn_confirm_small" @click="onSubmit">是</div>
		    			<div class="btn_cancel_small" @click="maskShow=!maskShow">否</div>
		    		</div>
		    	</div>
		    </div>
		</transition>
		<transition name="fade">
	      <div class="mask_modal confirmBox" v-show="infoWarning">
	        <div class="modal_cnt">
	          <div class="ask_cnt">请确认完成编辑信息!</div>
	          <div class="btn_group">
	            <div class="btn_confirm_small" @click="infoWarning=!infoWarning">确定</div>
	          </div>
	        </div>
	      </div>
	   </transition>
	</div>
</template>

<script>
import dataLoading from '../dataLoading.vue'
import { SerachOrder } from '../../config/api'
	export default {
		data () {
			return {
				infoWarning:false,
				flag:false,
				noData:true,
				operate:true,
				maskShow:false,
				unitStatus:true,
				unitStatusChange:false,
				showForm: [],
				appatatusName:'',
			    prames:{
			    	orderId:'',
			    	orthopaedicConsumablesDetails:[]
			    }
		    }
		},
		components:{dataLoading},
		created: function () {
		    this.prames.orderId=this.$route.params.id
		    window.parent.scrollTo(0, 0);
		    this.appatatusName=window.localStorage.getItem('appatatusNameShow')
		    this.packageDetail()
		},
		methods: {
			packageDetail () {
		        SerachOrder.packageDeatil({params: this.prames}).then(res => {
		        	this.noData=!this.noData
			        this.showForm = res
			    })
		  	},
        	unitFunc () {
        		this.flag=!this.flag
        		console.log(this.flag)
        		this.operate = !this.operate
        		this.unitStatus = !this.unitStatus
        		this.unitStatusChange = !this.unitStatusChange
      		},
      		numPlus (index) {
      			this.showForm[index].number++
      		},
      		numDecrease (index) {
      			this.showForm[index].number--
      			if(this.showForm[index].number<0){
      				this.showForm[index].number=0
      			}	
      		},
      		quotBilling (){
      			console.log(this.flag)
      			if(this.flag){
      				console.log(this.flag)
      				this.infoWarning=true
      			}
      			else{
      				this.infoWarning=false
      				this.maskShow=!this.maskShow
      			}
      		},
      		onSubmit () {
      			var _this=this
      			this.showForm.map((item) =>{
                    if(item.number!==0){
                        let obj = {'id':item.id,'number':item.number}
                        _this.prames.orthopaedicConsumablesDetails.push(obj)
                    }   
                });
      			SerachOrder.ortCharge({params: this.prames}).then(res => {
      				console.log(res)
      				this.maskShow=!this.maskShow
      				this.$router.push({path:'/historyOrder'})
      			})
      		}
		}
    }
</script>
<style lang='scss'>
.fade-enter-active, .fade-leave-active{
  transition: all 0.5s ease     
}
.fade-enter, .fade-leave-active{
  opacity: 0 
}
</style>