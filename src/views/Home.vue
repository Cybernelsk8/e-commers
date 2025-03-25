<script setup>
    import Carousel from '@/components/Carousel.vue'
    import ProductCarousel from '@/components/ProductCarousel.vue';
    import { computed, onBeforeMount, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useHomeStore } from '@/stores/home'

    const store = useHomeStore()

    const router = useRouter()

    const images = [
        './img/banners/1.jpg',
        './img/banners/2.jpg',
        './img/banners/3.jpg',
    ];

    const getDetails = (slug) => {
        router.push({ name : 'ProductDetails', params : { slug } })
    }

    const products =  computed(() => store.products)

    onBeforeMount(async () => {
        store.pagination = {
            page : 1,
            offset : 0,
            limit : 10,
        }

        store.products = await store.fetchProducts(1)
    })  

</script>

<template>
    <!-- <Carousel :images="images" class="rounded-xl"/> -->
    <br>
    <div class="relative">
        <ProductCarousel title="Clothes" :data="products" class="w-[21.5rem] md:w-[48rem] xl:w-[80rem]" @get-details="getDetails" :handleNextProducts="store.getNextProducts" :loading="store.loading.products" />
    </div>
</template>

