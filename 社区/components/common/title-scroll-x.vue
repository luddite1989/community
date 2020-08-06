<template>
	<scroll-view v-if="tabs" scroll-x class="scroll-x" :scroll-into-view="scrollInto" scroll-with-animation>
		<view v-for="(item, i) in tabs" :key="i" class="scroll-x-item" :id="'tab' + i" :class="tabIndex === i ? 'scroll-x-item-selected' : ''"
		 @tap.stop="clickItem(i)">{{item}}</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			tabs: Array,
			index: {
				type: Number,
				default() {
					return 0;
				}
			}
		},
		data() {
			return {
				scrollInto: "tab" + this.index,
				tabIndex: this.index
			};
		},
		watch: {
			index(e) {
				this.tabIndex = e;
			}
		},
		methods: {
			clickItem(e) {
				if (this.tabIndex === e) {
					return;
				}
				this.tabIndex = e;
				this.scrollInto = "tab" + e;
				this.$emit("onItemClick", e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-x {
		width: 100%;
		white-space: nowrap;
		border-bottom: 1rpx solid white;
		height: 125rpx;
	}

	.scroll-x-item {
		display: inline-block !important;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
		font-size: 36rpx;
		color: $app-disable-color;
	}

	.scroll-x-item:first-child {
		margin-left: 30rpx;
	}

	.scroll-x-item:last-child {
		margin-right: 30rpx;
		padding-bottom: 8rpx;
	}

	.scroll-x-item-selected {
		color: $app-theme-color;
		font-size: 40rpx;
		font-weight: bold;
		border-bottom: 6rpx solid $app-theme-color;
		padding-bottom: 8rpx;
		border-radius: 5rpx;
	}
</style>
