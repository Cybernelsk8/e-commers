import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
    
    function manejarError(error) {
        if (error.response) {

            const { status, data } = error.response
    
            if (status === 422) {
                setAlert(data.message,'danger','ERROR DE VALIDACIÓN')
                console.error('Error de validación:', data.errors)
            } else if (status === 401) {
                setAlert(data.message,'danger','NO AUTORIZADO')
                console.error('No autorizado:', data.message)
            } else if (status === 404) {
                setAlert(data.message,'danger','RECURSO NO ENCONTRADO')
                console.error('Recurso no encontrado:', data.message)
            } else if (status >= 500) {
                setAlert(data.message,'danger','ERROR DEL SERVIDOR')
                console.error('Error del servidor:', data.message)
            }
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request)
        } else {
            console.error('Error en la solicitud:', error.message)
        }
    }


    return {
        manejarError,
    }
})
