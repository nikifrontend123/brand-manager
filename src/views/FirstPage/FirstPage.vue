<template>
    <InstallPrompt></InstallPrompt>
    <div class="d-flex flex-column justify-content-around align-items-center"
        style="height:100vh;background: linear-gradient(113deg, #F48B29 31%, #eca25d 97%);">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <img :src="logo" class="d-md-none" style="width: 75vw; object-fit: contain;grey">
            <img :src="logo" class="d-md-block d-none" style="width: 20vw; object-fit: contain;grey">
            <p class="my-4 m-0 fw-bold text-white text-center icon">Brand App</p>
        </div>
        <!-- <router-link to="/login-page" class="text-white text-decoration-none fs-4">
            Get Started
        </router-link> -->
        <router-link to="/login" class="text-white text-decoration-none fs-4">
            Get Started
        </router-link>
        <!-- <router-link to="/dashboard" class="text-white text-decoration-none fs-4"> -->
        Home
        <!-- </router-link> -->
    </div>
</template>

<script>

import InstallPrompt from '@/components/InstallPrompt.vue';

export default {
    name: 'RootPage',
    components: { InstallPrompt },
    data() {
        return {
            logo: 'img/logo/logo.png',
            suppliersList: null,
            selectedSupplier: null
        }
    },

}
</script>

<style lang="scss" scoped>
.icon {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 2rem;
}
</style>