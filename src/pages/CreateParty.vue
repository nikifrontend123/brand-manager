<template>
    <div class="mb-5">
        <div class="d-flex justify-content-center">
            <h5 class="" id="staticBackdropLabel">Create New Fabricator</h5>
        </div>
        <div class=" ">
            <form @submit.prevent="submitForm()">
                <ImageUploadBox @fileSelected="handleFile"></ImageUploadBox>

                <div class="container my-2">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" placeholder="name@example.com"
                            v-model="form.Bname">
                        <label for="name">Business Name</label>
                    </div>

                    <div class="form-floating mb-3">
                        <select class="form-select" id="assignee" v-model="form.UserId">
                            <option value="" disabled>Select User by Name</option>
                            <option v-for="(user, index) in users" :key="index" :value="user.id">
                                {{ user.name }}
                            </option>
                        </select>
                        <label for="assignee">User Name</label>
                    </div>

                    <div class="mb-3 my-1">
                        <label class="ms-3 fs-5">Role</label>
                        <div class="d-flex justify-content-evenly w-100 container my-2">
                            <div class="form-check w-100">
                                <input class="form-check-input" type="radio" value="fabricator" id="role-fabricator"
                                    v-model="form.tag" />
                                <label class="form-check-label" for="role-fabricator">
                                    fabricator
                                </label>
                            </div>
                            <div class="form-check w-100">
                                <input class="form-check-input" type="radio" value="staff" id="role-staff"
                                    v-model="form.tag" />
                                <label class="form-check-label" for="role-staff">staff</label>
                            </div>
                            <div class="form-check w-100">
                                <input class="form-check-input" type="radio" value="manager" id="role-manager"
                                    v-model="form.tag" />
                                <label class="form-check-label" for="role-manager">manager</label>
                            </div>
                            <!-- <div class="form-check w-100">
                                <input class="form-check-input" type="radio" value="Supplier" id="role-supplier"
                                    v-model="form.tag" />
                                <label class="form-check-label" for="role-supplier">Supplier</label>
                            </div> -->
                        </div>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" placeholder="name@example.com" v-model="form.sid">
                        <label for="name">sid</label>
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
                        <input type="text" class="form-control" id="name" placeholder="name@example.com"
                            v-model="form.info">
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
import axiosinstance from '@/axiosPort'
export default {
    data() {
        return {
            form: {
                UserId: '',
                name: '',
                Bname: '',
                gst: '',
                info: '',
                pan: '',
                tag: '',
                status: '',
                parentImageUrl: '',
                sid:''
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
            const formData = {
                user_id: this.form.UserId,
                type: this.form.tag,
                info: this.form.info,
                image: this.form.parentImageUrl,
                sid: this.form.sid
            };
            const token = localStorage.getItem('token')
            axiosinstance.post('parties', formData, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(response => {
                console.log(response)
                this.form = {
                    UserId: '',
                    name: '',
                    Bname: '',
                    gst: '',
                    pan: '',
                };
            })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        handleFile(value) {
            console.log('handle');
            console.log(value)
            this.form.parentImageUrl = value
        }
    },
    components: { ImageUploadBox }
}
</script>

<style lang="scss" scoped></style>