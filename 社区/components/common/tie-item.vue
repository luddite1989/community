<template>
	<view class="wrap" @tap.stop="clickContent(item.id)" v-if="item && item">
		<view class="user-wrap" v-if="item.author">
			<image v-if="item.author.avatar" mode="aspectFill" class="avatar" :src="item.author.avatar" lazy-load @tap.stop="clickAvatar(item.author.id)" />
			<view class="info">
				<text v-if="item.author.nick" class="nick text-ellipsis">{{ item.author.nick }}</text>
				<text v-if="item" class="time">{{ item.publishTime }}</text>
			</view>
			<view :class="{ animate__animated: true, animate__faster: true, followed: item.author.follow != 0 }" hover-class="animate__pulse" @tap.stop="clickFollow(item.author)">
				<text :class="{ follow: true, followed: item.author.follow != 0 }">{{ item.author.follow == 0 ? '+ 关注' : '已关注' }}</text>
			</view>
		</view>
		<text v-if="item.content && item.content.length > 0" class="content text-ellipsis-2">{{ item.content }}</text>
		<image
			v-if="item.images && item.images.length && item.images.length == 1"
			mode="aspectFill"
			class="image-1"
			:src="item.images[0].url"
			lazy-load
			@tap.stop="clickImage(0, item.images)"
		/>
		<view v-if="item.images && item.images.length && item.images.length == 2" class="image-wrap">
			<image mode="aspectFill" class="image-2" v-for="(val, index) in showImages" :src="val.url" :key="index" lazy-load @tap.stop="clickImage(index, item.images)" />
		</view>
		<view v-if="item.images && item.images.length && item.images.length > 2" class="image-wrap">
			<image mode="aspectFill" class="image-n" v-for="(val, index) in showImages" :src="val.url" :key="index" lazy-load @tap.stop="clickImage(index, item.images)" />
			<text v-if="item.images.length > 3" class="image-mask" @tap.stop="clickImage(2, item.images)">+{{ item.images.length - 3 }}</text>
		</view>
		<view class="bottom-wrap">
			<view class="control-wrap animate__animated animate__faster" hover-class="animate__pulse" @tap.stop="clickPraise(item)">
				<text :class="{ 'control-text': true, iconfont: true, iconA63: true, praise: item.praise != 0 }" style="font-size: 36rpx;" />
				<text :class="{ 'control-text': true, praise: item.praise != 0 }">{{ item.praiseCount }}</text>
			</view>
			<view class="control-wrap animate__animated animate__faster" hover-class="animate__pulse">
				<text class="control-text iconfont iconA117" style="font-size: 36rpx;margin-left: 30rpx;" />
				<text class="control-text">{{ item.commentCount }}</text>
			</view>
		</view>
		<view class="line" />
	</view>
</template>

<script>
export default {
	props: {
		item: Object
	},
	computed: {
		showImages() {
			return this.item.images.slice(0, 3);
		}
	},
	data() {
		return {};
	},
	methods: {
		//点击头像
		clickAvatar(e) {
			this.$emit('onAvatar', e);
			console.log('头像');
		},
		//点击关注
		clickFollow(e) {
			this.$emit('onFollow', e);
			console.log('关注');
		},
		//点击图片
		clickImage(index, images) {
			this.$emit('onImages', index, images);
			console.log('图片');
		},
		//点击内容
		clickContent(e) {
			this.$emit('onContent', e);
			console.log('内容');
		},
		//点击赞
		clickPraise(e) {
			this.$emit("onPraise", e);
			console.log('赞');
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	flex-direction: column;
	width: 100%;
	padding: $app-margin;
}
.user-wrap {
	width: 100%;
	align-items: center;
}
.info {
	flex: 1;
	height: 70rpx;
	flex-direction: column;
	padding-left: $app-padding;
	justify-content: space-between;
}
.nick {
	font-size: $app-content-size;
	color: $app-title-color;
	font-weight: bold;
	width: 300rpx;
}
.time {
	font-size: $app-tips-size;
	color: $app-content-color;
	width: 300rpx;
}
.follow {
	width: 100rpx;
	border: 1rpx solid $app-theme-color;
	height: 50rpx;
	font-size: $app-tips-size;
	text-align: center;
	line-height: 50rpx;
	border-radius: 25rpx;
	color: $app-theme-color;
}
.followed {
	color: $app-disable-color;
	border-color: $app-disable-color;
}
.avatar {
	width: 70rpx;
	height: 70rpx;
	border-radius: 100%;
	background-color: $app-bg;
}
.content {
	font-size: $app-content-size;
	color: $app-content-color;
	margin-top: $app-padding;
}
.image-1 {
	border-radius: 10rpx;
	width: 400rpx;
	height: 300rpx;
	margin-top: $app-padding;
	background-color: $app-bg;
}
.image-wrap {
	position: relative;
	width: 100%;
	justify-content: space-between;
}
.image-2 {
	border-radius: 10rpx;
	height: 255rpx;
	width: 340rpx;
	margin-top: $app-padding;
	background-color: $app-bg;
}
.image-n {
	border-radius: 10rpx;
	height: 225rpx;
	width: 225rpx;
	margin-top: $app-padding;
	background-color: $app-bg;
}
.image-mask {
	position: absolute;
	background-color: rgba($color: #000000, $alpha: 0.5);
	bottom: 0;
	right: 0;
	height: 225rpx;
	width: 225rpx;
	border-radius: 10rpx;
	color: rgba($color: #ffffff, $alpha: 0.8);
	line-height: 220rpx;
	text-align: center;
	font-size: 80rpx;
	font-weight: bold;
}
.bottom-wrap {
	flex-direction: right;
	width: 100%;
	margin-top: $app-padding;
	justify-content: flex-end;
}
.control-wrap {
	align-items: center;
}
.control-text {
	font-size: $app-content-size;
	margin-left: $app-gap;
	color: $app-disable-color;
}
.praise {
	color: $app-theme-color;
}
.line {
	background-color: $app-line;
	height: 1rpx;
	width: 100%;
	margin-top: $app-padding;
}
</style>
