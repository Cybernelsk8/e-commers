<script setup>
    import { useProductDetailsStore } from '@/stores/product-details'
    import { onBeforeMount } from 'vue'

    const store = useProductDetailsStore()

    const props = defineProps({
        slug : {
            type : String,
            default : '',
            required : true
        }
    })

    onBeforeMount(() => {
        store.show(props.slug)
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
            <Card class="bg-color-6/40 p-4 text-color-2">
                <h1 class="text-2xl font-semibold">{{ store.product.title }}</h1>
                <p>{{ store.product.description }}</p>
                <strong>Q. {{ store.product.price }}.00</strong>
                <br>
                <Button text="Agregar al carrito" class="btn-primary" icon="fas fa-cart-shopping" />
            </Card>
        </div>
    </section>
</template>