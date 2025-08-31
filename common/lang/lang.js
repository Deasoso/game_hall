import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './zh'
import en from './en'
import jp from './jp'
import hk from './hk'
import th from './th'
import kr from './kr'
import du from './du'
import yinni from './yinni'
import tuerqi from './tuerqi'
import vi from './vi'
let locale = uni.getStorageSync('lang') || '';
if (locale == '') {
	locale = 'vi';
	uni.setStorageSync('lang', locale)
}
const i18n = new VueI18n({
	locale: locale,
	messages: {
		zh: zh,
		en: en,
		jp: jp,
		hk: hk,
		th: th,
		kr: kr,
		du: du,
		yinni: yinni,
		tuerqi: kr,
		vi:vi
		
	}
})
export default i18n