<template> 
    <button
        id="floatingButton" 
        ref="floatingButton"
        class="btn btn-dark rounded-circle"
        @mousedown="handleMouseDown" 
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove" 
        @touchend="handleTouchEnd" 
        @click="handleButtonClick" 
        data-bs-toggle="modal"
        data-bs-target="#ledgerChatModal"
        :style="{ 
            opacity: buttonOpacity, 
            top: storedPosition.top + 'px', 
            left: storedPosition.left + 'px' 
        }"
    >
        <i class="bi bi-chat-dots fs-1"></i>
    </button> 
</template>

<script>
export default {
    data() {
        return {
            isDragging: false,
            buttonOpacity: 0.5,
            initialTouchX: 0,
            initialTouchY: 0,
            initialTop: 100,
            initialLeft: 100,
            opacityResetTimeout: null,
            storedPosition: { top: 0, left: 0 } // Default position
        };
    },
    computed: {
        collapseLeft() {
            // Calculate the left position of the collapse based on the button's position
            const buttonRect = this.$refs.floatingButton.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const collapseWidth = 150; // Adjust the width as needed

            // Calculate the left position to center the collapse on the button
            const leftPosition = buttonRect.left + buttonRect.width / 2 - collapseWidth / 2;

            // Ensure that the collapse is within the screen bounds
            return Math.min(Math.max(leftPosition, 0), screenWidth - collapseWidth);
        }
    },
    mounted() {
        const storedPosition = localStorage.getItem('floatingButtonPosition');
        if (storedPosition) {
            this.storedPosition = JSON.parse(storedPosition);
        } else {
            this.storedPosition.left = window.innerWidth * 0.8;
            this.storedPosition.top = window.innerHeight * 0.8;
        }
    },
    methods: {
        handleMouseDown(event) {
            if (event.button === 0) {
                this.handleTouchOrClick(event.clientX, event.clientY);
            }
        },
        handleTouchStart(event) {
            if (event.touches.length === 1) {
                const touch = event.touches[0];
                this.handleTouchOrClick(touch.clientX, touch.clientY);
            }
        },
        handleTouchMove(event) {
            if (event.touches.length === 1 && this.isDragging) {
                event.preventDefault();
                const touch = event.touches[0];
                this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
            }
        },
        handleTouchEnd() {
            this.handleMouseUp();
            this.opacityResetTimeout = setTimeout(() => {
                this.buttonOpacity = 0.5;
            }, 1000);
        },
        handleTouchOrClick(clientX, clientY) {
            this.buttonOpacity = 1;
            this.isDragging = true;
            this.initialTouchX = clientX;
            this.initialTouchY = clientY;
            this.initialTop = this.$refs.floatingButton.offsetTop;
            this.initialLeft = this.$refs.floatingButton.offsetLeft;

            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            document.addEventListener('mouseup', this.handleMouseUp);
            document.addEventListener('touchend', this.handleTouchEnd);
        },
        handleButtonClick() {
            if (this.isDragging) {
                return;
            }

            clearTimeout(this.opacityResetTimeout);
            this.opacityResetTimeout = setTimeout(() => {
                this.buttonOpacity = 0.5;
            }, 1000);
        },
        handleMouseMove(event) {
            const clientX = event.clientX;
            const clientY = event.clientY;
            this.handleDragging(clientX, clientY);
        },
        handleMouseUp() {
            if (this.isDragging) {
                this.isDragging = false;
                document.removeEventListener('mousemove', this.handleMouseMove);
                document.removeEventListener('touchmove', this.handleTouchMove);
                document.removeEventListener('mouseup', this.handleMouseUp);
                document.removeEventListener('touchend', this.handleTouchEnd);

                const screenWidth = window.innerWidth;

                const currentLeft = this.$refs.floatingButton.offsetLeft;

                const shouldSnapToLeft = currentLeft < screenWidth / 2;

                if (shouldSnapToLeft) {
                    this.$refs.floatingButton.style.left = 0 + 'px';
                } else {
                    this.$refs.floatingButton.style.left = screenWidth - this.$refs.floatingButton.offsetWidth + 'px';
                }

                const currentPosition = {
                    top: this.$refs.floatingButton.offsetTop,
                    left: this.$refs.floatingButton.offsetLeft
                };

                // Save the final position to local storage
                localStorage.setItem('floatingButtonPosition', JSON.stringify(currentPosition));
                // Update storedPosition for dynamic styling
                this.storedPosition = currentPosition; 
            }
        },
        handleDragging(clientX, clientY) {
            if (this.isDragging) {
                // Calculate new position
                let newTop = this.initialTop + (clientY - this.initialTouchY);
                let newLeft = this.initialLeft + (clientX - this.initialTouchX);

                // Get dimensions of the button and screen
                const buttonWidth = this.$refs.floatingButton.offsetWidth;
                const buttonHeight = this.$refs.floatingButton.offsetHeight;
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight - 60;

                // Constrain the position within the screen boundaries
                newLeft = Math.max(0, Math.min(newLeft, screenWidth - buttonWidth));
                newTop = Math.max(0, Math.min(newTop, screenHeight - buttonHeight));

                // Update the button's position
                this.$refs.floatingButton.style.top = newTop + 'px';
                this.$refs.floatingButton.style.left = newLeft + 'px';
            }
        },
    }
};
</script>
  
<style>
 #floatingButton {
     position: fixed;
     cursor: pointer;
     display: flex;
     justify-content: center;
     align-items: center;
 }
</style>
