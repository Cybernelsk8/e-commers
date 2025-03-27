<script setup>
    import { useProductsCategoryStore } from '@/stores/products-category'
    import { onBeforeMount } from 'vue'
    import Carousel from '@/components/Carousel.vue'
    import { useRouter } from 'vue-router'

    const store = useProductsCategoryStore()
    const router = useRouter()

    const props = defineProps({
        categorySlug : {
            type : String,
            default : ''
        }
    })

    const getDetails = (slug) => {
        router.push({ name : 'ProductDetails', params : { slug } })
    }

    

    onBeforeMount(() => {
        store.fetch(props.categorySlug)
    })

</script>

<template>
    <h1 class="text-color-2 font-bold text-2xl text-center py-4 uppercase">{{ props.categorySlug }}</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card v-for="product in store.products" @click="getDetails(product.slug)" class="bg-white shrink-0 border border-color-6 w-[16rem] h-auto p-2 hover:shadow-lg shadow-color-2/40 hover:cursor-pointer ">
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
        <Card v-if="store.products.length == store.pagination.limit" class="bg-color-2/40 shrink-0 w-[16rem] h-auto p-2">
            <div class=" h-54 flex items-center justify-center">
                <Button text="Cargar mas" @click="store.getMoreProducts(props.categorySlug)" class="btn-primary" icon="fas fa-plus"/>
            </div>
        </Card>
        <div v-if="store.loading">
            <Card v-for="i in store.pagination.limit"  class="bg-white shrink-0 w-[16rem] h-auto p-2">
                <div class="animate-pulse">
                    <div class="bg-color-2/40 h-40"></div>
                    <div class="h-4 bg-color-2/40 mt-2"></div>
                    <div class="h-4 bg-color-2/40 mt-2"></div>
                </div>
            </Card>
        </div>
    </div>
</template>