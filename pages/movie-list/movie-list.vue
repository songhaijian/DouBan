<template>
	<view class="home_wrap">
		<swiper autoplay="true" indicator-dots="true" circular="true">
			<swiper-item v-if="Object.keys(getNowPlayList).length!=0" v-for="(item,index) in getNowPlayList.subjects" :key="index">
				<image :src="item.images.small" mode="widthFix" @click="handleDetail(item.id)"></image>
			</swiper-item>
		</swiper>
		<!-- 正在上映的电影 -->
		<view class="list_wrap" v-if="Object.keys(getNowPlayList).length!=0">
			<view class="title_wrap" @click="handleSortList(getNowPlayList.title)">
				{{getNowPlayList.title}}
				<text>></text>
			</view>
			<scroll-view scroll-x="true" class="list_sc">
				<view class="item_list" v-for="(item,index) in getNowPlayList.subjects" :key="index" @click="handleDetail(item.id)">
					<image :src="item.images.small" mode="aspectFill"></image>
					<view class="item_title">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 即将上映的电影 -->
		<view class="list_wrap" v-if="Object.keys(getComingSoonList).length!=0">
			<view class="title_wrap" @click="handleSortList(getComingSoonList.title)">
				{{getComingSoonList.title}}
				<text>></text>
			</view>
			<scroll-view scroll-x="true" class="list_sc">
				<view class="item_list" v-for="(item,index) in getComingSoonList.subjects" :key="index" @click="handleDetail(item.id)">
					<image :src="item.images.small" mode="aspectFill"></image>
					<view class="item_title">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 豆瓣电影新片榜 -->
		<view class="list_wrap" v-if="Object.keys(getNewList).length!=0">
			<view class="title_wrap" @click="handleSortList(getNewList.title)">
				{{getNewList.title}}
				<text>></text>
			</view>
			<scroll-view scroll-x="true" class="list_sc">
				<view class="item_list" v-for="(item,index) in getNewList.subjects" :key="index" @click="handleDetail(item.id)">
					<image :src="item.images.small" mode="aspectFill"></image>
					<view class="item_title">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- top250电影榜 -->
		<view class="list_wrap" v-if="Object.keys(getTop250).length!=0">
			<view class="title_wrap" @click="handleSortList(getTop250.title)">
				{{getTop250.title}}
				<text>></text>
			</view>
			<scroll-view scroll-x="true" class="list_sc">
				<view class="item_list" v-for="(item,index) in getTop250.subjects" :key="index" @click="handleDetail(item.id)">
					<image :src="item.images.small" mode="aspectFill"></image>
					<view class="item_title">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onReady() {
			this.$store.dispatch("getCity")
			this.$store.dispatch("getComingSoon")
			this.$store.dispatch("getNew")
			this.$store.dispatch("getTop250")
		},
		methods: {
			handleDetail(id) {
				uni.navigateTo({
					url: "/pages/movie-detail/movie-detail?id=" + id
				})
			},
			handleSortList(title) {
				uni.navigateTo({
					url: "/pages/move-sort/move-sort?title=" + title
				})
			}
		},
		computed: {
			getNowPlayList() {
				return this.$store.state.movieObj
			},
			getComingSoonList() {
				return this.$store.state.comingSoonObj
			},
			getNewList() {
				return this.$store.state.newObj
			},
			getTop250() {
				return this.$store.state.top250Obj
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home_wrap {
		background-color: #2C405A;

		swiper {
			height: 400upx;

			swiper-item {
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.list_wrap {
			background: #2e4461;

			.title_wrap {
				color: #fff;
				margin-left: 20upx;
				padding: 10upx 0;

				text {
					margin-right: 20upx;
					float: right;
				}
			}

			.list_sc {
				white-space: nowrap;

				.item_list {
					width: 300upx;
					margin-left: 20upx;
					display: inline-block;

					image {
						width: 100%;
					}

					.item_title {
						overflow: hidden;
						text-align: center;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #fff;
						font-size: 30upx;
					}
				}

			}
		}
	}
</style>
