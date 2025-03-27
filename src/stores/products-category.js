import { defineStore } from 'pinia'
import { useGlobalStore } from './global'
import axios from 'axios'
import { ref } from 'vue'


export const useProductsCategoryStore = defineStore('products-category', () => {
    
    const global = useGlobalStore()

    const products = ref([])
    const pagination = ref({
        offset : 0,
        limit : 10
    })

    const loading = ref(false)
    const errors = ref({})

    const fetch = async (categorySlug) => {
        loading.value = true
        try {
            const response = await axios.get('products',{
                params : {
                    categorySlug : categorySlug,
                    offset : pagination.value.offset,
                    limit : pagination.value.limit
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

    const getMoreProducts = async (categorySlug) => {
        pagination.value.offset = pagination.value.offset + pagination.value.limit
        fetch(categorySlug)
    }

    return {
        products,
        pagination,
        loading,
        errors,

        fetch,
        getMoreProducts,
    }
})
