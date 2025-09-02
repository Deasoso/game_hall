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
          <image src="http://aiduihua.deaso40.com/xiaoyuan/Vector.png"  style="width: 32px;height: 32px;"/>
        </view>
        <image src="/static/logo.png" @click="gomine" style="width: 32px;height:32px" class="leftshow"/>
        <view class="posRelt">
          <view class="flex alcenter" @tap="isshowlang = !isshowlang">
            <text>{{ languages[lang] ? languages[lang].name : '中文' }}</text>
            <image :src="languages[lang] ? languages[lang].img : ''" class="wt15 h12 ml5" />
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
        <scroll-view scroll-y class='center-list-opened' v-if="leftopen">
          <view class="gundong">
            <image src="http://aiduihua.deaso40.com/xiaoyuan/Vector.png" @click="leftopen = !leftopen" style="width: 32px;height: 32px;margin-left:16px;margin-top:16px;"/>
          </view>
          <view v-for="(item,index) in navLeft" :key="index" class="gundong">
            <view :class="{'active':isActive === index}" @click="checked(index)">
              <image :src="item.img" style="width: 32px;height: 32px;margin-left:8px;margin-top:16px;"/>
            </view>
          </view>
        </scroll-view>
        <scroll-view scroll-y class='center-list' v-else>
          <view class="gundong">
            <image src="http://aiduihua.deaso40.com/xiaoyuan/Vector.png" @click="leftopen = !leftopen" style="width: 32px;height: 32px;margin-left:16px;margin-top:16px;"/>
          </view>
          <view v-for="(item,index) in navLeft" :key="index" class="gundong">
            <view :class="{'active':isActive === index}" @click="checked(index)">
              <image :src="item.img" style="width: 32px;height: 32px;margin-left:8px;margin-top:16px;"/>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class='center tabs'>
        <scroll-view scroll-y class='center-list-full' v-if="leftopen">
          <view class="gundong">
            <image src="http://aiduihua.deaso40.com/xiaoyuan/Vector.png" @click="leftopen = !leftopen" style="width: 32px;height: 32px;margin-left:16px;margin-top:16px;"/>
          </view>
          <view v-for="(item,index) in navLeft" :key="index" class="gundong">
            <view :class="{'active':isActive === index}" @click="checked(index)">
              <image :src="item.img" style="width: 32px;height: 32px;margin-left:8px;margin-top:16px;"/>
            </view>
          </view>
        </scroll-view>
      </view>
      <div :style="screenWidth > 768 ? leftopen ? 'margin-left: 160px' : 'margin-left: 64px' : leftopen ? 'display:none' : 'margin-left: 0px;'">首页内容</div>
      <!-- <view v-if="showgame">
        <iframe id="game" title="game launcher" class="gameview" frameborder="0" src="https://demogamesfree.eotofjxixi.net/gs2c/openGame.do?gameSymbol=vs15avsbath&amp;lang=zh&amp;cur=USD&amp;lobbyUrl=https://stake.com/casino/home&amp;cashierUrl=https://stake.com/casino/home?tab=deposit&amp;currency=btc&amp;modal=wallet&amp;stylename=rare_stake&amp;jurisdiction=99&amp;treq=gVhadvNW9Fx65Nz3Kt1v4pKJRKT3EbseiT7aFor7qPrujnGrlJbFU4zwqTiyJkt7&amp;isGameUrlApiCalled=true&amp;userId=demo" allow=""></iframe>
      </view>
      <view v-else>
        <view class="allgame" :style="screenWidth > 768 ? leftopen ? 'margin-left: 160px' : 'margin-left: 64px' : leftopen ? 'display:none' : 'margin-left: 0px;'">
          <view v-for="(item, index) in gameList" :key="index1">
            <image :src="'http://aiduihua.deaso40.com/xiaoyuan/Vector.png'" class="gamepic" @click="gogamein(item.ID)"/>
          </view>
        </view> 
      </view> -->
      <div class="tabs">
        <uni-tabbar class="uni-tabbar-bottom" >
          <div class="uni-tabbar" style="background-color: rgb(33, 37, 47); backdrop-filter: none;" :class="{ light2: true}">
            <div class="uni-tabbar-border" style="background-color: rgba(0, 0, 0, 0.33);"></div>
            <div class="uni-tabbar__item"  v-for="(item,index) in tabList" :key="item.id" @tap="switchTab(item.id)"><!---->
              <div class="uni-tabbar__bd" style="height: 50px;">
                <div class="uni-tabbar__icon" style="width: 24px; height: 24px;">
                  <img :src="(currentTabIndex!=item.id) ? '/h5/static/footer/'+item.icon+'0.png': '/h5/static/footer/'+item.icon+'1.png'" >
                </div>
                <div class="uni-tabbar__label" :style="currentTabIndex==item.id?'color: rgb(24, 129, 210); font-size: 10px; line-height: normal; margin-top: 3px;'
                :'color: rgb(162, 166, 165); font-size: 10px; line-height: normal; margin-top: 3px;'"> {{ item.text }} <!---->
                </div>
              </div>
            </div>
          </div>
        </uni-tabbar>
      </div>
    </view>
  </view>
</template>

<script>
export default {
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
      lang: 'zh',
      isActive: 0,
      navLeft: [
        {index:0,img:'http://aiduihua.deaso40.com/xiaoyuan/home1.png',title:"首页"},
        {index:1,img:'http://aiduihua.deaso40.com/xiaoyuan/shop1.png',title:"列表"},
        {index:1,img:'http://aiduihua.deaso40.com/xiaoyuan/Vector.png',title:"个人"},
      ],
      gameList: [],
      leftopen: false,
      screenWidth: null,

      tabList: [
          {
              id: 1,
              icon: 'index',
              text: this.$t('market.home'),

          },
        {
          id: 2,
          icon: 'mine',
          text: this.$t('assets.assets')
        },
      ],
      currentTabIndex: this.current,
      showgame: false
    };
  },
  computed: {
    
  },
  onLoad(option) {
    this.lang = uni.getStorageSync('lang') || 'zh';
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    }
    console.log(option.gameid);
    if(option.gameid){
      this.showgame = true;
    }
  },
  onShow() {
    this.getlist();
  },
  methods: {
    switchTab(index){
        this.currentTabIndex = index
        // this.$emit('click', index)
      if(index==1){
        this.leftopen = !this.leftopen;
      }else if(index==2){
        parent.location.href='/h5/#/pages/user/mine'
      }
    },
    gogamein(gameid){
      console.log('111')
      if(this.screenWidth > 768){
        uni.navigateTo({
          url: '/pages/index/gamein?gameid=' + gameid,
        })
      }else{
        uni.navigateTo({
          url: '/pages/index/gamemessage?gameid=' + gameid,
        })
      }
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
			    url: '/pages/user/mine'
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
      // this.isActive = index;
      if(index == 0){
        uni.navigateTo({
          url: '/pages/index/home'
        });
      }else if(index == 1){
        uni.navigateTo({
          url: '/pages/index/list'
        });
      }else if(index == 2){
        uni.navigateTo({
          url: '/pages/user/mine'
        });
      }
    },
    async getlist(){
      uni.request({
          url: 'http://62.60.232.70:8888/api/games', // 接口地址
          method: 'POST', // 请求方法
          data: {
            type_id: 1
          },
          header: {
              'Content-Type': 'application/json' // 如果需要以 JSON 格式发送数据
          },
          success: (res) => {
            if(res.data.code == 200){
              this.gameList = res.data.data.games;
            }else{
              uni.showModal({
                  title: '提示',
                  content: '发生了错误',
                  confirmText: '确定',
              });
            }
              console.log('POST 请求成功', res);
              // uni.navigateTo({
              //     url: '/'
              // })
              // localStorage.setItem('game_hall_userinfo', res.data.data.token);
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
  width: 32px;
  height: 32px;
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
  width: 64px;
  height:100%;
  background-color: #333;
  position: fixed;
}
.center-list-opened{
  width: 160px;
  height:100%;
  background-color: #333;
  position: fixed;
}
.center-list-full{
  width: 100%;
  height:100%;
  background-color: #333;
  position: fixed;
}
.gundong {
  width: 64px;
  height: 64px;
}
.gundong view {
  height: 64px;
  line-height: 64px;
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
.gameview{
  height: 100%; 
  width: 100%;
  min-height: 500px;
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
