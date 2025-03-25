import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGlobalStore } from './global'
import axios from 'axios'

export const useHomeStore = defineStore('home', () => {
  
    const global = useGlobalStore()

    const categories = ref([])
    const products = ref([])
    const loading = ref({
        categories : false,
        products : false,
    })

    const pagination = ref({
        page : 1,
        offset : 0,
        limit : 10,
    })
    
    const errors = ref({})

    const fetchCategories = async () => {
        loading.value.categories = true
        try {
            const response = await axios.get('categories')
            categories.value = response.data
        } catch (error) {
            global.manejarError(error)
            if(error.status === 422) {
                errors.value = error.response.data.errors
            }
        } finally {
            loading.value.categories = false
        }
    }

    const fetchProducts = async (categoryId) => {
        loading.value.products = true
        try {
            const response = await axios.get('products', {
                params : {
                    categoryId : categoryId,
                    offset : pagination.value.offset,
                    limit : pagination.value.limit,
                }
            })
            return response.data
        } catch (error) {
            global.manejarError(error)
            if(error.status === 422) {
                errors.value = error.response.data.errors
            }
        } finally {
            loading.value.products = false
        }
    }

    const getNextProducts = async () => {
        pagination.value.page++
        pagination.value.offset = pagination.value.offset + pagination.value.limit
        products.value = products.value.concat(await fetchProducts(1))
    }

    return {

        categories,
        products,
        pagination,
        loading,
        errors,

        fetchCategories,
        fetchProducts,
        getNextProducts,

    }
})
