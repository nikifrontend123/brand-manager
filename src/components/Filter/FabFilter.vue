<template>
    <div class="container py-3">
        <div class="d-flex">
            <div class="input-group">
                <div class="form-outline d-flex" style="border-radius: 0% !important;">
                    <input type="search" id="form1" class="form-control" placeholder="Search"
                        style="border-top-right-radius: 0px !important; border-bottom-right-radius: 0px; " />
                    <button type="button" class="btn btn-primary"
                        style="border-top-left-radius: 0% !important; border-bottom-left-radius: 0%;">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
            <div class="d-flex">
                <div class="mx-1 ms-2 btn btn-outline-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample">
                    <i class="bi bi-funnel fs-4"></i>
                </div>
                <div class="mx-1 btn btn-outline-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExampleOne"
                    aria-controls="offcanvasExampleOne">
                    <i class="bi bi-arrow-down-up fs-4"></i>
                </div>
                <slot></slot>
            </div>
        </div>



        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel"
            style="height:80vh ;">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
                <div class="d-flex">
                    <button data-bs-dismiss="offcanvas" aria-label="Close" class="btn py-2 px-4 mx-2 btn-light"
                        style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">Clear</button>
                    <button data-bs-dismiss="offcanvas" aria-label="Close" class="btn py-2 px-4 mx-2 btn-light"
                        style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">Apply</button>
                </div>

            </div>
            <div class="offcanvas-body">
                <div class="first d-flex ">
                    <TextInputs class="w-100 me-1" name="Start Date" type="date" design="floating"></TextInputs>
                    <TextInputs class="w-100 " name="End Date" type="date" design="floating"></TextInputs>
                </div>
                <select class="form-select py-3 mb-3" aria-label="Default select example">
                    <option selected>Filter By Fabricator</option>
                    <option value="1">Sardar Enterise</option>
                    <option value="2">Pride Apparel</option>
                    <option value="3">Jyoti Garments</option>
                    <option value="4">Mayra Creation</option>
                    <option value="5">Md Asad</option>
                    <option value="6">Manoj Auto</option>
                    <option value="7">Modern Collection</option>
                    <option value="8">Adnan Siddiqui</option>
                    <option value="9">Alam 4</option>
                    <option value="10">Hari Shankar Sharma</option>
                    <option value="11">Manoj Dj</option>
                </select>

                <TextInputs class="w-100" name="Filter By Colour" type="text" design="floating"></TextInputs>
                <TextInputs class="w-100" name="Filter By Fabric" type="text" design="floating"></TextInputs>
                 
            </div>
        </div>




        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasExampleOne"
            aria-labelledby="offcanvasExampleLabel" style="height: 60vh;">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Sort</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <div class="w-100">
                        <div class="d-flex flex-column" data-bs-dismiss="offcanvas">
                            <div class="d-flex justify-content-between" v-for="(paragraph, index) in paragraphs"
                                :key="index">
                                <p :style="{ color: paragraphColor(paragraph) }" @click="changeColorAndCheck(paragraph)">
                                    {{ paragraph.text }}
                                </p>
                                <p v-if="paragraph.selected" class="tick-mark"><i class="bi bi-check2"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextInputs from '../InputsType/TextInputs.vue';
export default {
    name: 'OrderFilter',
    components: { TextInputs },
    data() {
        return {
            paragraphs: [
                { text: 'By Latest Date', selected: false },
                { text: 'By Oldest Date', selected: false },
                { text: 'By Lowest Quantity', selected: false },
                { text: 'By Highest Quantity', selected: false }
            ],
            isScrollingDown: false,
            prevScrollPos: window.pageYOffset,
            suppliers: [
                { id: 1, name: 'Supplier 1 Himanshu Bakshi' },
                { id: 2, name: 'Supplier 2 Prince Jain' },
                { id: 3, name: 'Supplier 3 Ashish Agarwal' },
                { id: 4, name: 'All Suppliers' },
            ]
        }
    },
    methods: {
        selectColor(index) {
            if (this.isSelected(index)) {
                const selectedIndex = this.selectedIndexes.indexOf(index);
                this.selectedIndexes.splice(selectedIndex, 1);
            } else {
                this.selectedIndexes.push(index);
            }
        },
        isSelected(index) {
            return this.selectedIndexes.includes(index);
        },

        paragraphColor(paragraph) {
            return paragraph.selected ? 'black' : 'gray';
        },
        changeColorAndCheck(clickedParagraph) {
            for (const paragraph of this.paragraphs) {
                if (paragraph === clickedParagraph) {
                    paragraph.selected = true;
                } else {
                    paragraph.selected = false;
                }
            }
        },
    },
    computed: {
        selectedColorNames() {
            if (this.selectedIndexes.length > 0) {
                return this.selectedIndexes.map(
                    (index) => this.colors[index]
                ).join(", ");
            } else {
                return "No color selected";
            }
        },
    },
}
</script>

<style  scoped>
.selected-color {
    border: 1px solid black;
}

.container {
    transition: transform 0.3s ease-in-out;
}

.hide-on-scroll {
    transform: translateY(-200%);
}

.accordion-button:not(.collapsed) {
    background-color: #0d6efd;
    color: #ffffff;
    box-shadow: none;
}
</style>



























<!-- ------------------------------------------------------------------------------------------------------------- -->

 