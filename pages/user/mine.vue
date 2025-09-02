<template>
  <view class="greybackground">
    <view class="backgroundpic">
      <view class="rect0">
        <!-- 确保上面的显示 -->
      </view>
      <div class="modalContent">
        <button class="choose-avatar-button">
          <image class="choose-avatar" :src="avatarUrl"></image>
        </button> 
      </div>
      <view
        v-if="!logined"
        class="mt10 bgGreen radius4 ptb10 white ft14 tc mb10"
        @tap="gologin"
      >{{'登录'}}</view>
      <p class="contentTip">个人页面建设中</p>
      <p class="contentTip">个人页面建设中</p>
      <view class="rect1">
        <!-- 确保下面的显示以及调整高度 -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: 'http://aiduihua.deaso40.com/xiaoyuan/Vector.png',
      logined: false
    }
  },
  onLoad(option) {
    if(uni.getStorageSync('game_hall_userinfo')){
      console.log(uni.getStorageSync('game_hall_userinfo'));
      console.log('11');
      uni.request({
        url: 'http://62.60.232.70:8888/api/getUserInfo', // 接口地址
        method: 'POST', // 请求方法
        data: { },
        header: {
            'Content-Type': 'application/json', // 如果需要以 JSON 格式发送数据
            'Authorization': "Bearer " + uni.getStorageSync('game_hall_userinfo')
        },
        success: (res) => {
            console.log('POST 请求成功', res);
            if(res.data.code == 200){
                console.log(res);
            }
        },
        fail: (err) => {
            console.log('POST 请求失败', err);
        }
    });
    }
  },
  methods: {
    gologin(){
      uni.navigateTo({
			    url: '/pages/index/login'
			})
    }
  }
}
</script>

<style scoped>
.greybackground {
  background-color: #ffffff;
  background-size: 100% 100%;
  min-height: 100vh;
}
.backgroundpic {
  /* background-image: url('http://aiduihua.deaso40.com/xiaoyuan/background.png'); */
  background-attachment: fixed;
  background-size: 100% auto;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.rect0 {
  padding-top: 1px;
  margin-top: -1px;
}
.contentTip{
  height: 30px;
  text-align: center;
  font-size: 16px;
  color: #cccccc;
  margin-top: 10px;
}
.tipIcon{
  position: absolute;
  margin-top: -50px;
  margin-left: calc(50% + 70px);
}
.choose-avatar-button{
  width: 96px;
  height: 96px;
  margin-bottom: 4px;
  border-radius: 50%;
}
.choose-avatar{
  margin-left: calc(50% - 48px);
  width: 96px;
  height: 96px;
}
.modalContent{
  margin-top: 64px;
  margin-left: calc(50% - 48px);
}
.submit {
  margin: 15px 20px;
}
.cellborder{
  background: #fff;
  margin: 10px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #ffffff;
}
.u-cell-text{
  padding-left: 4px;
}
</style>
