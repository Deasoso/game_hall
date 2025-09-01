<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*每个页面公共css */
@import url('./common/uni.css');
@import url('./common/common.css');
@import url('./common/common_light.css');
page {
    /* background: #061623 ; */
  padding-top: env(safe-area-inset-top);
}
.status_bar {
    height: var(--status-bar-height);
    width: 100%;
    background-color: #21252f;
}
.top_view {
    height: var(--status-bar-height);
    width: 100%;
    position: fixed;
    background-color: #21252f;
    top: 0;
    z-index: 999;
}

view {
    box-sizing: border-box !important;
}
uni-view {
    box-sizing: border-box;
    font-size: 14px;
    line-height: 2;
}
.uni-padding-wrap {
    width: 100%;
}
.uni-toast {
    z-index: 10000 !important;
}
.uni-modal__btn {
    color: red !important;
}
uni-page-body{
	color:var(--UI-BG-1)
}
  .h20 {
    height: 20px !important;
}
 
  .wt20 {
    width: 20px  !important;
}
.ht100 {
    height: 100% !important;
}
</style>
