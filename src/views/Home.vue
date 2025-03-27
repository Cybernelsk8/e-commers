<script setup>
    import Carousel from '@/components/Carousel.vue'
    import ProductCarousel from '@/components/ProductCarousel.vue';
    import { onBeforeMount } from 'vue'
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

    const getProductsCategory = (categorySlug) => {
        router.push({ name : 'ProductsCategory', params : { categorySlug } })
    }

    onBeforeMount(async () => {
        store.fetchCategories()
    })  

</script>

<template>
    <Carousel :images="images" class="rounded-xl"/>
    <div class="py-4">
        <h2 class="text-xl text-color-2 font-bold text-center">Categorias</h2>
        <ul class="flex flex-wrap gap-3 justify-center">
            <li v-for="category in store.categories">
                <Tool-Tip :message="category.name" class="mt-12 text-color-2">
                    <img @click="getProductsCategory(category.slug)" :src="category.image" :alt="category.name" class="object-cover rounded-full border-2 border-color-1 h-14 w-14 hover:scale-110" >
                </Tool-Tip>
            </li>
        </ul>
    </div>
    <br>
    <div class="grid gap-8">
        <ProductCarousel v-for="category in store.categories" :title="category.name" :categoryId="category.id" class="w-[21.5rem] md:w-[48rem] xl:w-[80rem]" @get-details="getDetails"/>
    </div>
</template>


