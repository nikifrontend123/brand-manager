<template>
    <div class="container mt-4">

        <p class=" fs-5"> Color options</p>

        <div class="my-3">
            <div class="d-flex flex-wrap gap-2 mb-2">
                <div v-for="(color, index) in list.options" :key="index">
                    <div class="d-flex flex-column">
                        <img :src="color.image" alt="">
                        <span>{{ color.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <p class=" fs-5"> Size Ranges</p>

        <div class="my-3">
            <div class="d-flex flex-wrap gap-2 mb-2">
                <div class="d-flex" v-for="(size, index) in list.ranges" :key="index">
                    {{ size.name }}
                </div>

            </div>
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
                                        <p class="mb-1" style="font-size: 14px">{{ testbtn.exists ? 'Added' : 'Removed' }}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between py-1">
            <!-- Add Button -->
            <button v-if="!testbtn.exists" class="btn w-100 p-2 top-brand" @click="postData(list)">
                Add +
            </button>
            <!-- Remove Button -->
            <button v-else class="btn w-100 p-2 btn-danger" @click="postDataDelete(list)">
                Remove
            </button>
        </div>
    </div>
</template>

<script>
import axiosinstance from '@/axiosPort';
// import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            list: '',
            added: 'add',
            testbtn: {
                exists: null
            }
        }
    },
    mounted() {
        let sid = this.$route.params.sid
        const token = localStorage.getItem('token')
        axiosinstance.get('ds/products/' + sid, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(response => {
            this.list = response.data.data
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        this.status()
    },
    methods: {
        status() {
            const sid = this.$route.params.sid
            const token = localStorage.getItem('token')
            axiosinstance.post('stocks/query', {
                query_type: 'exists',
                product_sid: sid
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(res => {
                this.testbtn = res.data.data;
            }).catch(error => {
                console.error('Error in Axios POST request:', error);
            });
        },
        postData(list) {
            const requestData = {
                product_sid: list.sid,

            };
            const token = localStorage.getItem('token')
            axiosinstance.post("stocks", requestData, {
                headers: { "Authorization": `Bearer ${token}` }

            }).then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Item added to the list successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                if (res.data.status === 'ok') {
                    this.status()
                }
            }).catch((error) => {
                console.error('Error removing from the list:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while removing from the list. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

        },
        postDataDelete(list) {
            const requestData = {
                qtype: 'delete',
            };
            const token = localStorage.getItem('token')
            axiosinstance.put("stocks/" + list.sid, requestData, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Item removed to the list successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                if (res.data.status === 'ok') {
                    this.status()
                }
            }).catch((error) => {
                console.error('Error removing from the list:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while removing from the list. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        },
        addMarketDataToList(list) {
            this.$store.dispatch('addToList', list)
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