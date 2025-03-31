<script setup>
    import axios from 'axios'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()

    const props = defineProps({
        title: {
            type: String,
            default: 'Search for products...'
        },
        products : {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: String,
            default: ''
        }
    })

    const emits = defineEmits(['Update:modelValue'])

    const open = ref(false)
    const search = ref('')
    const products = ref([])
    const loading = ref(false)

    const searchProduct = async () => {
        loading.value = true
        try {
            const response = await axios.get('products',{
                params : {
                    title : search.value,
                    offset : 0,
                    limit : 5
                }
            })
            products.value = response.data
            open.value = true
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const getProductDetails = (slug) => {
        if(router.currentRoute.name != 'ProductDetails') {
            router.push({ name: 'ProductDetails', params: { slug } })
            open.value = false
        }
    }


</script>

<template>
    <div class="relative">
        <Input @click="searchProduct()" @input="searchProduct()" v-model="search" icon="search" type="search" :placeholder="`Buscar en ${props.title}`"/>
        <div v-show="open" class="absolute bg-white w-full overflow-y-auto shadow-lg rounded-md z-20 my-1 text-color-2 p-4">
            <ul class="grid">
                <li v-for="product in products" @click="getProductDetails(product.slug)" class="flex items-center gap-2 p-2 rounded-sm hover:bg-color-5 cursor-pointer">
                    <img :src="product.images[0]" :alt="product.title" class="w-8 h-8 object-cover rounded-sm">
                    <span>{{ product.title }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>