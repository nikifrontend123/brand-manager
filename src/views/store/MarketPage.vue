<template>
    <div class="container" style="padding-bottom: 120px;">
        <FabFilter></FabFilter>
        <div class="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-2 ">
            <div class="col" v-for="(list, index) in markets" :key="index">
                <div class="card border ">
                    <router-link :to="'/MarketDetails/' + list.sid" class="text-decoration-none">
                        <div :id="'productImages' + index" class="carousel slide">
                            <div class="carousel-inner">
                                <div :id="'cardCarousel' + imgIndex" class="carousel-item"
                                    :class="{ active: imgIndex === 0 }" v-for="(image, imgIndex) in list.options"
                                    :key="imgIndex">
                                    <img :src="image.image" class="card-img-top rounded-0" alt=""
                                        style="height:200px;  object-fit: fill;">
                                </div>
                            </div>
                            <div class="d-flex mt-1" id="scroll" style="overflow-x: auto;">
                                <button type="button" class="rounded-circle p-0 border me-1"
                                    :data-bs-target="'#productImages' + index" :data-bs-slide-to="imgIndex"
                                    :class="{ active: imgIndex === 0 }" :aria-current="imgIndex === 0 ? true : false"
                                    v-for="(image, imgIndex) in list.options" :key="imgIndex">
                                    <img :src="image.image" class="" alt=""
                                        style="width: 35px; height: 35px; object-fit: fill;">
                                </button>
                            </div>
                        </div>
                    </router-link>


                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 text-center w-100">
            <StoreNav></StoreNav>
        </div>
    </div>
</template>

<script>
import FabFilter from '@/components/Filter/FabFilter.vue';
import StoreNav from '@/components/Navbar/StoreNav.vue';
import pusherApi from '@/mixing/pusherApi';
export default {
    mixins: [pusherApi],
    components: {
        StoreNav,
        FabFilter
    },
    data() {
        return {
            publicPath: process.env.BASE_URL,
        }
    },
    created() {
        this.connect('fetchMarket')
    },
    mounted() {
        this.$store.dispatch('fetchMarket')
    },
    computed: {
        markets() {
            return this.$store.getters.getMarkets;
        },
    },

}

</script>

<style lang="scss" scoped></style>