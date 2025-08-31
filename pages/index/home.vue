<template>
  <view>
    <view :class="{ light: true }" class="content">
      <view class="status_bar">
        <view class="top_view"></view>
      </view>

      <!-- 		<view class="service" :style="servicePos" @touchmove.prevent="serviceMove" @click="goService">
            <image src="../../static/service.png"></image>
          </view> -->
      <view class="ptb10 w100 tc flex alcenter between absolute bgPart head pr10">
        <view class="avatarpic" @click="gologin">
          <image src="http://aiduihua.deaso40.com/xiaoyuan/Vector.png"  style="width: 16px;height: 16px;"/>
        </view>
        <image src="/static/logo.png" @click="gomine" style="width: 56upx;height:56upx" class="leftshow"/>
        <view class="posRelt">
          <view class="flex alcenter" @tap="isshowlang = !isshowlang">
            <text>{{ languages[lang].name }}</text>
            <image :src="languages[lang].img" class="wt15 h12 ml5" />
          </view>
          <view
              class="abstrot bggray plr8 wt100 radius4"
              style="right: 0;top:60upx"
              v-show="isshowlang"
          >
            <view
                class="flex alcenter ptb10 between bdb1f langs"
                v-for="(item, i) in languages"
                :key="i"
                @tap="changeLang(i)"
            >
              <text>{{ item.name }}</text>
              <image :src="item.img" class="wt15 h12 ml5" />
            </view>
          </view>
        </view>
      </view>
      <view class='center leftshow'>
        <view class='center-list'>
          <view class="pics">
            <scroll-view class="gundong" scroll-y v-for="(item,index) in navLeft" :key="index">
              <view :class="{'active':isActive === index}" @click="checked(index)">
                {{item.tit}}
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
      <view class="allgame">
        <view v-for="(item, index) in gameList" :key="index1">
          <image :src="'http://aiduihua.deaso40.com/xiaoyuan/Vector.png'" class="gamepic" @click="gogamein"/>
        </view>
      </view>
      <unitabs class="tabs" currentIndex="3"></unitabs>
    </view>
  </view>
</template>

<script>
import unitabs from '../../components/uni-tabs.vue';

export default {
  components: {
    unitabs,
  },
  data() {
    return {
      isshowlang: false,
      languages: {
        en: { name: 'English', img: '/static/image/en.png' },
        zh: { name: '中文简体', img: '/static/image/zh.png' },
        // hk: { name: '繁體中文', img: '/static/image/hk.png' },
        // jp: { name: '日本語', img: '/static/image/jp.png' },
        // kr: { name: '한국어', img: '/static/image/kr.png' },
        // du: { name: 'Deutsch', img: '/static/image/du.png' },
        // yinni: { name: 'Indonesia', img: '/static/image/yinni.png' },
        // th: { name: 'ภาษาไทย', img: '/static/image/th.png' },
        // vi: { name: 'Việt Nam', img: '/static/image/vi.png' },
      },
      lang: '',
      isActive: 0,
      navLeft: [
        {index:0,tit:"种类1"},
        {index:1,tit:"种类2"},
        {index:2,tit:"种类3"},
        {index:3,tit:"种类4"},
        {index:4,tit:"种类5"},
        {index:5,tit:"种类6"},
        {index:6,tit:"种类7"},
        {index:7,tit:"种类8"},
        {index:8,tit:"种类9"},
        {index:9,tit:"种类10"},
        {index:10,tit:"种类11"},
        {index:11,tit:"种类12"},
        {index:12,tit:"种类13"}
      ],
      gameList: []
    };
  },
  computed: {
    
  },
  onLoad() {
    this.lang = uni.getStorageSync('lang') || 'zh';
  },
  onShow() {
    this.getlist();
  },
  methods: {
    gogamein(){
      console.log('111')
      uni.navigateTo({
			    url: '/pages/index/gamein'
			})
    },
    gologin() {
      console.log('111')
      uni.navigateTo({
			    url: '/pages/index/login'
			})
    },
    gomine() {
      console.log('111')
      uni.navigateTo({
			    url: '/pages/index/mine'
			})
    },
    changeLang(lang) {
      console.log('changelang');
      this.lang = lang;
      uni.setStorageSync('lang', lang);
      this.$i18n.locale = lang;
      this.isshowlang = false;
      uni.reLaunch({
        url: '/pages/index/home'
      });
    },
    checked(index) {
      this.isActive = index
    },
    async getlist(){
      uni.request({
          url: 'http://62.60.232.70:8888/api/games', // 接口地址
          method: 'POST', // 请求方法
          data: {},
          header: {
              'Content-Type': 'application/json' // 如果需要以 JSON 格式发送数据
              
          },
          success: (res) => {
            this.gameList = res.data.data.games;
              console.log('POST 请求成功', res);
              // uni.navigateTo({
              //     url: '/'
              // })
              // localStorage.setItem('hame_hall_userinfo', res.data.data.token);
          },
          fail: (err) => {
              console.log('POST 请求失败', err);
          }
      });
    }
  },
  onHide() {
    
  },
  onPullDownRefresh() {

  },
};
</script>

<style lang="scss">
.head {
  top: var(--status-bar-height);
  left: 0;
  z-index: 999;
}
.avatarpic{
  margin-top: 2px;
  margin-left: 12px;
  width: 16px;
  height: 16px;
}
page {
  height:100%;
}
.center{
  width:100%;
  height:100%;
  position:relative;
}
.center-list{
  width: 100px;
  height: 100%;
  position: fixed;
  overflow: auto;
}
.pics {
  width:100%;
  height:auto;
}
.gundong {
  width: 100px;
  height: 100px;
}
.gundong view {
  height: 100px;
  line-height: 100px;
  text-align: center;
/*  background-color: #f1f1f1; */
  font-size:28px;
  color:#666;
}
.active {
  color:#333;
  font-weight:700;
  border-left:8px solid #ff5934;
}
.gamepic {
  width: 48px;
  height: 48px;
  margin: 12px; 
}
.allgame{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 100px;
}
.leftshow{
  display: block;
}
.tabs{
  display: none;
}
@media (max-width: 768px){
  .allgame {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-left: 0;
  }
  .leftshow {
    display: none;
  }
  .tabs {
    display: block;
  }
}
</style>
