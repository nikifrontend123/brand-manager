import axios from 'axios';
import Swal from 'sweetalert2';
const catalog = {
    mounted() {
        this.delivery_date = this.defaultDeliveryDate;
        // this.selectedCatalog = this.$route.params.stockId;
        let stockId = this.$route.params.productId
        console.log(stockId)
        axios.get('http://192.168.1.133:8001/api/stocks/' + stockId).then(response => {
            if (response.data.status === 'ok') {
                this.dataSet = response.data.data
                this.dataReady = true;
                console.log(this.dataSet);
                this.dataSet.product.options.forEach((color) => {
                    color.isSelected = true;
                });

                this.dataSet.product.ranges.forEach((size) => {
                    size.isSelected = true;
                });
            } else if (response.data.status === 'error') {
                alert(response.data.message)
            } else {
                alert('Something went wrong! Please try again')
            }
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    },

    watch: {
        // quantity(value) {
        //     this.calculateRegularAndAdvance(value);
        // },
        quantity(value) {
            this.handleColorQuantityInput(value);
        },
    },

    methods: {

        postData() {
            const quantitiesArray = [];

            this.dataSet.product.options.forEach((color) => {
                this.dataSet.product.ranges.forEach((size) => {
                    const key = `${color.sid}_${size.sid}`;
                    const quantityObject = {};
                    quantityObject[key] = this.advance[key] || 0;
                    quantitiesArray.push(quantityObject);
                });
            });

            const requestData = {
                product_sid: this.dataSet.product.sid,
                quantities: JSON.stringify(quantitiesArray),
                fabricator_sid: this.selectedFabricator,
                message: this.message,
                expected_at: this.delivery_date,
            };

            axios.post('http://192.168.1.133:8001/api/purchaseorders', requestData)
                .then((response) => {
                    console.log('api response', response);
                    Swal.fire({
                        title: 'Yay!',
                        text: 'Your Job Work Issued Successfully.',
                        icon: 'success',
                        confirmButtonColor: '#F48B29',
                        confirmButtonText: 'OK'
                    });
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while posting data. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        },
        toggleColor(color) {
            color.isSelected = !color.isSelected;

            // If color is deselected, distribute its quantity among selected colors
            if (!color.isSelected) {
                const selectedColors = this.dataSet.product.options.filter((c) => c.isSelected);
                const remainingSelectedColors = selectedColors.length - 1; // Exclude the deselected color

                // Calculate the quantity to redistribute among remaining selected colors
                const quantityToRedistribute = color.quantity || 0;
                const quantityPerColor = Math.round(quantityToRedistribute / remainingSelectedColors);

                // Distribute the quantity among remaining selected colors
                selectedColors.forEach((selectedColor) => {
                    if (selectedColor !== color) {
                        selectedColor.quantity += quantityPerColor;
                    }
                });

                // Set the quantity of the deselected color to 0
                color.quantity = 0;
            }

            // Handle the quantity input change for the color
            this.handleColorQuantityInput(color);
        },
        handleColorQuantityInput() {
            // Calculate the total quantity of all selected colors
            const totalSelectedColorsQuantity = this.dataSet.product.options
                .filter((c) => c.isSelected)
                .reduce((total, selectedColor) => total + (selectedColor.quantity || 0), 0);

            // Update the overall quantity
            this.quantity = totalSelectedColorsQuantity;

            // Update the roundoff display
            this.calculateAdvanceSizeTotal();
        },
        calculateRegularSizeTotal() {
            let total = 0;
            this.dataSet.product.ranges.forEach((color) => {
                const quantity = parseInt(this.regular[`0_${color.sid}`]);
                if (!isNaN(quantity)) {
                    total += quantity;
                } else {
                    total += 0;
                }
            });
            return total;
        },
        calculateAdvanceSizeTotal() {
            // Calculate the total quantity for all selected colors
            const totalQuantity = this.dataSet.product.options
                .filter((color) => color.isSelected)
                .reduce((total, color) => total + (color.quantity || 0), 0);

            // Update the roundoff display
            // You can use Math.round or any other rounding logic based on your requirement
            this.roundoff = totalQuantity;

            return this.roundoff;
        },

        // toggleSize(size) {
        //     size.isSelected = !size.isSelected;
        //     if (!size.isSelected) {
        //         for (const color of this.dataSet.product.options) {
        //             this.advance[`${color.sid}_${size.sid}`] = 0;
        //             this.regular[`0_${size.sid}`] = 0;
        //         }
        //     }
        //     // Recalculate the advance distribution when size selection changes
        //     this.calculateAdvanceDistribution();
        //     this.calculateRegularDistribution();
        // },
        // calculateAdvanceDistribution() {
        //     // Calculate the quantity to distribute among selected colors and sizes
        //     const selectedColors = this.dataSet.product.options.filter((color) => color.isSelected);
        //     const selectedSizes = this.dataSet.product.ranges.filter((size) => size.isSelected);
        //     const totalSelected = selectedColors.length * selectedSizes.length;

        //     if (totalSelected === 0) {
        //         // Reset all advance quantities to 0 if nothing is selected
        //         for (const color of this.dataSet.product.options) {
        //             for (const size of this.dataSet.product.ranges) {
        //                 this.advance[`${color.sid}_${size.sid}`] = 0;
        //                 this.regular[`0_${size.sid}`] = 0;
        //             }
        //         }
        //     } else {
        //         // Calculate and distribute the quantity among selected colors and sizes
        //         const quantityPerItem = Math.round(this.quantity / totalSelected);

        //         for (const color of this.dataSet.product.options) {
        //             for (const size of this.dataSet.product.ranges) {
        //                 if (color.isSelected && size.isSelected) {
        //                     this.advance[`${color.sid}_${size.sid}`] = quantityPerItem; // Remove Math.round()
        //                     this.regular[`0_${size.sid}`] = quantityPerItem; // Remove Math.round()
        //                 } else {
        //                     this.advance[`${color.sid}_${size.sid}`] = 0;
        //                     this.regular[`0_${size.sid}`] = 0;
        //                 }
        //             }
        //         }
        //     }
        // },
        // calculateRegularDistribution() {
        //     // Calculate the quantity to distribute among selected sizes
        //     const selectedSizes = this.dataSet.product.ranges.filter((size) => size.isSelected);
        //     const totalSelected = selectedSizes.length;

        //     if (totalSelected === 0) {
        //         // Reset all regular quantities to 0 if nothing is selected
        //         for (const size of this.dataSet.product.ranges) {
        //             this.regular[`0_${size.sid}`] = 0;
        //         }
        //     } else {
        //         // Calculate and distribute the quantity among selected sizes
        //         const quantityPerItem = Math.round(this.quantity / totalSelected);

        //         for (const size of this.dataSet.product.ranges) {
        //             if (size.isSelected) {
        //                 this.regular[`0_${size.sid}`] = quantityPerItem;
        //             } else {
        //                 this.regular[`0_${size.sid}`] = 0;
        //             }
        //         }
        //     }
        // },
        // calculateRegularAndAdvance(value) {
        //     const dividedValueBySizes = parseInt(value) / this.dataSet.product.ranges.length;
        //     const dividedValueByColorAndSizes = parseInt(value) / (this.dataSet.product.ranges.length * this.dataSet.product.options.length);

        //     this.dataSet.product.ranges.forEach((size) => {
        //         this.regular[`0_${size.sid}`] = Math.round(dividedValueBySizes);

        //         this.dataSet.product.options.forEach((color) => {
        //             this.advance[`${color.sid}_${size.sid}`] = Math.round(dividedValueByColorAndSizes);
        //         });
        //     });
        // },
       
        // calculateAdvanceTotal(footSizeindex) {
        //     let total = 0;

        //     for (let colorIndex = 0; colorIndex < this.dataSet.product.options.length; colorIndex++) {
        //         const color = this.dataSet.product.options[colorIndex];
        //         const size = this.dataSet.product.ranges[footSizeindex];
        //         const quantity = parseInt(this.advance[`${color.sid}_${size.sid}`]);
        //         total += isNaN(quantity) ? 0 : quantity;
        //     }

        //     return total;
        // },

    },

}
export default catalog