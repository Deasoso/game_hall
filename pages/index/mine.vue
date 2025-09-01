<template>
  <view class="greybackground">
    <view class="backgroundpic">
      <view class="rect0">
        <!-- 确保上面的显示 -->
      </view>
      <div class="modalContent">
        <button class="choose-avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <image class="choose-avatar" :src="avatarUrl"></image>
        </button> 
      </div>
      <p class="contentTip">个人页面建设中</p>
      <view class="cellborder">
        <u-cell 
          size="large"
          :border="false"
          isLink @click="changename()"
        >
          <view slot="title" class="u-slot-title">
            <text 
              class="u-cell-text"
            >昵称</text>
          </view>
          <text
            slot="value"
            class="u-slot-value"
          >{{ nickName }}</text>
        </u-cell>
        <u-cell 
          size="large"
          :border="false"
          isLink @click="changeintroduce()"
        >
          <view slot="title" class="u-slot-title">
            <text 
              class="u-cell-text"
            >个人简介</text>
          </view>
          <text
            slot="value"
            class="u-slot-value"
          >{{ introduce }}</text>
        </u-cell>
        <u-cell 
          size="large"
          :border="false"
          isLink @click="showgender = true"
        >
          <view slot="title" class="u-slot-title">
            <text 
              class="u-cell-text"
            >性别</text>
          </view>
          <text
            slot="value"
            class="u-slot-value"
          >{{ gender }}</text>
        </u-cell>
        <u-cell 
          size="large"
          :border="false"
          isLink @click="showday = true"
        >
          <view slot="title" class="u-slot-title">
            <text 
              class="u-cell-text"
            >生日</text>
          </view>
          <text
            slot="value"
            class="u-slot-value"
          >{{ birthtext }}</text>
        </u-cell>
      </view>
      <view class="submit">
        <u-button size="small" type="success" text="更新个人资料" @click="updateMyself()"></u-button>
      </view>
      <view class="submit">
        <u-button size="small" type="error" text="退出登录" @click="logout()"></u-button>
      </view>
      <u-picker :show="showgender" :columns="genders" @confirm="changegender"></u-picker>
      <u-datetime-picker
        :show="showday"
        v-model="birthday"
        @confirm="changebirthday"
        mode="date"
        :minDate="0"
        :maxDate="new Date().getTime()"
      ></u-datetime-picker>
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
      nextAvatar: 'http://aiduihua.deaso40.com/xiaoyuan/Vector.png',
      nickName: '微信用户',
      introduce: '',
      gender: '',
      birthday: '',
      birthtext: '',
      showgender: false,
      showday: false,
      genders: [['未设置', '男', '女', '保密']],
      topage: ''
    }
  },
  onLoad(option) {
    const _this = this;
    _this.topage = option.topage;
    _this.getMyself();
  },
  methods: {
    uploadAvatar(){
      const _this = this;
      if(!_this.nickName){
        wx.showModal({
          title: '提示',
          content: '请输入名称',
          showCancel: false
        })
        return;
      }
      wx.uploadFile({ 
        header: { "token": wx.getStorageSync('qingguixiaoyuan_login_token') },
        url: _this.globalData.backendurl + '/api/uploadimage',
        filePath: _this.nextAvatar,
        name: "file",
        success: function (res) { 
          // 居然不给自动解析吗
          res.data = JSON.parse(res.data);
          console.log("获取成功，回调：");
          console.log(res);
          if (res.statusCode == 200 && res.data != null) {
            _this.avatarUrl = res.data.url;
            wx.hideLoading();
          }else{
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            wx.hideLoading();
          }
        },
        fail: function (res) { 
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          wx.hideLoading();
        }
      })
    },
    updateMyself(){
      const _this = this;
      if(!_this.nickName){
        wx.showModal({
          title: '提示',
          content: '请填写昵称！',
          showCancel: false
        })
        return;
      }
      if(!_this.avatarUrl){
        wx.showModal({
          title: '提示',
          content: '请上传头像！',
          showCancel: false
        })
        return;
      }
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        header: { "token": wx.getStorageSync('qingguixiaoyuan_login_token') },
        url: _this.globalData.backendurl + '/api/setmyself',
        data: {
          name: _this.nickName,
          avatar: _this.avatarUrl,
          introduce: _this.introduce,
          gender: _this.gender,
          birthday: _this.birthtext
        },
        method: 'POST',
        success: function(fuwures) {
          console.log("联通成功，回调：");
          console.log(fuwures);
          if(fuwures.statusCode == 200 && fuwures.data != null){
            wx.showModal({
              title: '提示',
              content: '设置个人资料成功',
              showCancel: false,
              success: function (res) {
                wx.hideLoading();
                wx.reLaunch({
                  url: _this.topage
                });
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '设置失败',
              showCancel: false
            })
            wx.hideLoading();
          }
        }
      })
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.mp.detail 
      this.nextAvatar = avatarUrl;
      this.uploadAvatar();
    },
    getMyself() {
      const _this = this;
      wx.request({
        url: _this.globalData.backendurl + '/api/getmyself',
        header: { "token": wx.getStorageSync('qingguixiaoyuan_login_token') },
        method: 'POST',
        data: { },
        success: function (res) {
          console.log(res);
          _this.nickName = res.data.getuser.name;
          _this.avatarUrl = res.data.getuser.avatar;
          _this.introduce = res.data.getuser.introduce;
          _this.gender = res.data.getuser.gender;
          _this.birthday = new Date(res.data.getuser.birthday);
          _this.birthtext = res.data.getuser.birthday;
        },
        fail: function (e) {
          wx.showModal({ title: '提示', content: '获取个人信息失败', showCancel: false });
        },
      })
    },
    async logout(){
      const _this = this;
      const yes = await new Promise((resolve, reject) => {
        wx.showModal({
          title: '确认',
          content: '确定要登出吗？',
          success(scoreres) {
            if (scoreres.confirm) {
              console.log('用户点击确定');
              resolve(true);
            } else if (scoreres.cancel) {
              console.log('用户点击取消')
              resolve(false)
            }
          }
        })
      })
      if (!yes) return;
      wx.removeStorage({
        key: 'qingguixiaoyuan_login_token',
        success(res) {
          wx.reLaunch({
            url: '/pages/home/home'
          });
        }
      })
    },
    changename(){
      const _this = this;
      wx.showModal({
        title: '输入昵称',
        content: _this.nickName,
        editable: true,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            _this.nickName = res.content;
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    },
    changeintroduce(){
      const _this = this;
      wx.showModal({
        title: '输入个人简介',
        content: _this.introduce,
        editable: true,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            _this.introduce = res.content;
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    changegender(e){
      const _this = this;
      console.log(e);
      _this.gender = e.value[0];
      _this.showgender = false;
    },
    changebirthday(e){
      const _this = this;
      console.log(e);
      _this.birthday = e.value;
      const getdate = new Date(parseInt(e.value));
      const monthtwotext = (getdate.getMonth()) + 1 < 10 ? "0" + (getdate.getMonth() + 1) : (getdate.getMonth() + 1);
      const datetwotext = getdate.getDate() < 10 ? "0" + getdate.getDate() : getdate.getDate();
      _this.birthtext = getdate.getFullYear() + "-" + monthtwotext + "-" + datetwotext;
      _this.showday = false;
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
  background-color: #000000;
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
  margin-bottom: 40px;
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
