<template>
    <div>
        <div v-if="design === 2">
            <div class="row row-cols-3 g-2 m-2">
                <div class="col" v-for="(stk, index) in stock" :key="index">
                    <router-link :to="'/stocks/' + stk.product.sid" class="text-decoration-none">
                        <div class=" border">
                            <img :src="stk.product.image"
                                style="height: 150px; width: 100%; object-fit: cover; border-top-left-radius:2%; border-top-right-radius:2%;"
                                alt="">
                        </div>
                        <div class="d-flex justify-content-center border border-top-0">
                            <span> {{ stk.active ? 'Live' : 'Draft' }} </span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
// import pusherApi from '@/mixing/pusherApi';
export default {
    // mixins: [pusherApi],
    props: ['stock', 'design'],
    data() {
        return {
            publicPath: process.env.BASE_URL,
        }
    },
    // created() {
    //     this.connect('fetchStocks')
    // },
}
</script>
