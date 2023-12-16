<template>
    <div>
        <div v-if="design === 3">
            <div v-for="(list, index) in lists" :key="index">
                <router-link :to="'/CatalogDetails/' + list.product.sid" class="text-decoration-none text-dark">
                    <div class="d-flex justify-content-between px-2 py-3 border-top">
                        <div class="d-flex">
                            <img :src="list.product.image"
                                class="rounded-circle border border-1 d-flex justify-content-center align-items-center"
                                style="height:60px; width:60px;object-fit: fill;">
                            <div class="d-flex flex-column  justify-content-center">
                                <span class="fw-bold mx-2 fs-5 ss">{{ list.product.name }}</span>
                                <span class="mx-2">Stock : {{ list.stock }} pcs</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <Span>{{ getStatus }}</Span>
                        </div>
                    </div>
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>
import pusherApi from '@/mixing/pusherApi';
export default {
    mixins:[pusherApi],
    props: ['design'],
    data() {
        return {
            publicPath: process.env.BASE_URL,
        }
    },
    created(){
        this.connect('fetchStocks')
    },
    mounted() {
        this.$store.dispatch('fetchStocks')
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


}
</script>
<style scoped>
.ss {
    width: 200px; /* Set the width based on your requirements */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>