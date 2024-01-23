<template>
    <div>
        <PurchaseFilter @search-update="updateSearchTerm"></PurchaseFilter>
        <div v-for="(purchase, purchaseIndex) in filteredPurchase" :key="purchaseIndex">
            <div v-if="Object.keys(purchases).length === 0">
                <p class="text-muted text-center bg-light my-2">There is no product in Purchase.</p>
            </div>
            <div v-else class="pb-5">
                <PurchaseCard :purchase="purchase" :purchaseIndex="purchaseIndex"></PurchaseCard>
            </div>
        </div>
        <PurchaseCardDetail :purchases="purchases"></PurchaseCardDetail>
    </div>
</template>

<script>
import PurchaseFilter from '@/components/Filter/PurchaseFilter.vue';
import PurchaseCard from '@/components/PurchaseCard.vue';
import PurchaseCardDetail from '@/components/PurchaseCardDetail.vue';

export default {
    name: 'PurchasePage',
    components: { PurchaseCard, PurchaseCardDetail, PurchaseFilter },
    data() {
        return {
            searchTerm: '',
        }
    },
    mounted() {
        this.$store.dispatch('fetchPurchase');
    },
    computed: {
        purchases() {
            return this.$store.getters.getPurchases;
        },
        filteredPurchase() {
            let purchases = this.purchases;

            const searchTerm = this.searchTerm; 
            purchases = purchases.filter((dispatch) => { 
                const dispatchTags = dispatch.tags.split(',').map(tag => tag.trim().toLowerCase());
                const isMatch = dispatchTags.some(tag => tag.includes(searchTerm));
                return isMatch;
            });
            return purchases;
        },
    },
    methods: {
        updateSearchTerm({ searchTerm }) {
            this.searchTerm = searchTerm;
        },
    }
}
</script>

<style lang="scss" scoped></style>