<template>
    <div>
        <!-- ---------------------------------------- -->
        <div v-if="design === 1" class="container py-3" style="padding-bottom:100px">
            <div class="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-2">
                <div class="col" v-for="(stock, index) in stocks" :key="index">
                    <div class="card border ">
                        <router-link :to="'/CatalogDetails/' + stock.product.sid" class="text-decoration-none">
                        <!-- <router-link :to="'/ledger/' + stock.product.sid" class="text-decoration-none"> -->
                            <div class="d-flex justify-content-end p-1">
                                <Span class="border rounded-circle" :class="{ 'text-success': stock.active === true, 'text-warning': stock.active === null }"
                                    style="height: 15px; width: 15px;"></Span>
                            </div>
<!-- {{ stock.active }} -->
                            <div :id="'productImages' + index" class="carousel slide">
                                <div class="carousel-inner">
                                    <div :id="'cardCarousel' + imgIndex" class="carousel-item"
                                        :class="{ active: imgIndex === 0 }" v-for="(img, imgIndex) in stock.product.options"
                                        :key="imgIndex">
                                        <img :src="img.image" class="card-img-top rounded-0" alt=""
                                            style="height:200px;  object-fit: fill;">
                                    </div>
                                </div>
                                <div class="d-flex mt-1" id="scroll" style="overflow-x: scroll;">
                                    <button type="button" class="rounded-circle p-0 border me-1"
                                        :data-bs-target="'#productImages' + index" :data-bs-slide-to="imgIndex"
                                        :class="{ active: imgIndex === 0 }" :aria-current="imgIndex === 0 ? true : false"
                                        v-for="(img, imgIndex) in stock.product.options" :key="imgIndex">
                                        <img :src="img.image" class="" alt=""
                                            style="width: 35px; height: 35px; object-fit: fill;">
                                    </button>
                                </div>
                            </div>


                            <div class="d-flex justify-content-between p-1 mt-1 text-dark fw-bold">
                                <p class="m-0 ss" style="font-size: 0.75rem">{{ stock.product.name }} </p>
                                <p class="m-0" style="font-size: 0.75rem">{{ stock.stock }} pcs</p>
                            </div>
                        </router-link>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ---------------------------------------- -->
</template>

<script>
import pusherApi from '@/mixing/pusherApi';

export default {
    mixins: [pusherApi],
    props: ['stock', 'design'],
    data() {
        return {
            publicPath: process.env.BASE_URL,
        }
    },
    created() {
        this.connect('fetchStocks')
    },
    mounted() {
        this.$store.dispatch('fetchStocks')
    },
    computed: {
        stocks() {
            return this.$store.getters.getStocks;
        },
        // lists() {
        //     return this.$store.getters.getLists;
        // },
        getStatus() {
            
            return this.$store.getters.getStatus
        }
    },

}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
    .list {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .btnlist img {
        width: 180px;
        height: 150px;
        object-fit: fill;

        /* overflow: auto; */
    }

    .btnsar {
        margin-top: 10px;
    }
}

@media only screen and (min-width: 601px) {
    .list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

.eabtn i:hover {
    color: black;
}

.show-on-hover .soh-div {
    opacity: .75;
}

.show-on-hover:hover .soh-div {
    opacity: 1;
}

#scroll::-webkit-scrollbar {
    background-color: none;
    display: none;
}

.ss {
    width: 80px;
    /* Set the width based on your requirements */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}</style>