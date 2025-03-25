<script setup>
    const props = defineProps({
        open:{
            type: Boolean,
            default : false
        },
        title : {
            type : String,
            default : ''
        },
        icon : {
            type : String,
            default : ''
        }
    })
    defineOptions({
        inheritAttrs: false
    })
</script>

<template>
    <Transition>
        <div v-if="props.open" class ='inset-0 fixed h-screen bg-color-4/30 z-10 overflow-y-auto'>
            <div  class="relative flex justify-center mt-6">
                <div class = "bg-white mx-4 max-w-full min-w-96 rounded-lg shadow-lg overflow-hidden" v-bind="$attrs">
                    <header v-if="$props.title" class="flex text-color-5 items-center justify-between py-1.5 relative px-4 bg-color-1/70">
                        <div class="flex items-center gap-x-2 text-lg">
                            <Icon v-if="props.icon" :icon="props.icon" />
                            <h1 class="font-medium tracking-tight text-center">{{ props.title }}</h1>
                        </div>
                        <slot name="close"></slot>
                    </header>
                    <section class="p-8">
                        <slot></slot>
                    </section>
                    <hr v-if="$slots.footer" class="border-t border-color-1/20">
                    <footer v-if="$slots.footer" class= "p-3 flex justify-between">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
    .v-enter-active, .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from, .v-leave-to {
        opacity: 0;
    }
</style>