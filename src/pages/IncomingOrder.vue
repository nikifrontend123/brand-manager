<template>
    <div class=" mb-5">
        <IncomingFilter :fabricators="fabricators" @search-update="updateSearchTerm" @filtersChanged="handleFiltersChanged">
        </IncomingFilter>
        <div v-if="filteredDispatches.length === 0">
            <p class="text-muted text-center bg-light my-2">There is no product in dispatch.</p>
        </div>
        <div v-else class="">
            <div v-for="(dispatch, dispatchIndex) in filteredDispatches" :key="dispatchIndex" class="my-2">
                <div class="d-flex border-bottom">
                    <img v-if="dispatch.items && dispatch.items.length" :src="dispatch.items[0].stock.image"
                        class="border-end" style=" width: 80px; object-fit: fill;">
                    <div v-if="dispatch.items" class="flex-fill d-flex flex-column justify-content-between">
                        <div class="p-2">
                            <div class="d-flex justify-content-between">
                                <small class="">{{ dispatch.sid }}</small>
                                <small class="">{{ dispatch.quantity }}</small>
                            </div>
                            <small>{{ dispatch.name }}</small>
                        </div>
                        <div v-if="dispatch.status === 'pending'" class="d-flex justify-content-between" role="group">
                            <button type="button" data-bs-toggle="collapse"
                                :data-bs-target="'#DispatchDetails' + dispatchIndex" aria-expanded="false"
                                :aria-controls="'collapseExample' + dispatchIndex"
                                class="btn btn-dark rounded-0 mx-1 w-100">
                                Detail
                            </button>
                            <div
                                class="w-100 d-flex bg-success justify-content-center align-items-center text-white mx-1 rounded-0">
                                {{ dispatch.status }}
                            </div>
                        </div>
                        <div v-else-if="dispatch.status === 'received'">
                            <button type="button" data-bs-toggle="collapse"
                                :data-bs-target="'#DispatchDetails' + dispatchIndex" aria-expanded="false"
                                :aria-controls="'collapseExample' + dispatchIndex"
                                class="btn btn-dark rounded-0 mx-1 w-100">
                                Detail
                            </button>
                        </div>
                    </div>
                </div>

                <div class="collapse" :id="'DispatchDetails' + dispatchIndex">
                    <div class="card card-body">
                        <form @submit.prevent="postDispatch(dispatch)" method="post">
                            <div class="card">
                                <div v-for="(dcolor, itemIndex) in dispatch.items" :key="itemIndex"
                                    class="card-body border-bottom">
                                    <div class="d-flex align-items-center gap-3">
                                        <img :src="dcolor.stock.image" style="width: 50px; object-fit: fill;">
                                        <div class="flex-fill w-100">
                                            <p class="mb-0 ms-1"> {{ dcolor.stock.option_name }}</p>
                                            <div class="input-group d-flex w-100 mt-2">
                                                <span class="input-group-text text-bold">{{
                                                    dcolor.sent_quantity }}
                                                    pcs</span>
                                                <input v-model="dcolor.billed_quantity" type="number"
                                                    class="form-control flex-fill" placeholder="Quantity"
                                                    aria-label="Quantity" :max="Math.round(dcolor.max_quantity)"
                                                    :min="Math.round(dcolor.min_quantity)" aria-describedby="basic-addon1">
                                                <span class="input-group-text text-bold">{{
                                                    dcolor.tolerance }}
                                                    %</span>
                                            </div>
                                            <small v-if="dcolor.error" class="text-danger p-2">{{ dcolor.error }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body p-2">
                                <div v-for="(chat, chatIndex) in dispatch.note" :key="chatIndex"
                                    class="p-2 alert alert-primary my-1 d-flex">
                                    <span class="fw-bold w-50">Dispatch Note:-</span>
                                    <p class="mb-0 text-start w-100">{{ chat.message }}</p>
                                </div>
                                <div class="my-1">
                                    <label for="floatingTextarea" class="fw-bold">Reason</label>
                                    <textarea class="form-control as" v-model="message" id="floatingTextarea"
                                        placeholder="Enter Reject Reason Or Accept Condition"></textarea>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="mb-3">
                                    <label for="invoiceDate" class="form-label">Invoice Date:</label>
                                    <input type="date" id="invoiceDate" class="form-control" v-model="invoiceDate" />
                                </div>
                                <div class="mb-3 ms-3">
                                    <label for="invoiceId" class="form-label">Invoice ID:</label>
                                    <input type="text" id="invoiceId" class="form-control" v-model="invoiceId" />
                                </div>
                            </div>
                            <div v-if="dispatch.status === 'pending'" class="btn-group d-flex">
                                <button type="submit" class="btn btn-success rounded-0">Accept</button>
                            </div>
                            <div v-else-if="dispatch.status === 'received'">
                                <div class=" text-center text-white p-2 bg-secondary  w-100">
                                    Order is Accepted
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="position-fixed bottom-0 text-center w-100">
            <StoreNav></StoreNav>
        </div>
    </div>
</template>

<script>
import IncomingFilter from '@/components/Filter/IncomingFilter.vue';
import StoreNav from '@/components/Navbar/StoreNav.vue';
export default {
    components: {
        StoreNav,
        IncomingFilter
    },
    data() {
        return {
            quantity: null,
            message: '',
            invoiceDate: null,
            invoiceId: '',
            error: null,
            searchTerm: '',
            selectedFabricator: ''
        };
    },
    mounted() {
        this.invoiceDate = this.formattedToday;
        this.$store.dispatch('fetchDispatch');
    },
    computed: {
        fabricators() {
            const uniqueFabricators = new Set();

            if (this.dispatches) {
                this.dispatches.forEach(dispatch => {
                    const assignedParties = dispatch.party || [];

                    if (Array.isArray(assignedParties)) {
                        assignedParties.forEach(party => {
                            if (party.name) {
                                uniqueFabricators.add(party.name);
                            }
                        });
                    } else {
                        if (assignedParties.name) {
                            uniqueFabricators.add(assignedParties.name);
                        }
                    }
                });
            }

            return Array.from(uniqueFabricators);
        },
        filteredDispatches() {
            let dispatches = this.dispatches;

            const searchTerm = this.searchTerm;
            const selectedFabricator = this.selectedFabricator;

            dispatches = dispatches.filter((dispatch) => { 
                if (selectedFabricator && selectedFabricator !== '') {
                    const assignedParties = dispatch.party || [];
                    const fabricatorNames = Array.isArray(assignedParties)
                        ? assignedParties.map(party => party.name)
                        : [assignedParties.name];

                    if (!fabricatorNames.includes(selectedFabricator)) {
                        return false;
                    }
                }
 
                const dispatchTags = dispatch.tags.split(',').map(tag => tag.trim().toLowerCase());
                const isMatch = dispatchTags.some(tag => tag.includes(searchTerm));
                return isMatch;
            });

            return dispatches;
        },
        formattedToday() {
            const today = new Date().toISOString().split('T')[0];
            return today;
        },
        dispatches() {
            return this.$store.getters.getDispatches
        }
    },
    methods: {
        handleFiltersChanged({ fabricator, searchTerm }) {
            this.selectedFabricator = fabricator;
            this.searchTerm = searchTerm;
        },
        updateSearchTerm({ searchTerm }) {
            this.searchTerm = searchTerm;
        },
        postDispatch(dispatch) {
            if (dispatch && dispatch.items) {
                const quantities = dispatch.stock.product.options.map(color => {
                    return dispatch.stock.product.ranges.map(size => {
                        const key = `${color.sid}_${size.sid}`;
                        const value = dispatch.items.reduce((cvalue, item) => {
                            if (item.stock.option_name === color.name) {
                                cvalue += item.billed_quantity;
                            }
                            return cvalue;
                        }, 0);
                        return { [key]: value };
                    });
                }).flat();
                console.log('test', quantities);

                const postData = {
                    content: this.message,
                    ledger_sid: dispatch.id,
                    quantities: JSON.stringify(quantities),
                    doc_id: this.invoiceId,
                    doc_date: this.invoiceDate,
                    dispatch_id: dispatch.sid
                };
                this.$store.dispatch('postDispatch', postData)
            } else {
                console.error("Invalid dispatch object:", dispatch);
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>

 