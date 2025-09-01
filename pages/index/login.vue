<template>
    <view class="pt5" :class="{'light': true}">
		<view class="css-1r06xjm">
		  <view class="css-1cl6obj"  v-if="loginActive==1"  >
		  </view>
		  <view class="css-1cl6obj"  v-else  >
			<view class="css-1r5r8g9" @click="changeloginActive(2)">
				<p class="MuiTypography-root MuiTypography-body1 css-1pkgmdb" >{{$t('login').e_mb}}</p>
				<view class="MuiBox-root css-19v4s8e"></view>
			  </view>
		  </view>	
			
			<view class="css-1cl6obj"   v-if="loginActive==2" >
				<view class="css-1r5r8g9" @click="changeloginActive(1)">
					<p class="MuiTypography-root MuiTypography-body1 css-1wi3iqv">{{$t('login').e_email}}</p>
					<view class="MuiBox-root css-10ba4zv"> </view>
				</view>
			</view>
		</view>
        <view class="plr10">
           <view class="flex alcenter">
				<view
				    class="plr15 bold ptb10 ft24 "
				    :class="{'':loginActive==1}"
				    @tap="loginActive=1;"
				>
				    {{$t('login').login}}
				</view>
               <view class="plr15 bold mr20 ptb10 ft24 ">
                    <navigator url="register">{{$t('login').register}}</navigator>
                </view>
            </view>
			<view class="flex alcenter"> </view>

            <view class=" plr10 ptb10 radius4 ">
                <view class="mb10">
                   <view class="flex">
						<uni-easyinput type="text"  prefixIcon="email"  v-model="user_string"   v-if="loginActive==1"  :placeholder="$t('login').p_email" ></uni-easyinput>
						<uni-easyinput type="text" prefixIcon="bottom" :prefixText=prefixText v-model="user_string" @iconClick="openphoneshows"   v-else  :placeholder="$t('login').p_mobile" ></uni-easyinput>
                    </view>
                </view>
                <view class="mb10">
					<view class="css-1qkwt4q">{{$t('login').s_loginpwd}}</view>
                    <view class="flex">
						<uni-easyinput type="password" v-model="password"  :placeholder="$t('login').p_pwd" ></uni-easyinput>
                    </view>
                </view>
                <view class="flex bgwhite alcenter bdb_myblue mb10" v-if="isShowCode">
                    <input
                        type="text"
                        v-model="code"
                        class="h40 lh40 flex1"
                        :placeholder="$t('login').p_vcode"
                    />
                   <view class="ml10 plr10 white bgBlue ptb5 radius4" @tap="getCode">
                       <text v-if="!hasSend">{{$t('login').get_code}}</text>
                       <text v-else>{{second}}s</text>
                   </view>
                </view>
               <view class="mt15 flex alcenter">
                  <checkbox
                      value="cb"
                      :checked="isRemember"
                      @tap="tapChecked"
                      style="transform:scale(0.7);color:'rgb(0, 171, 85)'"
                  />
                    <text>{{$t('login').rem_pwd}}</text>
					
                </view>
               <view
                    class="mt20 bgBlue radius4 ptb10 white ft14 tc mb10"
                    @tap="login"
                >{{$t('login').login}}
			   </view>
            </view>
            <view class=" ft14 flex alcenter between">
                <navigator url="forgetPwd" class="green1">{{$t('login').forget_pwd}}</navigator>
            </view>
        </view>
    </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            loginActive: 1,
            user_string: '',
            password: '',
            re_password: '',
            code: '',
            array: [],
		    arraycp:[],
            index: 0,
            area_code: '',
            hasSend: false,
            second: 60,
            isRemember: false,
            verifyPwd: false,
            isShowCode: false,
            timeInterval: '',
            lang: '',
			phoneshows:false,
			query_phone:'',
			prefixText:'+00'
        }
    },
    computed: {
        ...mapState(['theme']),
    },
    onLoad() {

        // uni.setNavigationBarTitle({
        //     title: this.$t('login').login
        // })
        // this.getCountry();
        // if (uni.getStorageSync('isRemember') == 0) {
        //     this.isRemember = false;
        // } else {
        //     this.isRemember = true;
        //     this.user_string = uni.getStorageSync('userString');
        //     this.password = uni.getStorageSync('userPwd');
        // }
        // this.lang = uni.getStorageSync('lang');
        // this.$utils.initData({ url: 'default/setting', data: { key: 'login_use_sms' } }, (res) => {
        //     this.isShowCode = res == 1 ? true : false;
        //     uni.setStorageSync('smcode', this.isShowCode);
        // })

        // this.$utils.getGlobalSettting({url:'env.json'},res=>{
        // 	console.log(res);
        // 	uni.setStorageSync('socketPort',res.socket_io_port)
        // 	uni.setStorageSync('smcode',res.login_need_smscode)
        // 	this.isShowCode=res.login_need_smscode;
        // })
    },
    onShow() {
        // this.$utils.setThemeTop(this.theme)
    },
	watch: {
	    query_phone: {
	        handler (newVal, oldLength) {
				  if (newVal.length != 0) {
					  let array = this.array.filter((item) => item.query.indexOf(this.query_phone) !== -1);
					  this.array = array;
					}else {
					   this.array = this.arraycp;;
					}
	        },
	        immediate: true
	    }
	},
    methods: {
		changeloginActive(e){
			this.loginActive = e;
		},
		clphoneshows(){
			this.phoneshows = false;
		},
		openphoneshows(){
			this.phoneshows = true;
		},
		query_phonechange(){
			   if (this.query_phone.length != 0 && this.query_phone!='' ) {
					let array = this.array.filter((item) => item.query.indexOf(this.query_phone) !== -1);
					this.array = array;
				}else {
					this.array = this.arraycp;
				}
		},
		turnregister(){
			uni.navigateTo({
			    url: '/pages/mine/setPwd'
			})
		},
        //获取国家列表
        getCountry() {
            this.$utils.initData({ url: 'default/area_list' }, (res, msg) => {
				res.forEach(function(item) {
					this.$set(item, "query", item.code+"-"+item.global_code);
				  }, this);
                this.array = res;
				this.arraycp = res;
				
                this.area_code = res[0].id;
            })
        },
        // 区号选择
        bindPickerChange(e) {
            // this.index = e.target.value;
            let item = e;
            this.area_code = item.id;
			this.prefixText = "+"+item.global_code;
			this.query_phone = "";
			this.clphoneshows();
        },
        // 获取验证码
        getCode() {
            if (this.timeInterval) return;
            if (this.loginActive == 0) {
                if (!this.user_string) {
                    return this.$utils.showLayer(this.$t('login').p_taccount)
                }
                this.$utils.initData({ url: 'sms_send', type: 'POST', data: { user_string: this.user_string, type: 5, country_code: this.area_code, lang: this.lang } }, (res, msg) => {
                    this.$utils.showLayer(msg);
                    this.hasSend = true;
                    this.timeInterval = setInterval(() => {
                        if (this.second >= 1) {
                            this.second--;
                        } else {
                            this.hasSend = false
                            clearInterval(this.timeInterval);
                        }
                    }, 1000)
                })
            } else {
                if (!this.$utils.checkEmail(this.user_string)) {
                    return this.$utils.showLayer(this.$t('login').p_temail)
                }
                this.$utils.initData({ url: 'sms_mail', type: 'POST', data: { user_string: this.user_string, type: 5, lang: this.lang } }, (res, msg) => {
                    this.$utils.showLayer(msg);
                    this.hasSend = true;
                    this.timeInterval = setInterval(() => {
                        if (this.second >= 1) {
                            this.second--;
                        } else {
                            this.hasSend = false
                            clearInterval(this.timeInterval);
                        }
                    }, 1000)
                })
            }
        },
        // 是否选中记住密码
        tapChecked() {
            this.isRemember = !this.isRemember;
            if (this.isRemember) {
                uni.setStorageSync('isRemember', 1)
            } else {
                uni.setStorageSync('isRemember', 0)
            }
        },
        // 密码框输入判断提示
        passwordInput(e) {
            this.hasSend = false;
            if (e.target.value.length < 6) {
                this.verifyPwd = true;
            } else {
                this.verifyPwd = false;
            }
        },
        login() {
            console.log('111');
            console.log({
                username: this.user_string,
                password: this.password
            });
            uni.request({
                url: 'http://62.60.232.70:8888/api/login', // 接口地址
                method: 'POST', // 请求方法
                data: {
                    email: this.user_string,
                    pw: this.password
                },
                header: {
                    'Content-Type': 'application/json' // 如果需要以 JSON 格式发送数据
                },
                success: (res) => {
                    console.log('POST 请求成功', res);
                    if(res.data.code == 200){
                        uni.navigateTo({
                            url: '/'
                        })
                        localStorage.setItem('hame_hall_userinfo', res.data.data.token);
                    }else{
                        uni.showModal({
                            title: '提示',
                            content: '登录失败，用户名或密码错误',
                            confirmText: '确定',
                        });
                    }
                    
                },
                fail: (err) => {
                    console.log('POST 请求失败', err);
                }
            });
            // if (this.loginActive == 1) {
            //     // 邮箱登录
            //     if (!this.$utils.checkEmail(this.user_string)) {
            //         return this.$utils.showLayer(this.$t('login').p_temail)
            //     }
            // } else {
                // if (!this.user_string) {
                //     return this.$utils.showLayer(this.$t('login').p_taccount)
                // }
            // }

            // let login_type = this.loginActive == 0 ? 'mobile' : 'email';
            // if (!this.password) {
            //     return this.$utils.showLayer(this.$t('login').p_pwd)
            // }
            // if (this.password.length < 6) {
            //     return this.$utils.showLayer(this.$t('login').p_pwderr)
            // }
            // if (this.isShowCode && !this.code) {
            //     return this.$utils.showLayer(this.$t('login').p_vcode)
            // }
            // var data = {
            //     account: this.user_string,
            //     password: this.password,
            //     sms_code: this.code,
            //     lang: this.lang,
            //     login_type: login_type
            // }
            // if (this.loginActive == 0) {
            //     // 手机登录
            //     data.country_code = this.area_code;
            // }
            // uni.showLoading();
            // this.$utils.initData({ url: 'user/login', data, type: 'POST' }, (res, msg) => {
            //     uni.setStorageSync('token', res);
            //     uni.setStorageSync('accountNumber', this.user_string);
            //     uni.setStorageSync('codeId', this.area_code);
            //     if (this.isRemember) {
            //         uni.setStorageSync('userString', this.user_string);
            //         uni.setStorageSync('userPwd', this.password);
            //     }
            //     setTimeout(() => {
            //         uni.reLaunch({
            //             url: '/pages/home/home'
            //         })
            //         uni.hideLoading();
            //     }, 1000);
            // })
        },

    }
}
</script>

<style>
.hide {
    display: none;
}

.light {
	background-color: #ffffff !important;
}
.css-1r06xjm {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    -webkit-box-pack: center;
    justify-content: center;
}
.css-1cl6obj {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    padding-top: 4px;
    -webkit-box-pack: center;
    justify-content: center;
}
.css-1r5r8g9 {
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
	width: 20vw;
}

.css-1pkgmdb {
    margin: 0px;
    line-height: 1.5;
    font-size: 0.888889rem;
    font-family: "Public Sans", sans-serif;
    color: rgb(0, 171, 85);
    padding-left: 4px;
    padding-right: 4px;
    font-weight: 700;
}
.css-1r5r8g9 > :not(style) + :not(style) {
    margin: 4px 0px 0px;
}
.css-19v4s8e {
    width: 100%;
    max-width: 50px;
    background-color: rgb(0, 171, 85);
    opacity: 1;
    height: 3px;
    border-radius: 1.5px;
}

.css-1cl6obj {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    padding-top: 4px;
    -webkit-box-pack: center;
    justify-content: center;
}

.css-1r5r8g9 {
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}

.css-1wi3iqv {
    margin: 0px;
    line-height: 1.5;
    font-size: 0.888889rem;
    font-family: "Public Sans", sans-serif;
    font-weight: 400;
    color: rgb(99, 115, 129);
    padding-left: 4px;
    padding-right: 4px;
}

.css-6errqh {
    display: flex;
    flex-direction: column;
    -webkit-box-align: start;
    align-items: start;
    width: 80%;
	margin-left: 8%;
	margin-top: 40rpx;
}

.css-19hiiex {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.css-1n9pd34 {
    margin: 0px;
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.11111rem;
    font-family: "Public Sans", sans-serif;
    color: rgb(33, 43, 54);
}

.css-u4p24i {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
}



.css-gq1kg8 {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-weight: 700;
    line-height: 1.71429;
    text-transform: capitalize;
    font-family: "Public Sans", sans-serif;
    min-width: 64px;
    padding: 4px 5px;
    border-radius: 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: rgb(0, 171, 85);
    box-shadow: none;
    height: 30px;
    font-size: 13px;
}

.css-a8gnbf {
    width: 100%;
    flex: 1 1 0%;
}

.css-1qkwt4q {
    margin-bottom: 10rpx;
    line-height: 1.57143;
    font-size: 0.777778rem;
    font-family: "Public Sans", sans-serif;
    font-weight: 400;
    color: rgb(99, 115, 129);
}

.css-1av642o {
    margin-top: 20rpx;
    font-weight: 600;
    line-height: 1.5;
    font-size: 0.888889rem;
    font-family: "Public Sans", sans-serif;
    color: rgb(0, 171, 85);
}

.css-a8gnbf {
    width: 100%;
    flex: 1 1 0%;
}

.css-1r2eyof {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
	margin-left: 10vw;
    padding: 7px;
}

.css-10ul6rq {
    line-height: 1;
    overflow: hidden;
    position: relative;
}
.css-10ul6rq .wrapper {
    width: 100%;
    height: 100%;
    background-size: cover !important;
}
.css-6jrdpz {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.css-khtut7 {
    margin-left: 10rpx;
    font-weight: 600;
    line-height: 1.57143;
    font-size: 0.777778rem;
    font-family: "Public Sans", sans-serif;
    color: rgb(33, 43, 54);
}

</style>
