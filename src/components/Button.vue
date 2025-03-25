<script setup>
    const props = defineProps({
        text : {
            type : String,
            default : ''
        },
        icon : {
            type : String,
            default : ''
        },
        loading : {
            default : false
        }
    })

</script>

<template>
    <button class="btn relative opacity-80 hover:opacity-100 cursor-pointer shadow-sm " :class="$props.text ? ' px-4 py-2' : ' rounded-full h-8 w-8'"  :disabled="props.loading">
        <div :class="{'flex items-center justify-center gap-1.5' : $props.text }">
            <Icon v-if="props.icon && !props.loading" :icon="icon"/>
            <small v-if="$props.text">
                {{ props.loading ? 'Procesando' : props.text }}
            </small>
            <Icon v-if="props.loading" icon="fas fa-spinner" spin-pulse class="text-base text-gray-100"/>
        </div>
    </button>
</template>
