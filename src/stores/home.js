import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGlobalStore } from './global'
import axios from 'axios'

export const useHomeStore = defineStore('home', () => {
  
    const global = useGlobalStore()

    const categories = ref([])
    const loading = ref({
        categories : false,
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

    

    

    return {

        categories,
        loading,
        errors,

        fetchCategories,

    }
})
