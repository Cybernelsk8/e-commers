<script setup>
    import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchProduct from './SearchProduct.vue'

    const router = useRouter()

    const props = defineProps({
        open:{
            type: Boolean,
            default : false
        },
        title : {
            type : String,
            default : 'CyberShopGT'
        },
        logo : {
            type : String,
            default : 'fas fa-dolly'
        }
    })

</script>

<template>
    <nav class="bg-color-1 text-color-5 py-4 md:px-8 w-full">
        <div class="text-2xl max-w-7xl mx-auto grid gap-4 justify-items-center md:flex md:justify-between">
            <div class="flex items-center gap-2">
                <Icon icon="fas fa-bars" class="cursor-pointer hover:scale-110" />
                <Icon :icon="props.logo" class="text-4xl" />
                <h1 @click="router.push('/')" class="font-bold cursor-pointer select-none">{{ props.title }}</h1>
            </div>
            <div class="flex-1 text-base">
                <SearchProduct :title="props.title" />
            </div>
            <div class="flex space-x-2 ">
                <Tool-Tip message="Favoritos" class="mt-6 text-xs">
                    <Icon icon="fas fa-heart" class="hover:scale-110 hover:text-red-500"/>
                </Tool-Tip>
                <Tool-Tip message="Mi cuenta" class="mt-6 text-xs">
                    <Icon icon="fas fa-user" class="hover:scale-110 hover:text-color-2" />
                </Tool-Tip>
                <Tool-Tip message="Carrito" class="mt-6 text-xs">
                    <label class="relative cursor-pointer hover:scale-110">
                        <span class="rounded-full bg-red-500  flex items-center justify-center w-4 h-4 text-xs -top-2 -right-1 text-secondary font-semibold absolute">
                            3
                        </span>
                        <Icon icon="fas fa-cart-shopping "/>
                    </label>
                </Tool-Tip>
            </div>
        </div>
    </nav>
</template>