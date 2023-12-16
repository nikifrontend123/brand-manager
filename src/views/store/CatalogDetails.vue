<template>
    <div class="pb-5 h-100 d-flex flex-column flex-fill">
        <div class="fs-5 d-flex justify-content-between align-items-center my-3">
            <div class="">
                <b>Status :</b> <span>{{ statusText }}</span>
            </div>
            <div class="form-check form-switch" v-if="dataSet.active !== null">
                <input class="form-check-input" :checked="active" @change="toggleStatus" type="checkbox"
                    id="flexSwitchCheckChecked">
            </div>
        </div>
        <div v-if="dataReady">
            <button class="accordion-button collapsed border p-2 rounded-top-2 my-3 bg-light" type="button">
                <div class="d-flex justify-content-between w-100">
                    <div class="d-flex">
                        <img :src="dataSet.product.image"
                            style="height: 60px; width: 60px; object-fit: cover; object-position:top;" class="rounded-2">
                        <div class="mx-2">
                            <b> {{ dataSet.product.name }}</b>
                        </div>
                    </div>
                    <div class="d-flex align-items-center ">
                        <i class="bi bi-chevron-down me-2 fs-5" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"></i>
                        <i class="bi bi-download mx-2 fs-5"></i>
                        <i class="bi bi-file-image mx-2 fs-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                    </div>
                </div>
            </button>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body p-0">
                    <div class="col-lg-7 px-3">
                        <p class="text-start mb-2 fs-5 py-1 text-muted fw-bold">
                            {{ dataSet.product.info }}
                        </p>
                        <div>
                            <div class=" w-100 d-flex  me-0">
                                <div class="col-12 text-start d-flex align-items-center justify-content-between">
                                    <div>
                                        <span class="me-2 text-dark fw-bold fs-5">₹ {{ dataSet.product.price }} / mtr</span>
                                    </div>
                                    <div>
                                        <p class="fw-bold m-0">Wholesale Price</p>
                                        <p class="fw-bold m-0">with {{ dataSet.product.moq }}/mtr MOQ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered mt-3">
                        <tbody>
                            <tr>
                                <th class="w-50 bg-light" scope="row">
                                    <p class="mb-1" style="font-size: 14px">Total Amount :</p>
                                </th>
                                <td>
                                    <p class="mb-1 text-center" style="font-size: 14px">{{ dataSet.product.total }}</p>
                                </td>

                            </tr>
                            <tr>
                                <th class="w-50 bg-light" scope="row">
                                    <p class="mb-1" style="font-size: 14px">Average Rate :</p>
                                </th>
                                <td>
                                    <p class="mb-1 text-center" style="font-size: 14px">876</p>
                                </td>

                            </tr>
                            <tr>
                                <th class="w-50 bg-light" scope="row">
                                    <p class="mb-1" style="font-size: 14px">Total Pieces :</p>
                                </th>
                                <td>
                                    <p class="mb-1 text-center" style="font-size: 14px">7655</p>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- -------------------------IMAGE-------------------- -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Catalog Image</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex">
                                <img :src="dataSet.product.image"
                                    style="height: 400px; width: 500px; object-fit: cover; object-position:top;"
                                    class="rounded-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- -------------------------IMAGE-------------------- -->
        </div>

        <div class="container my-2">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Order</th>
                        <th scope="col">Ready</th>
                        <th scope="col">Demand</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(entry, index) in ledgerEntries" :key="index" @click="showActiveEntry(entry)">
                        <td>{{ entry.date }}</td>
                        <td>{{ entry.order.toLocaleString() }}</td>
                        <td>{{ entry.ready.toLocaleString() }}</td>
                        <td>{{ entry.demand.toLocaleString() }}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{{ total('order').toLocaleString() }}</td>
                        <td>{{ total('ready').toLocaleString() }}</td>
                        <td>{{ total('demand').toLocaleString() }}</td>
                    </tr>
                </tbody>

            </table>
            <div class="my-2 top-brand p-2 d-flex justify-content-between">
                <p class="mb-0 fw-bold">Demandable Qty</p>
                <p class="mb-0">{{ calculatedDemanableQty.toLocaleString() }}</p>
            </div>
            <div class="my-2 top-brand p-2 d-flex justify-content-between">
                <p class="mb-0 fw-bold">Balance</p>
                <p class="mb-0">{{ calculatedBalance.toLocaleString() }}</p>
            </div>
        </div>

        <div v-if="Object.keys(activeEntry).length !== 0">
            <div class="custom-offcanvas-overlay" @click="hideActiveEntry()"></div>
            <div class="offcanvas offcanvas-end show" style="">

                <div class="d-flex justify-content-between align-items-center p-2 border-bottom">
                    <b class="">Details</b> <i class="bi bi-x fs-3" @click="hideActiveEntry()"></i>
                </div>
                <div class="offcanvas-body">

                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th v-if="activeEntry.order > 0" colspan="2" class="text-center">Order</th>
                                <th v-if="activeEntry.ready > 0" colspan="2" class="text-center">Ready</th>
                                <th v-if="activeEntry.demand > 0" colspan="2" class="text-center">Demand</th>
                            </tr>
                            <tr>
                                <th scope="col">Color</th>
                                <th scope="col">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(color, colorIndex) in activeEntry.color" :key="colorIndex">
                                <td><img :src="color.img" style="height: 50px;width: 50px;"></td>
                                <td>{{ color.qty }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="my-2 top-brand p-2 d-flex justify-content-between">
                        <p class="mb-0 fw-bold">Total Qty</p>
                        <p class="mb-0">{{ activeEntry.order.toLocaleString() }}</p>
                        <p v-if="activeEntry.ready > 0" class="mb-0">{{ activeEntry.ready.toLocaleString() }}</p>
                        <p v-if="activeEntry.demand > 0" class="mb-0">{{ activeEntry.demand.toLocaleString() }}</p>
                    </div>
                </div>
            </div>
        </div>


        <!-- ///////////COLLAPSE///////////// -->
        <div id="collapseExample1" class="container collapse" style="padding-bottom: 80px;" v-if="dataReady">
            <p class="m-0 fs-5 text-center bill mt-4"><span>~ Create Job Work Order ~</span></p>

            <div class="tab-content" id="myTabContent">


                <!-- -----------SMART------------------ -->
                <form @submit.prevent="postData()" method="post">
                    <div class="form-floating my-3">
                        <select class="form-select" id="floatingSelect" v-model="selectedFabricator">
                            <option v-for="fabricator in fabricators" :key="fabricator.sid" :value="fabricator.sid">
                                {{ fabricator.name }}
                            </option>
                        </select>
                        <label for="floatingSelect">Select Fabricator</label>
                    </div>

                    <div class="form-floating my-3 d-none">
                        <select class="form-select">
                            <option>{{ dataSet.product.name }}</option>
                            <!-- Add other options here if needed -->
                        </select>
                        <label for="floatingSelect">Catalog</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="floatingPassword" v-model="delivery_date">
                        <label for="floatingPassword">Select Expected Date of Delivery</label>
                    </div>

                    <div class="form-floating mb-3">
                        <textarea required class="form-control as" v-model="message" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Message</label>
                    </div>

                    <div class="form-floating my-3">
                        <input required type="number" class="form-control" id="floatingInput" v-model="quantity"
                            @input="distributeQuantityAmongColors(quantity)">
                        <label for="floatingInput">Quantity</label>
                        <p class="text-muted m-0 my-2" style="font-size: 12px;">* Total quantity will split in equal
                            propotion
                            between all sizes and colors</p>
                    </div>
                    <div class="my-3">
                        <div class="d-flex">
                            <p class="m-0 fs-5 mt-3 mb-2">Selected Colors</p>
                        </div>
                        <div class="d-flex flex-wrap gap-2 mb-2">
                            <div class="d-flex" v-for="(color, index) in dataSet.product.options" :key="index">
                                <img @click="toggleColor(color)" :src="color.image" class="rounded me-2 p-1"
                                    :style="{ border: color.isSelected ? '2px solid black' : 'none' }"
                                    style="width: 60px; height: 58px; object-fit: cover;" alt="">
                                <div class="form-floating">
                                    <input required type="number" class="form-control" :id="'colorQuantity_' + color.sid"
                                        v-model="color.quantity" @input="handleColorQuantityInput(color)" />
                                    <label :for="'colorQuantity_' + color.sid">{{ color.name }} Quantity</label>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-file-image mx-2 fs-5" data-bs-toggle="modal" data-bs-target="#colorimg"
                                        @click="showActiveImg(color)"></i>
                                </div>
                                <!-- <i class="bi bi-file-image mx-2 fs-5" ></i> -->
                            </div>
                            <div v-if="Object.keys(activeColorImg).length !== 0">
                                <div class="modal fade" id="colorimg" data-bs-backdrop="static" data-bs-keyboard="false"
                                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel">Catalog color Image</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="d-flex">
                                                    <img :src="activeColorImg.image"
                                                        style="height: 400px; width: 500px; object-fit: cover; object-position:top;"
                                                        class="rounded-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="text-muted m-0 mb-3" style="font-size: 12px;">* Deselection means you are removing all
                            sizes
                            from the order</p>
                        <div class="my-4">

                            <p class=" fs-5 bill text-center"><span>~ Actual Order Qty ~</span></p>
                            <div class="d-flex justify-content-between mb-3">

                                <div class="d-flex justify-content-between border container py-2 mx-1"
                                    style="background-color: #E8FFCE;">
                                    <p class="fw-bold text-center mb-0">{{ totalColorInputAmount }} pcs</p>
                                    <p class="mb-0">Roundoff</p>
                                </div>
                                <!-- <div class="d-flex justify-content-between border container py-2 mx-1"
                                    style="background-color: #FFE5AD;">
                                    <p class=" mb-0">Max</p>
                                    <p class=" fw-bold text-center mb-0">
                                        2538 pcs
                                    </p>
                                </div> -->
                            </div>


                        </div>

                        <div class="d-flex justify-content-center mt-3">
                            <button class="btn text-white w-100" style="background-color: #F48B29;"
                                type="submit">Submit</button>
                        </div>
                    </div>
                </form>

                <!-- -----------SMART------------------ -->


            </div>
        </div>
        <!-- ///////////COLLAPSE///////////// -->
        <div class="d-flex justify-content-center w-100 ">
            <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false"
                aria-controls="collapseExample1" class="btn  border w-100 m-2" style="background-color: #F48B29;">New
                Order</button>
            <button class="btn border w-100 m-2" style="background-color: #F48B29;">New Demand</button>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import { mapGetters } from 'vuex';
// import catalog from '@/mixing/catalog.js'
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    // mixins: [catalog],
    name: "CatalogDetails",
    data() {
        return {
            dataSet: 1,
            dataReady: false,
            fabricators: [
                { sid: 'F1', name: 'Sardar' },
            ],
            publicPath: process.env.BASE_URL,
            quantity: null,
            regular: [],
            advance: [],
            quantities: [],
            selectedFabricator: 'F1',
            selectedCatalog: null,
            delivery_date: null,
            message: null,
            active: null,

            orderQty: 0,

        };
    },
    watch: {
        'dataSet.active': {
            immediate: true, // This ensures it runs immediately on component creation
            handler(newValue) {
                if (newValue) {
                    this.active = newValue;
                }
            },
            quantity(value) {
                this.distributeQuantityAmongColors(value);
            },
        }
    },
    computed: {
        ledgerEntries() {
            return this.$store.getters.getLedgers
        },
        activeEntry() {
            return this.$store.getters.getActiveEntry
        },
        calculatedDemanableQty() {
            return this.calculateSum('ready') - this.calculateSum('demand');
        },
        calculatedBalance() {
            return this.calculateSum('order') - this.calculateSum('demand');
        },
        activeColorImg() {
            return this.$store.getters.getActiveImg
        },
        totalColorInputAmount() {
            return this.dataSet.product.options.reduce((total, color) => {
                if (color.isSelected) {
                    total += color.quantity || 0;
                }
                return total;
            }, 0);
        },

        statusText() {
            if (this.dataSet.active === true) {
                return "Live";
            } else if (this.dataSet.active === false) {
                return "Draft";
            } else {
                return "Loading..."; // You can change this to a loading message
            }
        },
        stocks() {
            return this.$store.getters.getstocks
        },
        defaultDeliveryDate() {
            const today = new Date();
            today.setDate(today.getDate() + 2);
            return today.toISOString().substr(0, 10);
        },
    },
    methods: {
        calculateSum(property) {
            let sum = 0;

            this.ledgerEntries.forEach(entry => {
                sum += entry[property] ? parseInt(entry[property]) : 0;
            });

            if (property === 'order') {
                this.orderQty = sum; // Update orderQty here
            }

            return sum;
        },
        total(property) {
            return this.calculateSum(property);
        },
        showActiveImg(color) {
            this.$store.dispatch('showActiveImg', color)
        },
        hideActiveImg(color) {
            this.$store.dispatch('hideActiveImg', color)
        },
        async toggleStatus() {
            const stockId = this.$route.params.productId;
            const url = 'http://192.168.1.133:8001/api/stocks/' + stockId;
            const newData = {
                active: this.active ? 'false' : 'true',
            };
            try {
                const response = await axios.put(url, newData);
                if (response.data.active === 'true') {
                    // Update 'active' based on the new status from the API
                    this.active = !this.active;
                } else {
                    console.error('Unexpected response:', response.data);
                    // You may want to handle errors and provide user feedback
                }
            } catch (error) {
                console.error('Error toggling status:', error);
                // You may want to handle errors and provide user feedback
            }
        },
        postData() {
            const quantitiesArray = [];

            this.dataSet.product.options.forEach((color) => {
                this.dataSet.product.ranges.forEach((size) => {
                    const key = `${color.sid}_${size.sid}`;
                    const quantityObject = {};
                    quantityObject[key] = this.advance[key] || 0;
                    quantitiesArray.push(quantityObject);
                });
            });

            const requestData = {
                product_sid: this.dataSet.product.sid,
                quantities: JSON.stringify(quantitiesArray),
                fabricator_sid: this.selectedFabricator,
                message: this.message,
                expected_at: this.delivery_date,
            };

            axios.post('http://192.168.1.133:8001/api/purchaseorders', requestData)
                .then((response) => {
                    console.log('api response', response);
                    Swal.fire({
                        title: 'Yay!',
                        text: 'Your Job Work Issued Successfully.',
                        icon: 'success',
                        confirmButtonColor: '#F48B29',
                        confirmButtonText: 'OK'
                    });
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while posting data. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        },
        toggleColor(color) {
            // Store the original isSelected status
            const wasSelected = color.isSelected;

            // Toggle the isSelected status
            color.isSelected = !color.isSelected;

            // If color was selected and is now deselected, redistribute the quantity
            if (wasSelected && !color.isSelected) {
                // Filter only the selected colors
                const selectedColors = this.dataSet.product.options.filter((c) => c.isSelected);

                // Calculate the quantity to redistribute among the remaining selected colors
                const quantityToRedistribute = color.quantity || 0;
                const remainingSelectedColors = selectedColors.length;

                // Calculate the quantity per remaining selected color
                const quantityPerColor = Math.round(quantityToRedistribute / remainingSelectedColors);

                // Distribute the quantity among the remaining selected colors
                selectedColors.forEach((selectedColor) => {
                    if (selectedColor !== color) {
                        selectedColor.quantity += quantityPerColor;
                    }
                });

                // Set the quantity of the deselected color to 0
                color.quantity = 0;

                // Handle the quantity input change for the color
                this.handleColorQuantityInput();
            }
            // If color was deselected and is now selected, reset the quantity to 1
            else if (!wasSelected && color.isSelected) {
                color.quantity = 1;
                // Handle the quantity input change for the color
                this.handleColorQuantityInput();
            }
            // If color was neither selected nor deselected, no need to redistribute
        },
        handleColorQuantityInput() {
            // Calculate the total quantity of all selected colors
            const totalSelectedColorsQuantity = this.dataSet.product.options
                .filter((c) => c.isSelected)
                .reduce((total, selectedColor) => total + (selectedColor.quantity || 0), 0);

            // Update the overall quantity
            this.quantity = totalSelectedColorsQuantity;

            // Update the roundoff display
            this.calculateAdvanceSizeTotal();
        },
        calculateRegularSizeTotal() {
            let total = 0;
            this.dataSet.product.ranges.forEach((color) => {
                const quantity = parseInt(this.regular[`0_${color.sid}`]);
                if (!isNaN(quantity)) {
                    total += quantity;
                } else {
                    total += 0;
                }
            });
            return total;
        },
        calculateAdvanceSizeTotal() {
            // Calculate the total quantity for all selected colors
            const totalQuantity = this.dataSet.product.options
                .filter((color) => color.isSelected)
                .reduce((total, color) => total + (color.quantity || 0), 0);

            // Update the roundoff display
            // You can use Math.round or any other rounding logic based on your requirement
            this.roundoff = totalQuantity;

            return this.roundoff;
        },
        distributeQuantityAmongColors(totalQuantity) {
            // Calculate the quantity per selected color
            const selectedColors = this.dataSet.product.options.filter((color) => color.isSelected);
            const quantityPerColor = Math.round(totalQuantity / selectedColors.length);

            // Distribute the quantity among selected colors
            selectedColors.forEach((color) => {
                color.quantity = quantityPerColor;
            });

            // Update the roundoff display
            this.calculateAdvanceSizeTotal();
        },
        showActiveEntry(entry) {
            this.$store.dispatch('showActiveEntry', entry)
        },
        hideActiveEntry(entry) {
            this.$store.dispatch('hideActiveEntry', entry)
        },

    },
    mounted() {
        this.delivery_date = this.defaultDeliveryDate;
        // this.selectedCatalog = this.$route.params.stockId;
        let stockId = this.$route.params.productId
        console.log(stockId)
        const token = localStorage.getItem('token')
        axios.get('http://192.168.1.133:8001/api/stocks/' + stockId, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(response => {
            if (response.data.status === 'ok') {
                this.dataSet = response.data.data
                this.dataReady = true;
                console.log(this.dataSet);
                this.dataSet.product.options.forEach((color) => {
                    color.isSelected = true;
                });

                this.dataSet.product.ranges.forEach((size) => {
                    size.isSelected = true;
                });
            } else if (response.data.status === 'error') {
                alert(response.data.message)
            } else {
                alert('Something went wrong! Please try again')
            }
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    },
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}

textarea.form-control {
    min-height: calc(7.5em + 0.75rem + calc(var(--bs-border-width) * 2));
}

.table th:first-child,
.table td:first-child {
    position: sticky;
    left: 0;
    background-color: #e8e8e8;
}

.color-selector input[type="checkbox"] {
    display: none;
}

.color-selector input[type="checkbox"]:checked+label {
    border: 2px solid #000000;
}

.nav-link {
    color: #000000;
}

.nav-tabs {
    --bs-nav-tabs-link-active-color: #F48B29;
}

.form-check-input:checked {
    background-color: green;
    border-color: green;
}
</style>