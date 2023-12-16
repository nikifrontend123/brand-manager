<template>
    <div>
        <div v-if="design === 2">
            <div class="row row-cols-3 g-2 m-2">
                <div class="col" v-for="(list, index) in lists" :key="index">
                    <router-link :to="'/CatalogDetails/' + list.product.sid" class="text-decoration-none">
                        <div class=" border">
                            <img :src="list.product.image"
                                style="height: 150px; width: 100%; object-fit: cover; border-top-left-radius:2%; border-top-right-radius:2%;"
                                alt="">
                        </div>
                        <div class="d-flex justify-content-center border border-top-0">
                            <Span>{{ getStatus }}</Span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import pusherApi from '@/mixing/pusherApi';
export default {
    mixins: [pusherApi],
    props: ['design'],
    data() {
        return {
            publicPath: process.env.BASE_URL,
        }
    },
    mounted() {
        this.$store.dispatch('fetchStocks')
    },
    created(){
        this.connect('fetchStocks')
    },
    computed: {
        lists() {
            return this.$store.getters.getStocks;
        },
        // lists() {
        //     return this.$store.getters.getLists;
        // },
        getStatus() {
            return this.$store.getters.getStatus
        }
    },
    methods: {
        // showCatelog(catelog) {
        //     return this.$store.dispatch('selectCatelog', catelog);
        // },
        // hideCatelog() {
        //     return this.$store.dispatch('hideCatelog');
        // }

    }

}
</script>
