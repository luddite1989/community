<template>
	<scroll-view scroll-y :style="'height:' + scrollH + 'px;'" @scrolltolower="lower">
		<template v-for="(item, index) in data">
			<tie-item :item="item" :key="index" @onFollow="onFollow" @onAvatar="onAvatar" @onImages="onImages" @onContent="onContent"
			 @onPraise="onPraise" />
		</template>
	</scroll-view>
</template>

<script>
	import tieItem from '@/components/common/tie-item.vue';
	import loadMore from '@/components/common/load-more.vue';
	import ties from '@/data/ties.js';
	import fileUtil from '@/utils/FileUtil.js';

	export default {
		props: {
			scrollHeight: {
				type: Number,
				default () {
					return 0;
				}
			}
		},
		watch: {
			scrollHeight(e) {
				this.scrollH = e;
			}
		},
		components: {
			tieItem,
			loadMore
		},
		data() {
			return {
				scrollH: 0,
				data: []
			}
		},
		mounted() {
			this.data = ties.data.data;
			this.scrollH = uni.getSystemInfoSync().windowHeight;
			console.log(2 + ":" + this.scrollH);
		},
		methods: {
			lower(e) {
				this.data = [...this.data, ...this.data];
				console.log("e");
			},
			onFollow(e) {
				e.follow = 1;
			},
			onAvatar(e) {},
			onContent(e) {},
			onImages(index, images) {
				let imgs = images.map(function(item) {
					return item.url;
				});
				fileUtil.previewImage(index, imgs, (data) => {
					switch (data.tapIndex) {
						case 0:
							this.downLoadImage(imgs[index]);
							break;
						default:
							break;
					}
				});
			},
			onPraise(e) {
				e.praise = 1;
				e.praiseCount++;
			},
			downLoadImage(url) {
				fileUtil.saveImage(url);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
