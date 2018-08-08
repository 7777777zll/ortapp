<template>
	<div class="loadingPage">
		<div class="cnt">
			<img src="../assets/loading.gif" class="img_loading">
			<p class="loading_info">加载中,请稍后...</p>
		</div>
	</div>
</template>
<script>
	export default {};
</script>
<style lang="scss">
	.loadingPage{
		background: #fff;
	    height: 100%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    color:#656464;
	    font-size:0.44rem;
	    overflow:hidden;
        position: fixed;
	    z-index: 9999;
        left: 0.3rem;
    	right: 0.3rem;
		.cnt{
			text-align:center;
			.img_loading{
				display:inline-block;
				width:2.4rem;
				margin-bottom:0.39rem;
			}
			.loading_info{
				margin-bottom:0.44rem;
			}
		}
	}
</style>