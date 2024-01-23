<template>
    <div>
        <div class="">
            <!-- <div class="fs-5 d-flex justify-content-between align-items-center my-3">
                <div class="">
                    <b>Status :</b> <span>{{ statusText }}</span>
                </div>
                <div class="form-check form-switch" v-if="user.active !== null">
                    <input class="form-check-input" :checked="active" @change="toggleStatus" type="checkbox"
                        id="flexSwitchCheckChecked">
                </div>
            </div> -->
            <div class="border d-flex align-items-center p-2 pb-0">
                <router-link class="btn" to="/parties">
                    <i class="bi bi-chevron-left"></i>
                </router-link>
                <img :src="user.image" alt="" style="height: 60px; width: 60px; object-fit: cover; object-position:top;">
                <div class=" ms-2">
                    <p class="m-0 fw-medium">Name : {{ user.business }}</p>
                    <p class="m-0 fw-medium"> ID : {{ user.sid }}</p>
                </div>
            </div>

        </div>
        <div class="m-2">
            <div v-if="user.stats">
                <div v-for="(stat, statIndex) in user.stats" :key="statIndex">
                    <div class="d-flex justify-content-center p-2">
                        <h2>{{ stat.title }}</h2>
                    </div>
                    <div class="row">
                        <RouterLink :to="'/stocks/' + item.product_sid + '/' + item.ledger_sid"
                            v-for="(item, itemIndex) in stat.ledgers" :key="itemIndex" class="col-6 col-lg-3 text-decoration-none">
                            <div v-if="item.name" class="card">
                                <img :src="item.image" class="card-img-top" style="max-height: 300px">
                                <div class="card-body p-2">
                                    <div class="small truncate-2">{{ item.name }}</div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <!-- <RouterLink :to="'/Catalog/' + user.sid" class="text-decoration-none">
                    <div class="col-md-3 col-lg-2 p-2 m-2 border-start border-warning border-4"
                        style="background-color: rgba(255, 179, 0, 0.3);">
                        <div class="div-box">
                            <h2>Running Order</h2>
                            <p>{{ user.stats.running }}</p>
                        </div>
                    </div>
                </RouterLink>
                <RouterLink :to="'/Catalog/' + user.sid" class="text-decoration-none">
                    <div class="col-md-3 col-lg-2 p-2 m-2 border-start border-warning border-4"
                        style="background-color: rgba(255, 179, 0, 0.3);">
                        <div class="div-box">
                            <h2>Completed Orders</h2>
                            <p>{{ user.stats.completed }}</p>
                        </div>
                    </div>
                </RouterLink> -->
            </div>
        </div>
    </div>
</template>

<script>
import axiosinstance from '@/axiosPort';
// import axios from 'axios';

export default {
    data() {
        return {
            user: {},
            fabSid: '',
            active: false,
            datass: [
                {
                    text: 'Assigned Catelogs',
                    num: '0',
                },
                {
                    text: 'Running Order',
                    num: '0',
                },
                {
                    text: 'Completed Orders',
                    num: '0',
                },

            ]
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        this.fabSid = this.$route.params.fabSid
        console.log(this.fabSid)
        axiosinstance.get('parties/' + this.fabSid, {
            headers: { "Authorization": `Bearer ${token}` },
        }).then((res) => {
            this.user = res.data.data
        })
    },
    computed: {
        statusText() {
            return this.active ? 'Active' : 'Inactive';
        },
    },
    // methods: {
    //     toggleStatus() {
    //         // Update the API endpoint with your actual API URL
    //         this.fabSid = this.$route.params.fabSid
    //         // const apiUrl = 'http://192.168.1.183:8000/api/parties/' + this.fabSid;
    //         const token = localStorage.getItem('token');
    //         // Toggle the active state
    //         this.active = !this.active;

    //         // Make API request to update the active state using Axios
    //         axiosinstance.put('parties/' + this.fabSid, { active: this.active }, {
    //             headers: { "Authorization": `Bearer ${token}` },
    //         })
    //             .then(() => {
    //                 console.log('Status updated successfully');
    //             })
    //             .catch((error) => {
    //                 console.error('Error toggling status:', error);
    //             });
    //     },
    // },
}
</script>

<style lang="scss" scoped></style>