<template>
    <div class="mb-3">
        <div v-if="design === 'floating'" class="form-floating ">
            <input   @input="$emit('update:modelValue', $event.target.value)"  :value="modelValue" :type="type" :name="name" class="form-control " id="floatingInput" :placeholder="name" required>
            <label for="floatingInput">{{ name }}</label>
        </div>

        <div v-else-if="design === 'inline'" class="row">
            <div class="col-3">{{ name }}</div>
            <div class="col-6">
                <input  @input="$emit('update:modelValue', $event.target.value)"  :value="modelValue" :type="type" :name="name" class="col-6 form-control" style="width: fit-content;" id="floatingInput1"
                    :placeholder="name" required>
            </div>
        </div>
        <div v-else-if="design === 'colour'" class="row" style="background-color: red;">
            <div class="col-3">{{ name }}</div>
            <div class="col-6">
                <input  @input="$emit('update:modelValue', $event.target.value)"  :value="modelValue" :type="type" :name="name" class="col-6 form-control" style="width: fit-content;" id="floatingInput2"
                    :placeholder="placeholder" required>
            </div>
        </div>
        <!-- this is default -->
        <div v-else>
            <label for="exampleFormControlInput1" class="form-label">{{ name }}</label>
            <input  @input="$emit('update:modelValue', $event.target.value)"  :value="modelValue" :type="type" :name="name" class="form-control" id="exampleFormControlInput1" :placeholder="placeholder" 
                required>
        </div>
    </div>
</template>
<script> 
export default {
    name: 'TextInput',
    props: ['name', 'type', 'design', 'modelValue', 'placeholder', ],
    
    // mounted(){
    //     console.log(this.floating)
    // }
}
</script>
<style scoped>
*{
    color: #000;
}
</style>