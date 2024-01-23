<!-- Sale Card Detail -->

<template>
    <div v-if="activePurchase" class="offcanvas offcanvas-end" tabindex="-1" id="purchaseInfoModal"
        aria-labelledby="purchaseInfoModalLabel">
        <div class="offcanvas-header w-100 d-flex justify-content-between align-items-center bg-light border-bottom">
            <div class="d-flex flex-fill justify-content-start gap-2 align-items-center">
                <i class="bi bi-chevron-left" data-bs-dismiss="offcanvas" data-bs-target="#purchaseInfoModal"
                    aria-label="Close"></i>

                <div class="text-uppercase fw-bold" id="purchaseInfoModal">
                    ID: {{ activePurchase.doc_id }}
                </div>
            </div>
            <span class="fw-bold">Qty: {{ activePurchase.quantity }}</span>
        </div>

        <div class="offcanvas-body p-2">
            <div v-for="(group, groupIndex) in activePurchase.groups" :key="groupIndex" class="d-flex flex-wrap gap-2 mb-2">
                <div class="card ">
                    <div class="card-header d-flex justify-content-between">
                        <p class="fw-bold mb-1">{{ groupIndex + 1 }}. Disptached On</p>
                        <p class="mb-1">{{ group.dispatched_on }}</p>
                    </div>
                    <div v-for="(item, itemIndex) in group.items" :key="itemIndex" class="card-body d-flex w-100 my-1">
                        <img :src="item.image" class="rounded me-2" style="width: 60px; object-fit: fill;">
                        <div class="flex-fill ms-2">
                            <div class="d-flex justify-content-between">
                                <small class="my-1"><strong>Color:</strong> {{ item.option }}</small><br>
                                <small class="my-1"><strong>Size:</strong> {{ item.range }}</small>
                            </div>
                            <div class="d-flex flex-fill">
                                <div class="w-100">
                                    <p class="mb-0 text-start">
                                        Quantity
                                    </p>
                                    <span class="input-group-text rounded-0">{{ item.sent_quantity }}
                                        <span class=" ms-1 badge text-bg-dark"
                                            :class="{ 'd-none': adjustDifference(item.billed_quantity, item.sent_quantity) === '' }">
                                            {{ adjustDifference(item.billed_quantity, item.sent_quantity) }}</span>
                                    </span>
                                </div>
                                <div class="w-100">
                                    <p class="mb-0 text-center">Rate</p>
                                    <span class="input-group-text rounded-0">@{{ item.rate }}</span>
                                </div>
                                <div class="w-100">
                                    <p class="mb-0 text-end">Amount</p>
                                    <input type="text" class="form-control rounded-0" :value="item.amount.toLocaleString()"
                                        disabled>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'PurchaseCard',
    props: ['purchases'],
    data() {
        return {
            activePurchase: {}
        };
    },
    async mounted() {
        this.loadActivePurchase();
    },
    methods: {
        loadActivePurchase() {
            const purchaseInfoModal = document.getElementById('purchaseInfoModal')
            if (purchaseInfoModal) {
                purchaseInfoModal.addEventListener('show.bs.offcanvas', event => {
                    const button = event.relatedTarget
                    const purchasedocId = button.getAttribute('data-bs-purchasedocId');
                    console.log( 'testtest'+ this.activePurchase)
                    this.activePurchase = this.purchases.find(purchase => purchase.doc_id === purchasedocId);
                });
            }
        },
        adjustDifference(billedQuantity, sentQuantity) {
            const difference = billedQuantity - sentQuantity;

            if (difference > 0) {
                return `+${difference}`;
            } else if (difference < 0) {
                return `${difference}`;
            } else {
                return ''; // No difference
            }
        },
    }
}
</script>

<style lang="scss" scoped></style>