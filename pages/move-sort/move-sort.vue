<template>
	<view>
		<view class="home_wrap" v-for="(item,index) in listData" :key="index" @click="handleMovieDetail(item.id)">
			<image :src="item.images.small" mode="aspectFill"></image>
			<view class="right_wrap">
				<view class="title_wrap">
					<view class="title">
						{{item.title}}
					</view>
					<view class="score">
						{{item.rating.average == 0?"即将上映":item.rating.average}}
					</view>
				</view>
				<view class="year_wrap">
					{{item.pubdates[0]}}
				</view>
				<view class="genres_wrap">
					{{item.genres.join()}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				url: "",
				requestParam: {
					start: 0,
					count: 10,
					city: this.$store.state.city
				}
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.title
			})
			switch (options.title) {
				case "正在上映的电影-北京":
					this.url = "https://douban-api.uieee.com/v2/movie/in_theaters"
					break;
				case "即将上映的电影":
					this.url = "https://douban-api.uieee.com/v2/movie/coming_soon"
					break;
				case "豆瓣电影新片榜":
					this.url = "https://douban-api.uieee.com/v2/movie/new_movies"
					break;
				case "豆瓣电影Top250":
					this.url = "https://douban-api.uieee.com/v2/movie/top250"
					break;
			}
			this.getListData()
		},
		methods: {
			getListData() {
				this.request({
					url: this.url,
					data: this.requestParam
				}).then(res => {
					if (res.subjects.length <= 0) {
						return uni.showToast({
							title: "没有更多数据了",
							icon: "none"
						})
					}
					this.listData = [...this.listData, ...res.subjects]
					this.requestParam.start = this.requestParam.start + this.requestParam.count
				})
			},
			handleMovieDetail(id) {
				uni.navigateTo({
					url: "/pages/movie-detail/movie-detail?id=" + id
				})
			}
		},
		onReachBottom() {
			this.getListData()
		}
	}
</script>

<style lang="scss" scoped>
	.home_wrap {
		padding: 10upx 20upx;
		display: flex;
		border-bottom: 1upx solid #eee;

		image {
			width: 300upx;
			height: 400upx;
		}

		.right_wrap {
			padding-left: 20upx;
			flex: 1;

			.title_wrap {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					font-size: 35upx;
				}

				.score {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 35upx;
					font-size: 25upx;
					flex-shrink: 0;
					color: #fff;
					padding: 0 20upx;
					border-radius: 20upx;
					background-color: #f00;
				}

			}

			.year_wrap {
				color: #666;
				font-size: 30upx;
			}

			.genres_wrap {
				color: #999;
				font-size: 25upx;
			}
		}


	}
</style>
