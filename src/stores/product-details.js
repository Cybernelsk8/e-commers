import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGlobalStore } from './global'
import axios from 'axios'

export const useProductDetailsStore = defineStore('product-details', () => {
  
    const global = useGlobalStore()
    const product = ref({})
    const loading = ref({
        show : false,
    })
    const errors = ref({})
    const image = ref(null)

    const show = async (slug) => {
        loading.value.show = true
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
            loading.value.show = false
        }
    }
    
    return {

        product,
        loading,
        errors,
        image,
        
        show
    }
})
