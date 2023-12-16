<template>
    <div>
        <!-- Install Prompt -->
        <div v-if="showInstallPopup" class="install-popup">
            <div class="install-popup-content">
                <p>Do you want to install this app?</p>
                <button class="btn btn-outline-dark" @click="installApp">Install</button>
                <button class="btn btn-outline-dark" @click="dismissInstall">Dismiss</button>
            </div>
        </div>

        <!-- Custom Notification Prompt -->
        <div v-if="showNotificationPopup" class="notification-popup">
            <div class="notification-popup-content">
                <p>Do you want to receive notifications?</p>
                <button class="btn btn-outline-dark" @click="allowNotifications">Allow</button>
                <button class="btn btn-outline-dark" @click="dismissNotification">Deny</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'InstallPrompt',
    data() {
        return {
            deferredPrompt: null,
            showInstallButton: false,
            showInstallPopup: false,
            showNotificationPopup: false,
        };
    },
    created() {
        window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
    },
    unmounted() {
        window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
    },
    mounted() {
        // this.checkNotificationPermission();
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://pwanew.clobug.co.in/api/user', {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((response) => {
                this.users = response.data
                console.log(response.data)
            })
                .catch((error) => {
                    console.error(error)
                })
        }

    },
    methods: {
        handleInstallPrompt(event) {
            event.preventDefault();
            this.deferredPrompt = event;
            this.showInstallAlert();
        },
        showInstallAlert() {
            if (this.deferredPrompt) {
                this.showInstallPopup = true;
            } else {
                console.log("Install prompt not available.");
            }
        },
        installApp() {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                    this.showInstallPopup = false;
                    // Show custom notification prompt
                    this.showNotificationAlert();
                } else {
                    console.log("User dismissed the install prompt");
                    this.showInstallPopup = false;
                }
                this.deferredPrompt = null;
            });
        },
        dismissInstall() {
            this.showInstallPopup = false;
        },
        showNotificationAlert() {
            this.showNotificationPopup = true;
        },
        allowNotifications() {
            this.showNotificationPopup = false;
            // Show the default browser notification prompt
            this.subscribeForNotifications();
        },
        subscribeForNotifications() {
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                navigator.serviceWorker.ready
                    .then((registration) => {
                        const subscribeOptions = {
                            userVisibleOnly: true,
                            applicationServerKey: "BHaGoupz6SaaiUM6EOTtsVSVjAklaOV3Y4lmexYmEV7XwDDiA4LkPLfqmvpaF4FcyyHEZ2LvLQUp9sHpuW0K96s"
                        };
                        return registration.pushManager.subscribe(subscribeOptions);
                    })
                    .then((pushSubscription) => {
                        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
                        const { keys, endpoint } = pushSubscription.toJSON();
                        localStorage.setItem('p256dhKey', keys.p256dh);
                        localStorage.setItem('authKey', keys.auth);
                        localStorage.setItem('endpoint', endpoint);
                        console.log('Stored p256dhKey in localStorage:', keys.p256dh);
                        console.log('Stored authKey in localStorage:', keys.auth);
                    })
                    .catch((error) => {
                        console.error('Error subscribing for notifications:', error);
                    });
            } else {
                console.warn('Push notifications are not supported in this browser.');
            }
        },
        dismissNotification() {
            this.showNotificationPopup = false;
        },
        getNoti() {
            const token = localStorage.getItem('token');
            const keys = {
                "auth": localStorage.getItem('authKey'),
                "p256dh": localStorage.getItem('p256dhKey')
            };
            const data = {
                endpoint: localStorage.getItem('endpoint'),
                keys
            };
            const config = {
                headers: { "Authorization": `Bearer ${token}` }
            };
            axios.post('https://pwanew.clobug.co.in/api/push_store', data, config)
                .then((response) => {
                    console.log('data sent', response);
                })
                .catch((error) => {
                    console.error('error sending data', error);
                });
        },
    }
}
</script>

<style scoped>
.install-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e14e5f;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.5s ease-in-out
}

.install-popup-content {
    text-align: center;
}

.install-popup button {
    margin: 10px;
    padding: 8px 16px;
    cursor: pointer;
}

.notification-popup {
    /* Customize the styles for the notification popup */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #5fcce1;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.5s ease-in-out;
}

.notification-popup-content {
    text-align: center;
}

.notification-popup button {
    margin: 10px;
    padding: 8px 16px;
    cursor: pointer;
}

@keyframes slideIn {
    from {
        transform: translate(-50%, -70%);
        opacity: 0;
    }

    to {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}
</style>