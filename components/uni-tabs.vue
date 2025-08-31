<template>
<uni-tabbar class="uni-tabbar-bottom" >
<div class="uni-tabbar" style="background-color: rgb(33, 37, 47); backdrop-filter: none;" :class="{ light2: true}">
  <div class="uni-tabbar-border" style="background-color: rgba(0, 0, 0, 0.33);"></div>
  <div class="uni-tabbar__item"  v-for="(item,index) in tabList" :key="item.id" @tap="switchTab(item.id)"><!---->
    <div class="uni-tabbar__bd" style="height: 50px;">
      <div class="uni-tabbar__icon" style="width: 24px; height: 24px;">
        <img :src="(currentIndex!=item.id) ? '/h5/static/footer/'+item.icon+'0.png': '/h5/static/footer/'+item.icon+'1.png'" >
      </div>
      <div class="uni-tabbar__label" :style="currentIndex==item.id?'color: rgb(24, 129, 210); font-size: 10px; line-height: normal; margin-top: 3px;'
      :'color: rgb(162, 166, 165); font-size: 10px; line-height: normal; margin-top: 3px;'"> {{ item.text }} <!---->
      </div>
    </div>
  </div>
</div>
<!--<div class="uni-placeholder" style="height: 50px;">-->
<!--</div>-->
</uni-tabbar>
</template>
<script>
import { mapState } from 'vuex';
    export default {
      props: {
        currentIndex: {
          type: String,
          default: ''
        },
        type: {
          type: String,
          //top - 顶部， middle - 居中, bottom - 底部
          default: 'middle'
        },
        msg: {
          type: String,
          default: ''
        },
        btnShow: {
          type: Boolean,
          default: true
        },
        bgColor: {
          type: Boolean,
          default: true
        },
        lang: {
          type: String,
          default: 'en'
        }
      },
        data() {
            return {
                tabList: [
                    {
                        id: 1,
                        icon: 'index',
                        text: this.$t('market.home'),

                    },
                  {
                    id: 5,
                    icon: 'mine',
                    text: this.$t('assets.assets')
                  },
                ],
                currentTabIndex: this.current
            }
        },
      mounted() {
        // console.log(this.currentIndex)
      },
      onShow() {
        var that = this;
      },
      computed: {

      },
        methods: {
            switchTab(index){
                this.currentTabIndex = index
                // this.$emit('click', index)
              if(index==1){
                parent.location.href='/h5/#/pages/home/home'
              }else if(index==2){
                parent.location.href='/h5/#/pages/market/market'
              }else if(index==3){
                parent.location.href='/h5/#/pages/market/secondf'
              }else if(index==4){
                parent.location.href='/h5/#/pages/lever/lever'
              }else if(index==5){
                parent.location.href='/h5/#/pages/index/mine'
              }
            }
        },
    }
</script>
<style>
</style>