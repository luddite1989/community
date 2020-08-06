<template>
	<view class="wrap">
		<title-scroll-x :tabs="tabs" :index="currentTabIndex" @onItemClick="onItemClick" />
		<swiper :duration="200" :current="currentTabIndex" @change="onViewChange" :style="'height:' + scrollH + 'px;'">
			<swiper-item v-for="(item, index) in tabs" :key="index">
				<tie-list :scrollHeight="scrollH"></tie-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import titleScrollX from '@/components/common/title-scroll-x.vue';
	import tieList from '@/components/common/tie-list.vue';

	export default {
		components: {
			titleScrollX,
			tieList
		},
		data() {
			return {
				tabs: [
					"广场",
					"精选",
					"关注"
				],
				scrollH: 0,
				currentTabIndex: 0
			};
		},
		onLoad() {
			this.scrollH = uni.getSystemInfoSync().windowHeight;
			console.log(1 + ":" + this.scrollH);
		},
		methods: {
			onViewChange(e) {
				this.currentTabIndex = e.detail.current;
			},
			onItemClick(e) {
				this.currentTabIndex = e;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		flex-direction: column;
	}
</style>
