<template>
	<view class="home_wrap" v-if="Object.keys(getNowPlayList).length!=0">
		<image :src="getNowPlayList.subjects[0].images.large"></image>
		<button @click="handleGotoMovieList">立即体验</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		onReady() {
			this.$store.dispatch("getCity")
		},
		methods: {
			handleGotoMovieList() {
				uni.navigateTo({
					url: "/pages/movie-list/movie-list"
				})
			}
		},
		computed: {
			getNowPlayList() {
				return this.$store.state.movieObj
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home_wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		image {
			width: 100%;
			height: 100%;
		}

		button {
			position: fixed;
			width: 30%;
			bottom: 100upx;
			left: 0;
			right: 0;
			background: rgba(255, 255, 255, 0.7)
		}
	}
</style>
