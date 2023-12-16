<template>
    <div class="container mt-4">
        <div v-if="list" class="d-flex justify-content-center">
            <img :src="list.options[0].image" alt="Image" />
        </div>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button style="background-color:  rgb(244, 139, 41);" class="accordion-button text-white" type="button"
                        data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
                        aria-controls="collapseOne">
                        {{ list.name }} &nbsp; <b>{{ list.styleid }}</b>
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <table class="table table-bordered mt-3">
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <p class="mb-1" style="font-size: 14px">Start Price </p>
                                    </th>
                                    <td>
                                        <p class="mb-1" style="font-size: 14px">{{ list.start_price }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <p class="mb-1" style="font-size: 14px">End Price</p>
                                    </th>
                                    <td>
                                        <p class="mb-1" style="font-size: 14px">{{ list.end_price }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <p class="mb-1" style="font-size: 14px">Price </p>
                                    </th>
                                    <td>
                                        <p class="mb-1" style="font-size: 14px">{{ list.price }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <p class="mb-1" style="font-size: 14px">MOQ </p>
                                    </th>
                                    <td>
                                        <p class="mb-1" style="font-size: 14px">{{ list.moq }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <p class="mb-1" style="font-size: 14px">hsncode </p>
                                    </th>
                                    <td>
                                        <p class="mb-1" style="font-size: 14px">{{ list.hsncode }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <p class="mb-1" style="font-size: 14px">gstrate </p>
                                    </th>
                                    <td>
                                        <p class="mb-1" style="font-size: 14px">{{ list.gstrate }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <p class="mb-1" style="font-size: 14px">Status </p>
                                    </th>
                                    <td>
                                        <p class="mb-1" style="font-size: 14px">{{ list.addedToList ? 'Added' : '' }} </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between py-1">

            <!-- Remove Button -->
            <button v-if="added" class="btn rounded-0 w-100 p-0 btn-danger"
                @click="toggleMarketAddedToList(list); postDataDelete(list)">
                Remove
            </button>
            <!-- Add Button -->
            <button v-else class="btn w-100 top-brand" @click="toggleMarketAddedToList(list); postData(list)">
                Add +
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            list: '',
            added: false
        }
    },
    mounted() {
        let sid = this.$route.params.sid
        const token = localStorage.getItem('token')
        axios.get('http://192.168.1.133:8001/api/ds/products/' + sid ,{
            headers: { "Authorization": `Bearer ${token}` }
        }).then(response => {
            this.list = response.data.data
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // axios.get('http://192.168.1.133:8001/api/stocks/status/' + sid).then(res => {
        //     this.added = res.data.status
        // })
    },
    methods: {
        postData(list) {
            const requestData = {
                product_id: list.id,
                product_sid: list.sid,
                options: JSON.stringify(list.options),
                ranges: JSON.stringify(list.ranges),

            };
            const token = localStorage.getItem('token')
            axios.post("http://192.168.1.133:8001/api/stocks", requestData, {
                headers: { "Authorization": `Bearer ${token}` }
            });
        },
        postDataDelete(list) {
            const requestData = {
                product_sid: list.sid,
            };
            const token = localStorage.getItem('token')
            axios.post("http://192.168.1.133:8001/api/stocks/delete", requestData, {
                headers: { "Authorization": `Bearer ${token}` }
            });
        },

        addMarketDataToList(list) {
            this.$store.dispatch('addToList', list)
        },

        toggleMarketAddedToList(list) {
            if (list.addedToList) {
                // Handle removing from the list
                this.$store.dispatch('removeFromList', list)
                    .then(() => {
                        // Show success SweetAlert on successful removal
                        Swal.fire({
                            title: 'Success!',
                            text: 'Item removed from the list successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    })
                    .catch((error) => {
                        console.error('Error removing from the list:', error);

                        // Show error SweetAlert on removal error
                        Swal.fire({
                            title: 'Error!',
                            text: 'An error occurred while removing from the list. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
            } else {
                // Handle adding to the list
                this.$store.dispatch('addToList', list)
                    .then(() => {
                        // Show success SweetAlert on successful addition
                        Swal.fire({
                            title: 'Success!',
                            text: 'Item added to the list successfully.',
                            icon: 'success',
                            confirmButtonColor: '#F48B29',
                            confirmButtonText: 'OK'
                        });
                    })
                    .catch((error) => {
                        console.error('Error adding to the list:', error);

                        // Show error SweetAlert on addition error
                        Swal.fire({
                            title: 'Error!',
                            text: 'An error occurred while adding to the list. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
            }
            list.addedToList = !list.addedToList;
        },

    }
}
</script>

<style lang="scss" scoped>
.top-brand {
    background-color: #F48B29;
    color: white;
    --bs-btn-hover-border-color: none !important;
}
</style>