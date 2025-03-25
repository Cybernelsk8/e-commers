<script setup>
	import { onMounted, onUnmounted, ref } from 'vue'
	const props = defineProps({
		images: {
			type: Array,
			default: () => []
		},
		showCtrl: {
			type: Boolean,
			default: true
		}
	})

	let intervalId

	const track = ref(null)
	let currentIndex = ref(0);

	function moveCarousel(index) {
		if (!track.value) return;
		const position = -index * 100 + '%';
		track.value.style.transform = 'translateX(' + position + ')';
	}

	function nextSlide() {
		currentIndex.value = (currentIndex.value + 1) % props.images.length;
		moveCarousel(currentIndex.value);
	}

	function prevSlide() {
		currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
		moveCarousel(currentIndex.value);
	}

	onMounted(() => {
		intervalId = setInterval(() => {
			nextSlide()
		}, 4000);
	})

	onUnmounted(() => {
		clearInterval(intervalId);
	})

</script>

<template>
	<div class="overflow-hidden max-w-full relative z-10">
		<div ref="track" class="flex transition-transform ease-in-out duration-1000">
			<div v-for="(src, index) in props.images" class="flex-none" :style="{ flex: '0 0 100%' }">
				<img :src="src" alt="Carousel Item" :key="index" />
			</div>
		</div>
		<Icon v-if="props.showCtrl" @click="prevSlide" icon="fas fa-angle-left" class="btn-carousel left-4" />
		<Icon v-if="props.showCtrl" @click="nextSlide" icon="fas fa-angle-right" class="btn-carousel right-4" />
		<div class="absolute">
			<span class="bg-color-5 h-2 w-5"></span>
		</div>
	</div>
</template>
