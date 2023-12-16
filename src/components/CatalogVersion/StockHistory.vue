<template>
    <div>
        <div v-for="(data, index) in datas" :key="index" class="d-flex justify-content-between align-items-center my-2 border-bottom pb-2 px-2">
            <div class="d-flex align-items-center">
                <div class="rounded-circle border text-center  d-flex justify-content-center align-items-center"
                    style="width: 60px; height: 60px;">
                    <span>{{data.date}}</span>
                </div>
                <div class="ms-2 d-flex flex-column justify-content-center">
                    <b class="fs-5">{{data.name}}</b>
                    <p class="mb-0">{{data.status}}</p>
                </div>
            </div>
            <div>
                <span class="text-danger fs-5" :class="data.textcolor">{{data.amount}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            datas: [
                {
                    id: 1,
                    date: '14/09',
                    name: 'Party Name',
                    status: 'Purhase Return',
                    amount: 900,
                    textcolor:'text-dark'
                },
                {
                    id: 2,
                    date: '14/09',
                    name: 'Party Name',
                    status: 'Sale',
                    amount: '(600)',
                    textcolor:'text-danger'
                },
                {
                    id: 3,
                    date: '14/09',
                    name: 'Party Name',
                    status: 'Purhase ',
                    amount: 2000,
                    textcolor:'text-dark'
                },
            ]
        }
    }

}
</script>

<style lang="scss" scoped></style>