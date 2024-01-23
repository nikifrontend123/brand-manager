<!-- sale Card --> 
<template>
    <div v-if="Object.keys(purchase).length" class="card rounded-0 mb-2">
        <div class="d-flex border-bottom">
            <div v-if="purchase.groups" class="">
                <img :src="purchase.groups[0].items[0].image[0]" alt="">
            </div>
            <div class="flex-fill d-flex flex-column justify-content-between">
                <div class="p-2 ">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-between">
                            <p class="fw-bold mb-1">Purchase Id</p>
                            <span class="ms-2">{{ purchase.doc_id }}</span>
                        </div>
                        <small class="d-flex justify-content-between">
                            <!-- <p class="fw-bold mb-1">Purchase Created At</p> -->
                            <span class="">{{ purchase.doc_date }}</span>
                        </small>
                    </div>
                    <div class="d-flex">
                        <p class="fw-bold mb-1">Quantity</p>
                        <span class="ms-2">{{ purchase.quantity.toLocaleString() }}</span>
                    </div>

                    <button class="btn btn-dark w-100" data-bs-toggle="offcanvas" data-bs-target="#purchaseInfoModal"
                        :data-bs-purchasedocId="purchase.doc_id" aria-controls="purchaseInfoModal"> Details</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PurchaseCard',
    props: ['purchase', 'purchaseIndex'],
    // computed: {
    //     items() {
    //         return this.purchase.dispatches
    //     }
    // }
}
</script>

<style lang="scss" scoped></style>