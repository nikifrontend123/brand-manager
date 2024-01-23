<template>
    <div v-if="activeLedger" class="offcanvas offcanvas-bottom h-50" tabindex="-1" id="ledgerInfoModal"
        aria-labelledby="ledgerInfoModalLabel">

        <div class="offcanvas-header w-100 d-flex justify-content-between align-items-center bg-light border-bottom">
            <div class="d-flex flex-column justify-content-start align-items-start">
                <div class="text-uppercase" id="ledgerInfoModalLabel">
                    {{ activeLedger.model }} Details
                </div>
                <div v-if="activeLedger.chat">
                    <span class="small" v-if="activeLedger.chat.type === 'text' && activeLedger.chat.content">
                        {{ activeLedger.chat.content }}
                    </span>
                    <span v-else>{{ activeLedger.chat.type ? activeLedger.chat.type : 'No' }} chat</span>
                </div>
                <span class="small">{{ activeLedger.content }}</span>
            </div>
            <div class="d-flex flex-column justify-content-end align-items-end">
                <span class="">{{ activeLedger.quantity }}</span>
                <span class="small">{{ activeLedger.expected_at }}</span>
            </div>
        </div>

        <div class="offcanvas-body p-2">
            <div class="row">
                <div class="col-6" v-for="(item, itemIndex) in activeLedger.items" :key="itemIndex">
                    <div class="d-flex">
                        <img :src="item.stock_id.image" style="width: 60px; object-fit: cover;">
                        <div class="d-flex flex-column ps-2">
                            <span class="fleex-fill text-capitalize">
                                {{ item.stock_id.product_option_sid }}
                            </span>
                            <strong>{{ item.quantity }}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LedgerInfo',
    props: ['items'],
    data() {
        return {
            activeLedger: {}
        }
    },
    async mounted() {
        this.loadActiveLedger();
    },
    // watch: {
    //     ledgerItems: {
    //         immediate: true,
    //         handler(newVal, oldVal) {
    //             if (newVal && newVal.length > 0) {
    //                 console.log('Contents of this.ledgerItems:', [newVal, oldVal]);
    //             }
    //         },
    //     },
    // },
    methods: {
        loadActiveLedger() {
            const ledgerInfoModal = document.getElementById('ledgerInfoModal')
            if (ledgerInfoModal) {
                ledgerInfoModal.addEventListener('show.bs.offcanvas', event => {
                    const button = event.relatedTarget
                    const ledgermodelsid = button.getAttribute('data-bs-ledgermodelsid');
                    this.activeLedger = this.items.data.find(ledgerItem => ledgerItem.model_sid === ledgermodelsid);
                });
            }
        }
    }
}
</script>
