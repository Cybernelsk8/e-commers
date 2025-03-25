<script setup>
    import NavBar from '@/components/NavBar.vue';
    import Footer from '@/components/Footer.vue';
</script>

<template>
    <div class="flex flex-col min-h-screen bg-color-5/30 gap-4">
        <NavBar/>
        <div class="flex-1 max-w-7xl mx-auto p-2">
            <RouterView />
        </div>
        <Footer />
    </div>
</template>

