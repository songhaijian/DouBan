import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		// 全局变量
		city: ""
	},
	mutations: {
		//全局方法
	},
	actions: {
		//异步方法
		getCity(context) {
			// #ifdef APP-PLUS
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res)=> {
					context.state.city = res.address.city
				}
			});
			// #endif
		}
	}
})
