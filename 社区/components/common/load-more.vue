<template>
	<view class="wrap">
		<text>{{tips}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: "加载中..."
			};
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		height: 90rpx;
		justify-content: center;
		align-items: center;
		color: $app-disable-color;
		font-size: 28rpx;
	}
</style>
