<template>
	<div class="toolsDetail">
		<div class="reback_nav">
		    <img src="../../assets/return.png" class="icon_return" onclick="window.history.go(-1)">
	        <span class="title">器械详情</span>
	    </div>
	    <div class="toolsDetail_cnt">
	    	<dataLoading v-show="noData"></dataLoading>
	    	<div class="detail_title cb">
	    		<span class="fl">手术器械</span>
	    		<span class="fr">{{appatatus}}</span>
	    	</div>
	    	<div class="detail_cell1">
	    		<div class="fl fl_cell">
	    			<p class="num">{{listSum}}</p>
	    			<p class="desc_num">手术器械总数</p>
	    		</div>
	    		<div class="fr fr_cell">
	    			<p  v-for="(item,index) in showForm">
	    				<span class="color_block"></span>
	    				<span class="tools_name">{{item.groupName}}</span>
	    				<span class="tool_num">{{classArr[index]}}</span>
	    			</p>
	    		</div>
	    		<div class="cb"></div>
	    		<div class="radius-bottom-right1"></div>
	    		<div class="radius-top-left1"></div>
	    		<div class="radius-bottom-right2"></div>
	    		<div class="radius-top-left2"></div>
	    	</div>
	    	<div class="detail_cell2" id="detail_cell2">
	    		<div v-for="(items,indexs) in showForm" class="list_wrap">
					<div class="tools_list" v-for="(item,index) in items.orthopaedicApparatusDetails">
						<div class="fl_cell">
							<p class="tool_label">器械名称</p>
							<p class="tool_info">
								{{item.apparatusDetailName==null?'--':item.apparatusDetailName}}
							</p>	
						</div>
						<div class="fr_cell">
							<div class="fl">
								<p class="tool_label">器械编码</p>
								<p class="tool_info tool_info_last">{{item.materialCode==null?'--':item.materialCode}}</p>
							</div>
							<div class="fr">
								<p class="tool_label">数量</p>
								<p class="tool_info">{{item.number==null?'--':item.number}}</p>
							</div>
							<div class="cb"></div>
						</div>
						<div class="list_num">{{1+index+showFormLength[indexs]}}</div>
					</div>
				</div>
	    	</div>
	    	<div class="btn_group" id="btn_group" v-show="confirmBtn">
		    		<div class="login_btn_confirm" @click="submitEdit">确定</div>
		    		<!-- <div class="login_btn_remark" @click="maskShow=!maskShow" id="toolsDetail_remark">备注</div> -->
		    </div>
	    </div>
	   <!--  <div class="foot_section">
	      Copyright © Rivamed
	    </div> -->
	    <transition name="fade">
		    <div class="mask_modal" v-show="maskShow">
		    	<div class="modal_cnt">
		    		<div class="modal_head">备注</div>
		    		<textarea class="modal_info" placeholder='请输入备注信息'></textarea>
		    		<div class="btn_group">
		    			<div class="btn_confirm_small">确定</div>
		    			<div class="btn_cancel_small" @click="maskShow=!maskShow">取消</div>
		    		</div>
		    	</div>
		    </div>
		</transition>
	</div>
</template>

<script>
import dataLoading from '../dataLoading.vue'
import { SerachOrder,Group,Doctor } from '../../config/api'
export default {
	data() {
	  return {
	  	appatatus:'',
	  	noData:true,
	  	// hasData:false,
	  	listSum:0,
	  	classSum:0,
	    showForm: [],
	    maskShow:false,
	    confirmBtn:false,
	    titleFlag:'',
	    pramesDate:{
	    	orderId:'',
	    },
	    pramesComboId:{
	    	comboId:'',
	    },
	    resDate:{
          group:{}
        },
	    classArr:[],
	    showFormLength:[0],
	  }
	},
	components:{dataLoading},
	created: function () {
	  window.parent.scrollTo(0, 0);
	  this.get_data();
	  this.pramesDate.orderId=this.$route.params.id
	  this.pramesComboId.comboId=this.$route.params.id
	  this.titleFlag=this.$route.params.titleFlag
	  let storage = window.localStorage;
      this.appatatus=storage.getItem('appatatusShow')
	},
	methods: {
		get_data: function(params) {
	        let param = Object.assign({}, this.iptVal);
	        Group.getUserinformation(param)
	          .then(response => {
	            this.resDate = response;
	            console.log(this.titleFlag)
			    if(this.titleFlag==0&&this.resDate.group== 'doctor'){
			    	this.confirmBtn=true
			    	document.getElementById('btn_group').className="btn_group_max"
			    	document.getElementById('detail_cell2').className="detail_cell2_max"
			    	this.packageDetailByDoc()
			    }
			    else{
			    	this.packageDetail()
			    	this.confirmBtn=false
			    }
	            console.info('success')
	          }, response => {
	            console.info('fail')
	          });
	        //
	    },
	    packageDetail () {
	      SerachOrder.getOrthopaedicApparatus({params: this.pramesDate}).then(res => {
	      	this.noData=!this.noData
	      	// this.hasData=!this.hasData
	        this.showForm = res
	        var _this=this
	        var objLength=0
	        this.showForm.map((item) =>{
                let obj = item.orthopaedicApparatusDetails
                let classNum=0
                obj.map((item,index) =>{
                	_this.listSum+=item.number
                	classNum+=item.number
                })
                objLength+=obj.length
                _this.classArr.push(classNum)
                _this.showFormLength.push(objLength)
                console.log(_this.showFormLength)
            	});
	    	})
	  	},
	    submitEdit (){	
	        this.$router.push({path:'/buildorder'});
  		},
	 	packageDetailByDoc () {
	      Doctor.getOrthopaedicApparatusByComboId({params: this.pramesComboId}).then(res => {
	      	this.noData=!this.noData
	      	// this.hasData=!this.hasData
	        this.showForm = res.orthopaedicApparatusGroups
	        var _this=this
	        var objLength=0
	        this.showForm.map((item) =>{
                let obj = item.orthopaedicApparatusDetails
                let classNum=0
                obj.map((item,index) =>{
                	_this.listSum+=item.number
                	classNum+=item.number
                })
                objLength+=obj.length
                _this.classArr.push(classNum)
                _this.showFormLength.push(objLength)
                console.log(_this.showFormLength)
            });
	    })
	  },
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