<template>
    <div v-if="Object.keys(stock).length" class="pb-5 h-100 d-flex flex-column flex-fill">

        <div class="card rounded-0">
            <div v-if="stock && stock.product" class="d-flex justify-content-between align-items-center border-bottom">
                <div class="d-flex align-items-center w-100 gap-2">
                    <router-link class="btn" to="/stocks">
                        <i class="bi bi-chevron-left"></i>
                    </router-link>
                    <img :src="stock.product.image" data-bs-toggle="modal" data-bs-target="#imgModal" style="height: 80px">
                    <div class="flex-fill d-flex" data-bs-toggle="collapse" data-bs-target="#productinfoModal"
                        aria-expanded="false" aria-controls="productinfoModal">
                        <div class="flex-fill d-flex flex-column justify-content-evenly h-100">
                            <span class="fw-bold">
                                {{ stock.code }}
                            </span>
                            <div class="d-flex flex-column">
                                <div class="d-flex">
                                    <div class="d-flex  me-2">
                                        <span class="me-1">Stock:</span>
                                        <div v-if="stock.stock" class="d-flex">
                                            <strong>{{ stock.stock }}</strong>
                                            <span>pcs</span>
                                        </div>
                                        <span v-else>Nothing</span>
                                    </div>
                                    ||
                                    <div class="d-flex ms-2">
                                        <span class="me-1">ROQ:</span>
                                        <div v-if="stock.roq" class="d-flex">
                                            <strong>{{ stock.roq }}</strong>
                                            <span>pcs</span>
                                        </div>
                                        <span v-else>Nothing</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="d-flex me-2">
                                        <span class="me-1">Incoming:</span>
                                        <div v-if="stock.incoming" class="d-flex">
                                            <strong>{{ stock.incoming }}</strong>
                                            <span class="ps-1">pcs</span>
                                        </div>
                                        <span v-else class="fw-bold">Nothing</span>
                                    </div>
                                    ||
                                    <div class="d-flex ms-2">
                                        <span class="me-1">Outgoing:</span>
                                        <div v-if="stock.outgoing" class="d-flex">
                                            <strong>{{ stock.outgoing }}</strong>
                                            <span class="ps-1">pcs</span>
                                        </div>
                                        <span v-else class="fw-bold">Nothing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn">
                            <i class="bi bi-chevron-down"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="stock && stock.product" class="card-header rounded-0 p-0 px-2">
                <div class="d-flex justify-content-between align-items-center  ">
                    <span class="fw-bold">
                        {{ stock.product.name }}
                    </span>
                    <div class="d-flex align-items-center">
                        <div v-if="stock.active !== null">
                            <input type="checkbox" class="btn-check" id="btn-check-4" autocomplete="off"
                                :checked="stock.active" @change.prevent="updateStockStatus" />
                            <label class="btn  rounded-0 border p-2 py-2 m-0"
                                :class="{ 'btn-outline-success': stock.active, 'btn-outline-danger': !stock.active }"
                                for="btn-check-4">
                                {{ stock.active ? 'Active' : 'Inactive' }}
                            </label>
                        </div>

                        <button class="btn btn-sm btn-warning rounded-0 border" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <i class="bi bi-plus fs-5"></i>
                        </button>

                        <button class="btn btn-sm btn-warning rounded-0 border" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <i class="bi bi-file-earmark fs-5"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Info -->
        <div v-if="stock && stock.product" class="collapse" id="productinfoModal">
            <div v-if="stock.product" class="modal-body">
                <p class="text-dark mb-0 border p-1">Name: {{ stock.product.name }}</p>
                <div class="row ">
                    <div v-for="(option, optionIndex) in stock.product.options" :key="optionIndex" class="col-4">
                        <div v-for="(range, rangeIndex) in stock.product.ranges" :key="rangeIndex">
                            <div class="d-flex flex-column bg-light">
                                <img :src="option.image" class="rounded"
                                    style="height: 180px; object-fit: cover; object-position: top;">
                                <p class=" mb-0 text-center border">{{ getStockSku(option.sid,
                                    range.sid).product_option_name }}</p>
                                <p class=" mb-0 text-center border">{{ getStockSku(option.sid, range.sid).product_range_name
                                }}</p>
                                <p class=" mb-0 text-center border">{{ getStockSku(option.sid, range.sid).quantity }}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- <p class="text-dark mb-0 border p-1">Total Amount: {{ stock.product.total }}</p>
                <p class="text-dark mb-0 border p-1">Average Rate: {{ stock.ready_balance }}</p>
                <p class="text-dark mb-0 border p-1">Total Pieces: {{ stock.total_orders }}</p> -->

            </div>
        </div>

        <div v-if="stock && stock.product" class="modal fade" id="imgModal" tabindex="-1" aria-labelledby="imgModal"
            aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <button type="button" class="btn h-100 w-100 p-0" data-bs-dismiss="modal" aria-label="Close">
                    <img v-if="stock.product" :src="stock.product.preview" class="w-100" style="object-fit: cover">
                </button>
            </div>
        </div>

        <div class="collapse" id="collapseExample">
            <p class="m-0 fs-5 text-center bill mt-2"><span>~ Create New Ledger ~</span></p>
            <form @submit.prevent="postCreateLedger()" method="post" class="container">
                <div class="form-floating my-3">
                    <select class="form-select" id="floatingSelect" v-model="selectedLedgerFabricator">
                        <option v-for="(fabricator, index) in fabParty" :key="index" :value="fabricator.sid">
                            {{ fabricator.user.name }}
                        </option>
                        <option class="text-danger"><span v-if="fabParty.length === 0">There is no fabricator in this
                                list</span></option>
                    </select>
                    <label for="floatingSelect" class="form-label">Select Fabricator</label>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <button class="btn text-white w-100" style="background-color: #F48B29;" type="submit">Submit</button>
                </div>
            </form>
        </div>

        <ul class="list-group">
            <li class="list-group-item">
                <div class="d-flex justify-content-between">
                    <strong> Fabricator's Ledgers </strong>
                    <span>{{ stock.ledgers.length }}</span>
                </div>
            </li>
            <li v-for="(ledger, index) in stock.ledgers" :key=index class="list-group-item">
                <router-link :to="stock.product.sid + '/' + ledger.sid" class="text-dark text-decoration-none">
                    <div class="d-flex">
                        <img src="https://tse1.explicit.bing.net/th?id=OIP._6xhwwOYUeqJfLejYtIceAHaHa&pid=Api&P=0&h=180"
                            alt="" style="height: 60px; width: 60px; object-fit: cover; object-position:top;">
                        <div class=" ms-2">
                            <p class="m-0 fw-medium">{{ ledger.party.user.name }}</p>
                            <p class="m-0 fw-medium"> Balance : {{ ledger.balance_qty }}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script>
import axiosinstance from '@/axiosPort';
export default {
    name: "MyStockDetail",
    computed: {
        stock() {
            return this.$store.getters.getShowStock;
        },
        fabParty() {
            return this.$store.getters.getFabParties;
        },

    },
    mounted() {
        this.productSid = this.$route.params.stock_sid;
        this.$store.dispatch('fetchPartiesFab', this.productSid);
        this.$store.dispatch('fetchShowStocks', {
            stock_sid: this.$route.params.stock_sid
        })
    },
    methods: {
        getStockSku(optionSid, rangeSid) {
            return this.stock.product.stocks.find(stock => {
                return stock.product_option_sid === optionSid && stock.product_range_sid === rangeSid;
            });
        },
        updateStockStatus() {
            const token = localStorage.getItem('token')

            const newData = {
                value: !this.stock.active,
                qtype: 'toggle',
            };

            axiosinstance.put('stocks/' + this.$route.params.stock_sid, newData, {
                headers: { "Authorization": `Bearer ${token}` }
            })
        },
        postCreateLedger() {
            const creteLedger = {
                product_sid: this.$route.params.stock_sid,
                party_sid: this.selectedLedgerFabricator
            };
            this.$store.dispatch('postCreateLedger', creteLedger)
        },
    }

}
</script>
