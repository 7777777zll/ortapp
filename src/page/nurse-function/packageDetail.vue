<template>
	<div class="packageDetail">
		<div class="main_cnt">
			<div class="reback_nav" id="reback_nav">
				<img src="../../assets/return.png" class="icon_return" onclick="window.history.go(-1)">
				<span class="title">套餐详情</span>
				<span class="fr" v-show="titleShow"><span @click="editFunc">{{operate?'编辑':'完成'}}</span></span>
				<div class="cb"></div>
			</div>
			<div class="packageDetail_cnt" id="packageDetail_cnt">
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
					<!-- <div class="radius-bottom-right" v-show="!noData"></div>
					<div class="radius-top-left" v-show="!noData"></div> -->
				</div>
		   		<dataLoading v-show="noData"></dataLoading>
		   		<div class="detail_cell2" id="detail_cell2">
		    	<div class="tools_list" v-for="(items,index) in showForm">
		    		<div class="fl_cell">
		    			<p class="tool_label">物料名称</p>
		    			<p class="tool_info">{{items.consumablesName==null?'--':items.consumablesName}}</p>
	    				<div class="block_wrap">
		    				<div class="fl fl_cnt">
		    					<p class="tool_label">产品编码</p>
		    					<p class="tool_info">{{items.productCode==null?'--':items.productCode}}</p>
		    				</div>
		    				<div class="fl fl_right_cnt">
		    					<p class="tool_label">物料编码</p>
		    					<p class="tool_info">{{items.materialCode==null?'--':items.materialCode}}</p>
		    				</div>
		    				<div class="cb"></div>
	    				</div>
	    				<div class="block_wrap">
		    				<div class="fl fl_cnt">
		    					<p class="tool_label">灭菌批号</p>
				    			<p class="tool_info" v-show='unitStatus'>{{items.sterilizationNumber==null||items.sterilizationNumber==''?'--':items.sterilizationNumber}}</p>
				    			<input type="text" class="product_number" v-show="editCell" v-model='items.sterilizationNumber' id="mjph">
		    				</div>
		    				<div class="fl fl_right_cnt">
								<p class="tool_label">有效期</p>
				    			<p class="tool_info tool_info_last" v-show='unitStatus'>{{items.validityDate==null?'--':items.validityDate}}</p>
				    			<div @click="open('picker4',index)" v-show="editCell">
				    				<input type="text" class="product_number"  v-model='items.validityDate' disabled="true" placeholder="选择日期" >
				    			</div>
							    <mt-datetime-picker 
							      ref="picker4"
							      type="date"
							      v-model="value_real"
							      year-format="{value} 年"
							      month-format="{value} 月"
							      date-format="{value} 日"
							      :startDate="startDate"
      							  :endDate="endDate"
							      @confirm="handleChange('picker4',index)"
							      @cancel="cancleDate('picker4',index)"
							     >
							    </mt-datetime-picker>
				 <!--    			<div v-show="editCell">
				    				<date-picker field="myDate"
				    				placeholder="选择日期"
				    				v-model="items.validityDate"
				    				format="yyyy-mm-dd"
				    				:backward="false"
				    				:no-today="false"
				    				:forward="false"></date-picker>
				    			</div> -->
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
		    <div class="btn_group" id="btn_group" v-show="confirmBtn&&!noData">
		    	<div class="login_btn_confirm" @click="submitEdit">确定</div>
		    	<!-- <div class="login_btn_remark" @click="maskShow=!maskShow" id="toolsDetail_remark">备注</div> -->
		    </div>
		</div>
		   <!--  <div class="foot_section">
		      Copyright © Rivamed
		  </div> -->
		</div>
		<transition name="fade">
			<div class="mask_modal confirmBox" v-show="infoWarning">
				<div class="modal_cnt">
					<div class="ask_cnt" v-html="warningText"></div>
					<div class="btn_group">
						<div class="btn_confirm_small" v-show="!askSubmit" @click="infoWarning=!infoWarning">确定</div>
						<div class="btn_confirm_small" v-if="askSubmit" @click="submitConfirm">确定</div>
						<div class="btn_cancel_small" v-if="askSubmit" @click="infoWarning=!infoWarning">取消</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import dataLoading from '../dataLoading.vue'
import { SerachOrder,Group } from '../../config/api'
// import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'; //引入时间组件
export default {
	data() {
		return {
			noData:true,
			maskShow:false,
			confirmBtn:false,
			titleShow:false,
			operate:true,
			editCell:false,
			unitStatus:true,
			unitStatusChange:false,
			showForm: [],
			warningText:'',
			infoWarning:false,
			flag:false,
			checkFlag:[],
			appatatusName:'',
			askSubmit:false,
			value_real:null,
			startDate: new Date('2008-1-1'),
      		endDate: new Date('2100-12-31'),
			pramesDate:{
				orderId:'',
			},
			pramesComboId:{
				comboId:'',
			},
			prames:{
				id:'',
				status:'',
				orthopaedicConsumablesDetail:[]
			},
			resDate:{
				group:{}
			},
		}
	},
	components:{
		dataLoading,
		// 'date-picker': myDatepicker
	},
	created: function () {
		window.parent.scrollTo(0, 0);
		this.get_data();
		this.pramesDate.orderId=this.$route.params.id
		this.prames.id=this.$route.params.id
		this.pramesComboId.comboId=this.$route.params.id
		this.appatatusName=window.localStorage.getItem('appatatusNameShow')
		window.parent.scrollTo(0, 0);
	},
	methods: {
		get_data: function(params) {
			let param = Object.assign({}, this.iptVal);
			Group.getUserinformation(param)
			.then(response => {
				this.resDate = response;
				console.log(this.resDate.group)
				if(this.$route.params.titleFlag==0&&this.resDate.group== 'doctor'){
					this.packageDetailByDoc()
				}
				else if(this.resDate.group!= 'doctor'||this.$route.params.titleFlag==1&&this.resDate.group== 'doctor'){
					this.packageDetail()
				}
				if(this.$route.params.titleFlag==0&&this.resDate.group== 'supplier'){
					this.titleShow=true
					this.confirmBtn=true
					this.prames.status=5
					document.getElementsByTagName("body").className = "body_noscroll";
					document.getElementById('reback_nav').className="reback_nav_unfix"
					document.getElementById('packageDetail_cnt').className="packageDetail_cnt_two"
					document.getElementById('btn_group').className="btn_group_max"
					document.getElementById('detail_cell2').className="detail_cell2_max"
				}
				else if(this.$route.params.titleFlag==0&&this.resDate.group== 'doctor'){
					this.confirmBtn=true
					document.getElementById('reback_nav').className="reback_nav_unfix"
					document.getElementById('packageDetail_cnt').className="packageDetail_cnt_two"
					document.getElementById('btn_group').className="btn_group_max"
					document.getElementById('detail_cell2').style.height="62%";
					// document.getElementById('detail_cell2').style.overflow="auto";  
				}
				else if(this.$route.params.titleFlag==1&&this.resDate.group== 'doctor'){
					document.getElementById('detail_cell2').style.height="74%";
				}
				else{
					this.titleShow=false
				}
				console.info('success')
			}, response => {
				console.info('fail')
			});
	        //
	    },
	    packageDetail () {
	    	SerachOrder.packageDeatil({params: this.pramesDate}).then(res => {
	    		this.noData=!this.noData
	    		this.showForm = res
	    	})
	    },
	    packageDetailByDoc (){
	    	SerachOrder.findOrtConsumablesByComboId({params: this.pramesComboId}).then(res => {
	    		this.noData=!this.noData
	    		this.showForm = res
	    	})
	    },
	    editFunc (){
	    	document.getElementById('detail_cell2').scrollTop = 0;
	    	this.flag=!this.flag
	    	this.editCell=!this.editCell
	    	this.unitStatus=!this.unitStatus
	    	this.operate = !this.operate
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
	    submitEdit (){
	    	if(this.resDate.group== 'doctor'){
	    		this.$router.push({path:'/buildorder'});
	    	}
	    	else if(this.resDate.group!= 'doctor'){
	    		this.confirmEdit()
	    	}	
	    },
	    confirmEdit (){
  			// 编辑状态
  			if(this.flag){
  				this.checkFlag.length=0
  				var _this=this
  				this.infoWarning=true
  				// 检验每一项必填项,不符合弹出提示,并记录每项状态用数组保存
  				this.showForm.forEach((item) =>{
  					if(item.validityDate==''||item.validityDate==null||item.sterilizationNumber==''||item.sterilizationNumber==null){
  						this.askSubmit=false
  						_this.warningText='请确认完成编辑信息后提交!<p style="color:red;font-size: 0.35rem;">警告: 有未填写的物料有效期以及灭菌批号!</p>'
  						let s=0
  						_this.checkFlag.push(s)
  						return false
  					}
  					else{
  						let t=1
  						_this.checkFlag.push(t)
  						
  					}
  				});
                //判断检验结果是否都通过,直到全部通过
                var templeteFlag=true
                if(_this.checkFlag.length>0){
                	for(var i=0;i<_this.checkFlag.length;i++){
                		if(_this.checkFlag[i]!=1){
                			templeteFlag=false
                			return false
                		}
                	}
                }
                if(templeteFlag){
                	_this.warningText='请确认完成编辑信息 !' 
                }
            }
  			// 完成状态
  			else{
  				this.checkFlag.length=0
  				var _this=this
  				//完成状态下的校验
  				_this.prames.orthopaedicConsumablesDetail.length=0
  				this.showForm.forEach((item) =>{
  					if(item.validityDate==''||item.validityDate==null||item.sterilizationNumber==''||item.sterilizationNumber==null){
  						this.askSubmit=true
  						_this.infoWarning=true
  						_this.warningText='您确定要立刻提交么?<p style="color:red;font-size: 0.35rem;">警告: 有未填写的物料有效期以及灭菌批号!</p>'	
  						let s=0
  						_this.checkFlag.push(s) 
  					}
  					else{
  						let t=1
                    	_this.checkFlag.push(t)
  					}  
				    let obj = {'id':item.id,'number':item.number,'validityDate':item.validityDate,'sterilizationNumber':item.sterilizationNumber}
				    console.log(obj)
                	_this.prames.orthopaedicConsumablesDetail.push(obj) 
                });
                var templeteFlag=true
  				if(_this.checkFlag.length>0){
  					for(var i=0;i<_this.checkFlag.length;i++){
  						if(_this.checkFlag[i]!=1){
  							templeteFlag=false
  							return false
  						}
  					}
  				}
  				if(templeteFlag){
  					this.infoWarning=false
  					SerachOrder.put({params: this.prames}).then(res => {
  						this.$router.push({path:'/vieworder'})
  					})
  				}
  			}
  		},
	    submitConfirm (){
	    	console.log('完成')
	    	this.infoWarning=false
	    	SerachOrder.put({params: this.prames}).then(res => {
				this.$router.push({path:'/vieworder'})
			})
			this.askSubmit=false
	    },
	    open(picker,index) {
	        this.$refs[picker][index].open();
	        document.getElementById('btn_group').style.display="none"
	        document.getElementById('detail_cell2').style.bottom="0"
	        // document.getElementById('detail_cell2').style.zIndex=999
        },
	   // 格式化获取的时间
		formatDate(date) {
		    const y = date.getFullYear()
		    let m = date.getMonth() + 1
		    m = m < 10 ? '0' + m : m
		    let d = date.getDate()
		    d = d < 10 ? ('0' + d) : d
		    return y + '-' + m + '-' + d
		},
		//点击确定按钮之后
		handleChange(picker,index) {
		    // 输出格式化后的时间
		    // document.getElementById('detail_cell2').style.zIndex=0
		    document.getElementById('btn_group').style.display="block"
		     document.getElementById('detail_cell2').style.bottom="1.94rem"
		    this.showForm[index].validityDate=this.formatDate(this.$refs[picker][index].value)
		    this.value_real=this.formatDate(this.$refs[picker][index].value)    
		},
		//点击取消按钮之后
		cancleDate(picker,index){
			// document.getElementById('detail_cell2').style.zIndex=0
			//this.showForm[index].validityDate=this.value_real
			document.getElementById('btn_group').style.display="block"
			 document.getElementById('detail_cell2').style.bottom="1.94rem"
			this.showForm[index].validityDate=this.formatDate(this.$refs[picker][index].value)
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