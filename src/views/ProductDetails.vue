<script setup>
    import { useProductDetailsStore } from '@/stores/product-details'
    import { onBeforeMount } from 'vue'
    import ProductCarousel from '@/components/ProductCarousel.vue'

    const store = useProductDetailsStore()

    const props = defineProps({
        slug : {
            type : String,
            default : '',
            required : true
        }
    })

    const getDetails = (slug) => {
        store.fetch(slug)
    }

    onBeforeMount(() => {
        store.fetch(props.slug)
    })

</script>

<template>
    <section>
        <div class="grid lg:grid-cols-2 justify-items-center gap-4">
            <div class="flex gap-2">
                <ul class="flex flex-col gap-2">
                    <li v-for="image in store.product.images" @click="store.image = image" class="cursor-pointer hover:scale-110">
                        <img :src="image" alt="" class="w-14 h-14 object-cover" :class="{'border-2 border-color-1 rounded' : store.image === image}" />
                    </li>
                </ul>
                <img :src="store.image"  alt="" class=" w-48 md:w-xl object-cover rounded-xl transition-all" />
            </div>
            <Card class="bg-color-6/40 p-8 text-color-2">
                <div class="grid gap-4">
                    <h1 class="text-2xl font-semibold">{{ store.product.title }}</h1>
                    <p>{{ store.product.description }}</p>
                    <strong>Q. {{ store.product.price }}.00</strong>
                    <br>
                    <Button text="Agregar al carrito" class="btn-primary" icon="fas fa-cart-shopping" />
                </div>
            </Card>
        </div>
    </section>
    <section class="mt-8" v-if="store.product.hasOwnProperty('category')">
        <ProductCarousel title="Productos relacionados" :categoryId="store.product?.category?.id" class="w-[21.5rem] md:w-[48rem] xl:w-[80rem]" @get-details="getDetails"/>
    </section>
    <section>
        <div class="grid gap-4 mt-8 text-color-2">
            <h1 class="text-2xl font-semibold">Descripción</h1>
            <p>{{ store.product.description }}</p>
        </div>
    </section>
</template>