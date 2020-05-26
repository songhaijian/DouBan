import Vue from "vue"
import Vuex from "vuex"
import request from "../utils/request.js"
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		// 全局变量
		city: "",
		movieObj: {},
		comingSoonObj: {},
		newObj: {},
		top250Obj: {}
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
				success: (res) => {
					context.state.city = res.address.city
					request({
						url: "https://douban-api.uieee.com/v2/movie/in_theaters",
						data: {
							start: "0",
							count: "8",
							city: res.address.city
						}
					}).then(movieRes => {
						context.state.movieObj = movieRes
					})
				}
			});
			// #endif
		},
		getComingSoon(context) {
			request({
				url: "https://douban-api.uieee.com/v2/movie/coming_soon",
				data: {
					start: "0",
					count: "8",
					city: context.state.city
				}
			}).then(res => {
				context.state.comingSoonObj = res
			})
		},
		getNew(context) {
			request({
				url: "https://douban-api.uieee.com/v2/movie/new_movies",
				data: {
					start: "0",
					count: "8",
					city: context.state.city
				}
			}).then(res => {
				context.state.newObj = res
			})
		},
		getTop250(context) {
			request({
				url: "https://douban-api.uieee.com/v2/movie/top250",
				data: {
					start: "0",
					count: "8",
					city: context.state.city
				}
			}).then(res => {
				context.state.top250Obj = res
			})
		}
	}
})
