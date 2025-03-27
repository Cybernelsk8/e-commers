<script setup>
    import { onBeforeMount, ref } from 'vue';
    import { useGlobalStore } from '@/stores/global'
    import Carousel from './Carousel.vue'
    import axios from 'axios'

    const props = defineProps({
        title : {
            type : String,
            default : ''
        },
        categoryId : {
            type : Number,
            default : 1
        },
    })

    const pagination = ref({
        offset : 0,
        limit : 10,
    })

    const global = useGlobalStore()

    const products = ref([])
    const loading = ref(false)
    const errors = ref({})

    const fetchProducts = async () => {
        loading.value = true
        try {
            const response = await axios.get('products', {
                params : {
                    categoryId : props.categoryId,
                    offset : pagination.value.offset,
                    limit : pagination.value.limit,
                }
            })
            products.value = products.value.concat(response.data)
        } catch (error) {
            global.manejarError(error)
            if(error.status === 422) {
                errors.value = error.response.data.errors
            }
        } finally {
            loading.value = false
        }
    }

    const getNextProducts = async () => {
        pagination.value.page++
        pagination.value.offset = pagination.value.offset + pagination.value.limit
        fetchProducts()
    }

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

    onBeforeMount(() => {
        fetchProducts()
    })

</script>

<template>
    <div class="bg-color-6/40 rounded-xl px-2 relative">
        <Icon @click="scrollLeft()" icon="fas fa-chevron-left" class=" invisible lg:visible absolute top-1/2 left-1 text-3xl bg-black/70 text-white py-1 px-2.5 rounded-full z-20 hover:scale-110 cursor-pointer" />
        <h3 class="font-semibold uppercase text-color-2/80 text-xl pt-3">
            {{ props.title }}
        </h3>
        <div ref="scrollContainer" class="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-3">
            <Card v-for="product in products" @click="handleClick(product.slug)" class="bg-white shrink-0 w-[16rem] h-auto p-2 hover:shadow-lg shadow-color-2/40 hover:cursor-pointer ">
                <template #header>
                     <Carousel :images="product.images" class="h-40" :showCtrl="false"/>
                </template>
                <div class="text-center text-color-2">
                    <p class="text-xs font-medium">{{ product.title }}</p>
                    <p class="text-color-1">Q. {{ product.price }}.00</p>
                </div>
                <template #footer>
                    <div class="flex gap-1 text-color-6">
                        <Icon icon="fas fa-heart" class="icon-btn hover:text-red-500" title="Agregar a favoritos"/>
                        <Icon icon="fas fa-cart-shopping" class="icon-btn hover:text-color-1" title="Agregar al carrito"/>
                    </div>
                </template>
            </Card>
            <Card class="bg-white shrink-0 w-[16rem] h-auto p-2">
                <div class="bg-color-2/40 h-54 flex items-center justify-center">
                    <Button text="Cargar mas" @click="getNextProducts" class="btn-primary text-nowrap animate-pulse" icon="fas fa-plus"/>
                </div>
            </Card>
            <div v-if="loading" class="flex gap-2">
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
        @apply hover:scale-110;
    }
</style>
