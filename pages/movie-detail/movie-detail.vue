<template>
	<view class="home_wrap" v-if="Object.keys(this.detailObj).length!=0">
		<image class="detail_img" :src="detailObj.images.large" mode="aspectFill"></image>

		<view class="top_wrap">
			<image class="top_img" :src="detailObj.images.large" mode="aspectFill"></image>
			<view class="detail_name">
				{{detailObj.title}}
			</view>
			<view class="rate_wrap" v-if="detailObj.rating.average!=0">
				<view class="rate_title">
					评分
				</view>
				<view class="rate">
					{{detailObj.rating.average}}
				</view>
			</view>
			<view class="sum_wrap">
				<view class="sum_title">
					摘要
				</view>
				<view class="sum">
					{{detailObj.summary}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailObj: {}
			}
		},
		onLoad(options) {
			this.getDetailData(options.id)
		},
		methods: {
			getDetailData(id) {
				this.request({
					url: "https://douban-api.uieee.com/v2/movie/subject/" + id
				}).then(res => {
					this.detailObj = res
				})
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

		.detail_img {
			width: 100%;
			height: 100%;
		}

		.top_wrap {
			position: absolute;
			z-index: 10;
			background: rgba(255, 255, 255, 0.7);
			width: 100%;
			height: 100%;
			text-align: center;
			top: 0;
			overflow-y: auto;

			.top_img {
				margin-top: 100upx;
				width: 80%;
				height: 900upx;
			}

			.detail_name {
				font-weight: bold;
			}

			.rate_wrap {
				display: flex;

				.rate_title {
					margin-left: 80upx;
				}

				.rate {}
			}

			.sum_wrap {
				margin-left: 80upx;
				margin-right: 80upx;
				text-align: start;

				.sum_title {}

				.sum {
					font-size: 30upx;
					color: #666;
				}
			}
		}
	}
</style>
