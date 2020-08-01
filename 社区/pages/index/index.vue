<template>
	<view class="wrap">
		<template v-for="(item, index) in data">
			<tie-item :item="item" :key="index" @onFollow="onFollow" @onAvatar="onAvatar" @onImages="onImages" @onContent="onContent" @onPraise="onPraise" />
		</template>
	</view>
</template>

<script>
import tieItem from '@/components/common/tie-item.vue';
import ties from '../../data/ties.js';

export default {
	components: {
		tieItem
	},
	data() {
		return {
			data: []
		};
	},
	onLoad() {
		this.data = ties.data.data;
	},
	onShow() {},
	methods: {
		onFollow(e) {
			e.follow = 1;
		},
		onAvatar(e) {},
		onContent(e) {},
		onImages(index, images) {
			let imgs = images.map(function(item) {
				return item.url;
			});
			uni.previewImage({
				current: index,
				urls: imgs,
				indicator: 'number',
				longPressActions: {
					itemList: ['保存图片'],
					success: data => {
						switch (data.tapIndex) {
							case 0:
								this.downLoadImage(imgs[index]);
								break;
							default:
								break;
						}
					},
					fail: error => {
						console.log(err.errMsg);
					}
				}
			});
		},
		onPraise(e) {
			e.praise = 1;
			e.praiseCount++;
		},
		downLoadImage(url) {
			uni.downloadFile({
				url: url,
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: '保存成功',
									icon: 'none'
								});
							},
							fail: function() {
								uni.showToast({
									title: '保存失败，请稍后重试',
									icon: 'none'
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.wrap {
	flex-direction: column;
}
</style>
