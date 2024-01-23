<template>
    <PartiesFilter @search-update="updateSearchTerm"></PartiesFilter>
    <div class="container mb-5">
        <div class="border my-2" v-for="(fab, index) in fabricators" :key="index">
            <router-link :to="'/PartyDetails/' + fab.sid" class="text-decoration-none">
                <div class="d-flex gap-3 my-2">
                    <img class="rounded-circle" :src="fab.image" style="height: 80px; width: 80px;">
                    <div class="">
                        <p class="mb-0 fw-bold">{{ fab.user.name }}</p>
                        <p class="mb-0">Role: {{ fab.type }}</p>
                    </div>
                    <div class="flex-fill d-flex flex-column justify-content-between text-end px-3">
                        Active
                    </div>
                </div>
            </router-link>
        </div>
        <RouterLink to="/create">
            <div class=" d-flex justify-content-center w-100">
                <button class="btn btn-primary rounded-pill " type="button">
                    Add
                </button>
            </div>
        </RouterLink>


    </div>

    <div class="position-fixed bottom-0 text-center w-100">
        <StoreNav></StoreNav>
    </div>
</template>

<script>
import PartiesFilter from '@/components/Filter/PartiesFilter.vue';
import StoreNav from '@/components/Navbar/StoreNav.vue';

export default {
    components: {
        StoreNav,
        PartiesFilter
    },
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
            },
            searchTerm: ''
        };
    },
    computed: {
        fabricators() {
            return this.$store.getters.getParties;
        },
        filteredFabricators() {
            const searchTerm = this.searchTerm.toLowerCase();
            return this.fabricators.filter((fabricator) => {
                if (fabricator.tags && typeof fabricator.tags === 'string') {
                    const fabricatorTags = fabricator.tags.split(',').map(tag => tag.trim().toLowerCase());
                    return fabricatorTags.some(tag => tag.includes(searchTerm));
                }
                return false;
            });
        },
    },
    methods: {
        updateSearchTerm({ searchTerm }) {
            this.searchTerm = searchTerm;
        },
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