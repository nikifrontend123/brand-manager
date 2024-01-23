<template>
    <div>
        <div class="container mb-2">
            <RouterLink v-if="fabParty.length === 0" to="/CreateParty">
                <button class="btn btn-warning w-100 " type="button">Create New
                    Party</button>
            </RouterLink>

            <div v-else>
                <button class="btn btn-warning w-100" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Create New
                    Ledger</button>
            </div>

            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    <div class="container">
                        <p class="m-0 fs-5 text-center bill mt-2"><span>~ Create New Ledger ~</span></p>
                        <div class="border rounded container">
                            <!-- -----------Ledger Create------------------ -->
                            <form @submit.prevent="postCreateLedger()" method="post">
                                <div class="form-floating my-3">
                                    <select class="form-select" id="floatingSelect" v-model="selectedLedgerFabricator">
                                        <option v-for="(fabricator, index) in fabParty" :key="index"
                                            :value="fabricator.sid">
                                            {{ fabricator.user.name }}
                                        </option>
                                    </select>
                                    <label for="floatingSelect" class="form-label">Select Fabricator</label>
                                </div>
                                <div class="d-flex justify-content-center mt-3">
                                    <button class="btn text-white w-100" style="background-color: #F48B29;"
                                        type="submit">Submit</button>
                                </div>
                            </form>
                            <!-- -----------Ledger Create------------------ -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>