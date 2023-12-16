<template>
    <div class="container">
        <div class="border my-2" v-for="(fab, index) in fabricators" :key="index">
            <div class="d-flex gap-3 my-2">
                <img class="rounded-circle" :src="fab.image" style="height: 80px; width: 80px;">
                <div class="">
                    <p class="mb-0 fw-bold">{{ fab.business }}</p>
                    <p class="mb-0">Role: {{ fab.type }}</p>
                </div>
                <div class="flex-fill d-flex flex-column justify-content-between text-end px-3">
                    Active
                </div>
            </div>
        </div>
        <div class="position-fixed bottom-0 d-flex justify-content-center align-items-center my-3 w-100">
            <RouterLink to="/CreateParty">
                <button class="btn btn-primary rounded-pill " type="button">
                    Add New Party
                </button>
            </RouterLink>
        </div>




    </div>
</template>

<script>

export default {
    data() {
        return {
            form: {
                assignee_code: '',
                name: '',
                contact: '',
                email: '',
                password: '',
                role: '',
                status: '',
                parentImageUrl: '',
            }
        };
    },
    computed: {
        // fabricators() {
        //     return this.$store.getters.getFabricator;
        // },
        fabricators() {
            return this.$store.getters.getParties;
        },
    },
    methods: {
        submitForm() {
            this.$store.dispatch('addToFabricator', this.form).then(() => {
                this.form = {
                    assignee_code: '',
                    name: '',
                    contact: '',
                    email: '',
                    password: '',
                };
            });
        },
        image(value) {
            console.log(value)
            this.form.parentImageUrl = value
        }
    },
    mounted() {
        this.$store.dispatch('fetchParties')
    },

}
</script>

<style lang="scss" scoped></style>