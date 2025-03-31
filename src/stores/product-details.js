import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGlobalStore } from './global'
import axios from 'axios'

export const useProductDetailsStore = defineStore('product-details', () => {
  
    const global = useGlobalStore()
    const product = ref({})
    const loading = ref({
        fetch : false,
    })
    const errors = ref({})
    const image = ref(null)

    const fetch = async (slug) => {
        loading.value.fetch = true
        try {
            const response = await axios.get('products/slug/'+slug)
            product.value = response.data
            image.value = response.data.images[0]
        } catch (error) {
            global.manejarError(error)
            if(error.status === 422) {
                errors.value = error.response.data.errors
            }
        } finally {
            loading.value.fetch = false
        }
    }

    
    return {
        product,
        loading,
        errors,
        image,
        
        fetch,
    }
})
