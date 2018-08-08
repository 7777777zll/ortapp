<template>
	<div class="orderConfirmPage">
		<div class="reback_nav">
	      <img src="../assets/return.png" class="icon_return" onclick="window.history.go(-1)">
	      <span>订单审核</span>
	    </div>
	    <div class="orderConfirmPage_cnt">
	    	<img src="../assets/status/Statuspage_ddsh.jpg">
	    	<p class="info_one">已成功审核订单!</p>
	    	<p class="info_two">3秒跳转首页!</p>
	    	<!-- <div class="login_btn_confirm">刷新</div> -->
	    </div>
	    <div class="foot_section">
	      Copyright © Rivamed
	    </div>
	</div>
</template>
<script>
	export default {};
</script>
<style lang="scss">
	.orderConfirmPage{
	    position: fixed;
		width:100%;
		height:100%;
		overflow: hidden;
		.reback_nav{
			height:95px;
			line-height:95px;
			font-size:30px;
			color:#000;
			padding-left:32px;
			font-family:'微软雅黑';
			border-bottom:solid 1px #c6cbd1;
			background:#fff;
			.icon_return{
				display:inline-block;
				margin-right:48px;
				height:44px;
				vertical-align: middle;
	    		margin-top: -12px;

			}
		}
		.orderConfirmPage_cnt{
			background:#fff;
			text-align:center;
			color:#656464;
			font-size:0.5rem;
		    position: absolute;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%,-60%);
		    img{
	    	    width: 100%;
		    }
			.info_two{
				margin-top:0.4rem;
			}
		}
		.foot_section {
		    text-align: center;
		    height: 1rem;
		    line-height: 1rem;
		    border-top: solid 1px #c6cbd1;
		    color: #b6c4c2;
		    font-size: 0.39rem;
		    position: fixed;
		    width: 100%;
		    bottom:0;
		}
	}
</style>