<template>
    <view class="plr20" :class="{'light': true}">
        <view class="mt30">
            <view class="mt10">
                <view class=" alcenter bdb_myblue mb10">
                    <view class=" alcenter between mr10">
						<view class="mb10">
							<view class="css-1qkwt4q">{{$t('login').e_email}}</view>
						    <view class="flex">
								<uni-easyinput type="text" prefixIcon="email" v-model="email" :placeholder="$t('login').p_email" ></uni-easyinput>
						    </view>
                             <view
                                class="mt10 bgGreen radius4 ptb10 white ft14 tc mb10"
                                @tap="sendCode"
                            >{{'发送验证码'}}</view>
                            <view class="css-1qkwt4q">{{'验证码'}}</view>
                            <view class="flex">
                                <uni-easyinput    type="text" v-model="get_code"  :placeholder="'请输入验证码'" ></uni-easyinput>
                            </view>
                            <view class="css-1qkwt4q">{{'密码'}}</view>
                            <view class="flex">
                                <uni-easyinput    type="text" v-model="password"  :placeholder="'请输入密码'" ></uni-easyinput>
                            </view>
                            <view class="css-1qkwt4q">{{'邀请码'}}</view>
                            <view class="flex">
                                <uni-easyinput    type="text" v-model="invite_code"  :placeholder="'请输入邀请码'" ></uni-easyinput>
                            </view>
						</view>
                    </view>
                </view>
               <view
                    class="mt10 bgGreen radius4 ptb10 white ft14 tc mb10"
                    @tap="register"
                >{{'注册'}}</view>
            </view>
        </view>
    </view>
	
</template>

<script>
// import country from '@/common/country.js'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            loginActive: 1,
            email: '',
            phone: '',
            password: '',
            get_code: '',
            invite_code: '',
            re_password: '',
            code: '',
            array: [],
			arraycp:[],
            index: 0,
            area_code: '+86',
            hasSend: false,
            second: 60,
            isRemember: false,
            verifyPwd: false,
            isShowCodeLayer: false,
            timeInterval: '',
            lang: '',
            nationality: 'China',
            invitecode: '',
            downUrl: '',
			phoneshows:false,
			query_phone:'',
			prefixText:'+00'
        }
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
    onLoad(e) {
		// 	uni.setStorageSync('invitecode',e)
        // this.getCountry();
        // this.invitecode = e.invite_code;
        // console.log(this.invitecode)
        // this.lang = uni.getStorageSync('lang');
        // uni.setNavigationBarTitle({
        //     title: this.$t('login').register
        // })
    },
    computed: {
        ...mapState(['theme']),
    },
    onShow() {
        // this.$utils.setThemeTop(this.theme);
        // this.init();
    },
	
    methods: {
        sendCode() {
            console.log('111');
            uni.request({
                url: 'http://62.60.232.70:8888/api/sendCode', // 接口地址
                method: 'POST', // 请求方法
                data: {
                    email: this.email
                },
                header: {
                    'Content-Type': 'application/json' // 如果需要以 JSON 格式发送数据
                },
                success: (res) => {
                    if(res.data.code == 200){
                        this.get_code = res.data.data.code;
                    }else{
                        uni.showModal({
                            title: '提示',
                            content: '发生了错误',
                            confirmText: '确定',
                        });
                    }
                },
                fail: (err) => {
                    console.log('POST 请求失败', err);
                }
            });
        },
        register() {
            console.log('111');
            uni.request({
                url: 'http://62.60.232.70:8888/api/regEmail', // 接口地址
                method: 'POST', // 请求方法
                data: {
                    email: this.email,
                    pw: this.password,
                    code: this.get_code,
                    invitation_code: this.invite_code
                },
                header: {
                    'Content-Type': 'application/json' // 如果需要以 JSON 格式发送数据
                },
                success: (res) => {
                    if(res.data.code == 200){
                        console.log(this.get_code);
                        console.log('POST 请求成功', res.data);
                        uni.navigateTo({
                            url: '/pages/index/login'
                        })
                    }else{
                        uni.showModal({
                            title: '提示',
                            content: '发生了错误',
                            confirmText: '确定',
                        });
                    }
                    
                },
                fail: (err) => {
                    console.log('POST 请求失败', err);
                }
            });
        },
		clphoneshows(){
			this.phoneshows = false;
		},
		openphoneshows(){
			this.phoneshows = true;
		},
		changeloginActive(e){
			this.loginActive = e;
		},
		query_phonechange(){
			   if (this.query_phone.length != 0 && this.query_phone!='' ) {
					let array = this.array.filter((item) => item.query.indexOf(this.query_phone) !== -1);
					this.array = array;
				}else {
					this.array = this.arraycp;
				}
		},
        init() {
            var that = this;
            this.$utils.initData({                url: 'default/setting', data: {
                    key: 'app_download_url'
                }            }, (res, msg) => {
                that.downUrl = res;
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
			let item = e;
			this.area_code = item.id;
			this.prefixText = "+"+item.global_code;
			this.query_phone = "";
			this.nationality = item.name;
			this.area_code = item.id;
			this.clphoneshows();
        },
        // 获取验证码
        getCode() {
            if (this.timeInterval) return;
            let url;
            if (this.loginActive == 0) {
                url = 'notify/send_sms';
                if (!this.user_string) {
                    return this.$utils.showLayer(this.$t('login').p_taccount)
                }
            } else {
                url = 'notify/send_email';
                if (!this.$utils.checkEmail(this.user_string)) {
                    return this.$utils.showLayer(this.$t('login').p_temail)
                }
            }
            this.$utils.initData({ url: url, type: 'POST', data: { to: this.user_string, type: 1, area_id: this.area_code } }, (res, msg) => {
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
        },
        // 下一步
        goNext() {
            // if (this.loginActive == 1) {
            //     // 邮箱登录
            //     if (!this.$utils.checkEmail(this.user_string)) {
            //         return this.$utils.showLayer(this.$t('login').p_temail)
            //     }
            // } else {
            //     if (!this.user_string) {
            //         return this.$utils.showLayer(this.$t('login').p_taccount)
            //     }
            // }
            // uni.navigateTo({
            //     url: `setPwd?user_string=${this.user_string}&is_mobile=${this.loginActive}&areaCode=${this.area_code}&invitecode=${this.invitecode}`
            // })
            // this.isShowCodeLayer=true;
            // this.hasSend=false;
            // this.timeInterval='';
            // this.code='';
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
        // 确定
        confirm() {
            // if (!this.code) {
            //     return this.$utils.showLayer(this.$t('login').p_vcode)
            // }
            // uni.navigateTo({
            //     url: `setPwd?user_string=${this.user_string}&is_mobile=${this.loginActive}&code=${this.code}&areaCode=${this.area_code}&invitecode=${this.invitecode}`
            // })
            return;
            var data = {
                user_string: this.user_string,
                lang: this.lang
            }
            var url = ''
            if (this.loginActive == 0) {
                // 手机注册
                data.country_code = this.area_code;
                data.mobile_code = this.code;
                url = "user/check_mobile";
                data.scene = 'register';
            } else {
                data.email_code = this.code;
                data.country_code = this.area_code;
                url = 'user/check_email';
                data.scene = 'register';
            }
            uni.showLoading();
            this.$utils.initData({ url, data, type: 'POST' }, (res, msg) => {
                this.$utils.showLayer(msg);
                this.isShowCodeLayer = false;
                setTimeout(() => {
                    uni.navigateTo({
                        url: `setPwd?user_string=${this.user_string}&is_mobile=${this.loginActive}&code=${this.code}&areaCode=${this.area_code}&invitecode=${this.invitecode}`
                    })
                    uni.hideLoading();
                }, 1000)
            })
        },
        downLoad() {
            location.href = this.downUrl;
        }
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

.css-1tt2hgt > :not(style) + :not(style) {
	    margin: 16px 0px 0px;
	}
	.css-anhbr0 {
	    display: flex;
	    flex-direction: row;
	    -webkit-box-align: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    justify-content: center;
	    flex: 1 1 0%;
	    height: 100%;
	    border-radius: 22px;
	    background-color: rgb(0, 171, 85);
	}
	.css-1218q3i {
	    display: flex;
	    flex-direction: row;
	    -webkit-box-align: center;
	    align-items: center;
	    width: 100%;
	    height: 40px;
	    border-radius: 20px;
	    background-color: rgba(145, 158, 171, 0.08);
	}
	.css-1qzpzl {
	    display: flex;
	    flex-direction: row;
	    -webkit-box-align: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    justify-content: center;
	    flex: 1 1 0%;
	    height: 100%;
	    border-radius: 22px;
	}
	.css-1qkwt4q {
		margin-top: 10rpx;
	    margin-bottom: 10rpx;
	    line-height: 1.57143;
	    font-size: 0.777778rem;
	    font-family: "Public Sans", sans-serif;
	    font-weight: 400;
	    color: rgb(99, 115, 129);
	}
	.css-t5pxqc {
	    margin: 0px;
	    line-height: 1.5;
	    font-size: 0.888889rem;
	    font-family: "Public Sans", sans-serif;
	    font-weight: 400;
	    text-align: center;
	    color: rgb(255, 255, 255);
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
    line-height: 2.57143;
    font-size: 0.777778rem;
    font-family: "Public Sans", sans-serif;
    color: rgb(33, 43, 54);
}
</style>
