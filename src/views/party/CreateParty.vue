<template>
    <div class="mb-5">
        <div class="d-flex justify-content-center">
            <h5 class="" id="staticBackdropLabel">Create New Fabricator</h5>
        </div>
        <div class=" ">
            <form @submit.prevent="submitForm()">
                <ImageUploadBox @image="image"></ImageUploadBox>

                <div class="container my-2">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" placeholder="name@example.com"
                            v-model="form.Bname">
                        <label for="name">Business Name</label>
                    </div>

                    <div class="form-floating mb-3">
                        <select class="form-select" id="assignee" v-model="form.UserId">
                            <option value="" disabled>Select User by ID</option>
                            <option v-for="(user, index) in users" :key="index" :value="user.UserId">
                                {{ user.id }}
                            </option>
                        </select>
                        <label for="assignee">User Id</label>
                    </div>

                    <div class="mb-3 my-1">
                        <label class="ms-3 fs-5">Role</label>
                        <div class="d-flex justify-content-evenly w-100 container my-2">
                            <div class="form-check w-100">
                                <input class="form-check-input" type="radio" value="Fabricator" id="role-fabricator"
                                    v-model="form.tag" />
                                <label class="form-check-label" for="role-fabricator">
                                    Fabricator
                                </label>
                            </div>
                            <div class="form-check w-100">
                                <input class="form-check-input" type="radio" value="Staff" id="role-staff"
                                    v-model="form.tag" />
                                <label class="form-check-label" for="role-staff">Staff</label>
                            </div>
                            <div class="form-check w-100">
                                <input class="form-check-input" type="radio" value="Manager" id="role-manager"
                                    v-model="form.tag" />
                                <label class="form-check-label" for="role-manager">Manager</label>
                            </div>
                            <div class="form-check w-100">
                                <input class="form-check-input" type="radio" value="Supplier" id="role-supplier"
                                    v-model="form.tag" />
                                <label class="form-check-label" for="role-supplier">Supplier</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" placeholder="name@example.com" v-model="form.gst">
                        <label for="name">GST</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" placeholder="name@example.com" v-model="form.pan">
                        <label for="name">Pan</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" placeholder="name@example.com" v-model="form.info">
                        <label for="name">info</label>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ImageUploadBox from '@/components/imageBox/ImageUploadBox.vue'

export default {
    data() {
        return {
            // users: [
            //     { id: 1, UserId: 'JD123' },
            //     { id: 2, UserId: 'JS456' },
            //     { id: 3, UserId: 'BJ789' },
            //     { id: 4, UserId: 'AJ101' },
            //     { id: 5, UserId: 'CB202' },
            // ],
            form: {
                UserId: '',
                name: '',
                Bname: '',
                gst: '',
                info:'',
                pan: '',
                tag: '',
                status: '',
                parentImageUrl: '',
            }
        };
    },
    computed: {
        fabricators() {
            return this.$store.getters.getFabricator;
        },
        users() {
            return this.$store.getters.getUsers;
        }
    },
    mounted() {
        this.$store.dispatch('fetchUsers')
    },
    methods: {
        submitForm() {
            this.$store.dispatch('fetchCreateParty', this.form).then(() => {
                this.form = {
                    UserId: '',
                    name: '',
                    Bname: '',
                    gst: '',
                    pan: '',
                };
            });
        },
        image(value) {
            console.log(value)
            this.form.parentImageUrl = value
        }
    },
    components: { ImageUploadBox }
}
</script>

<style lang="scss" scoped></style>