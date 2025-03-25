<script setup>
    import { ref } from 'vue';
    import Carousel from './Carousel.vue'

    const props = defineProps({
        title : {
            type : String,
            default : ''
        },
        data : {
            type : Array,
            default : () => []
        },
        loading : {
            type : Boolean,
            default : false
        },
        handleNextProducts : {
            type : Function,
            default : () => {}
        },
    })

    const emit = defineEmits(['getDetails']);

    const handleClick = (slug) => {
        emit('getDetails', slug.toLowerCase());
    }

    const scrollContainer = ref(null)

    function scrollRight (){
        let cntScroll = window.innerWidth > 1280 ? 4 : Math.trunc(window.innerWidth / 256)
        scrollContainer.value.scrollLeft += (256 * cntScroll)
    }

    function scrollLeft (){
        let cntScroll = window.innerWidth > 1280 ? 4 : Math.trunc(window.innerWidth / 256)
        scrollContainer.value.scrollLeft -= (256 * cntScroll)
    }

</script>

<template>
    <div class="bg-color-6/40 rounded-xl px-2 relative">
        <Icon @click="scrollLeft()" icon="fas fa-chevron-left" class=" invisible lg:visible absolute top-1/2 left-1 text-3xl bg-black/70 text-white py-1 px-2.5 rounded-full z-20 hover:scale-110 cursor-pointer" />
        <h3 class="font-semibold uppercase text-color-2/80 text-xl pt-3">
            {{ props.title }}
        </h3>
        <div ref="scrollContainer" class="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-3">
            <Card v-for="item in props.data" @click="handleClick(item.slug)" class="bg-white shrink-0 w-[16rem] h-auto p-2 hover:shadow-lg shadow-color-2/40 hover:cursor-pointer ">
                <template #header>
                     <Carousel :images="item.images" class="h-40" :showCtrl="false"/>
                </template>
                <div class="text-center text-color-2">
                    <p class="text-xs font-medium">{{ item.title }}</p>
                    <p class="text-color-1">Q. {{ item.price }}.00</p>
                </div>
                <template #footer>
                    <div class="flex gap-1 text-color-6">
                        <Icon icon="fas fa-heart" class="icon-btn"/>
                        <Icon icon="fas fa-cart-shopping" class="icon-btn"/>
                    </div>
                </template>
            </Card>
            <Button text="Load More" @click="props.handleNextProducts" class="btn-primary text-nowrap" icon="fas fa-plus"/>
            <div v-if="props.loading" class="flex gap-2">
                <Card v-for="i in 5"  class="bg-white shrink-0 w-[16rem] h-auto p-2">
                    <div class="animate-pulse">
                        <div class="bg-color-2/40 h-40"></div>
                        <div class="h-4 bg-color-2/40 mt-2"></div>
                        <div class="h-4 bg-color-2/40 mt-2"></div>
                    </div>
                </Card>
            </div>
        </div>

        <Icon @click="scrollRight()" icon="fas fa-chevron-right" class=" invisible lg:visible absolute top-1/2 right-1 bg-black/70 text-white py-1 px-2.5 rounded-full text-3xl z-20 hover:scale-110 cursor-pointer" />
    </div>
</template>

<style scoped>
    .icon-btn {
        @apply hover:scale-125;
    }
</style>
