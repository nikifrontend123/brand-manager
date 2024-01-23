<template>
    <div class="modal fade" id="ledgerChatModal" tabindex="-1" aria-labelledby="ledgerChatModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header ps-0 py-1 shadow d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-start align-items-center">
                        <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <span class="modal-title" id="ledgerChatModalLabel">{{ dataset.name }}</span>
                    </div>
                    <button type="button" class="btn" @click="toggleChatOpacity">
                        <i class="bi bi-eye"></i>
                    </button>
                </div>
                <div v-if="dataset.stock" class="modal-body p-0 bg-fullscreen reversed-list"
                    :style="{ 'background-image': 'url(' + dataset.stock.product.preview + ')' }">
                    <ul class="list-group">
                        <li class="list-group-item bg-transparent border-0 py-1" v-for="(message, index) in dataset.chats"
                            :key="index">
                            <div class="d-flex flex-column text-right p-1 rounded-3"
                                style="max-width: 80%; width: fit-content;" :style="{
                                    'border-bottom-left-radius': !message.myChat ? '0 !important' : '',
                                    'border-bottom-right-radius': message.myChat ? '0 !important' : ''
                                }" :class="{
                                    'align-items-end ms-auto': message.myChat,
                                    'align-items-start': !message.myChat,
                                    [chatOpacity(message.myChat)]: true
                                }">
                                <div class="small text-bg-dark px-3 rounded-pill"> {{ message.sender_id.name }}</div>

                                <div class="px-1 rounded" :class="{ 'text-end': message.myChat, 'text-start': !message.myChat }">
                                    <span v-if="message.type === 'text'">{{ message.content }}</span>
                                    <span v-if="message.type === 'audio'">
                                        <audio :ref="`audioPlayer-${msgIndex}`" :src="message.content" controls></audio>
                                    </span>
                                    <span v-if="message.type === 'image'">
                                        <img :src="message.content" style="height: 250px; object-fit: contain;">
                                    </span>
                                    <span v-if="message.type === 'pdf'">
                                        <a :download="message.content" class="btn btn-dark" :href="message.content">Download
                                            Pdf</a>
                                    </span>
                                </div>

                                <!-- <div class="px-1 rounded" :class="{ 'text-end': message.myChat, 'text-start': !message.myChat }">
                                    {{ message.message }}</div> -->

                                <div class="ms-2 text-muted smaller">{{ formatMessageTime(message.delivered_at)
                                }}
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
                <div class="modal-footer p-0">
                    <div class="d-flex w-100 m-0 align-items-end">
                        <textarea v-model="body" rows="2" class="form-control rounded-0 flex-fill"
                            placeholder="Type your message..." required>
                        </textarea>
                        <div class="btn-group dropup h-100">
                            <!-- <button class="btn btn-secondary rounded-0" style="width: 60px; height: 60px"
                                @mousedown="toggleRecording" @mouseup="toggleRecording">
                                <div class="d-flex flex-column justify-content-center align-items-center h-100">
                                    <i v-if="!isRecording" class="bi bi-mic fs-5"></i>
                                    <i v-if="isRecording" class="bi bi-mic-fill fs-5"></i>
                                </div>
                            </button>
                            <button class="btn btn-warning" data-bs-toggle="dropdown">
                                <i class="bi bi-paperclip fs-1"></i>
                            </button> -->
                            <!-- <ul class="dropdown-menu">
                                <li class="dropdown-item border-bottom" @click="openCamera">
                                    <i class="bi bi-camera"></i>
                                    <span>Camera</span>
                                </li>
                                <li class="dropdown-item border-bottom" @click="triggerFileUpload('image')">
                                    <i class="bi bi-image"></i>
                                    <span>Image Upload</span>
                                </li>
                                <li class="dropdown-item border-bottom">
                                    <i class="bi bi-mic"></i>
                                    <span>Voice Message</span>
                                </li>
                                <li class="dropdown-item" @click="triggerFileUpload('pdf')">
                                    <i class="bi bi-file-pdf"></i>
                                    <span>Upload Pdf</span>
                                </li>
                            </ul> -->
                            <button @click="sendMessage" class="btn btn-dark rounded-0 px-3" style="width: 60px; height: 60px"><i
                                    class="bi bi-send-fill fs-4"></i></button>
                        </div>

                        <!-- <div class="" style="height: 62px; width: 62px">
                            <button @click="sendMessage" class="btn h-100 btn-dark rounded-0 px-3"><i
                                    class="bi bi-send-fill fs-4"></i></button>
                        </div> -->
                    </div>
                </div>

                <!-- <button @click="captureImage">Click</button>
                <input ref="fileInput" type="file" style="display: none" @change="previewFile" />
                <video ref="cameraVideo" style="width: 100%; max-width: 500px; margin-top: 10px;"></video> -->
                
                <!-- <div v-if="previewUrl">
                    <h4>Preview:</h4>
                    <div v-if="isImage">
                        <img :src="previewUrl" alt="Selected Image"
                            style="max-width: 100%; max-height: 200px; margin-top: 10px;" />
                    </div>
                    <div v-else>
                        <p>Selected Document: {{ fileType }}</p>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axiosPort';
import axios from 'axios';
export default {
    name: 'ChatModel',
    props: ['dataset'],
    data() {
        return {
            opacity: true,
            previewUrl: '',
            isImage: true,
            error: '',
            fileType: '',

            isRecording: false,
            audioChunks: [],
            mediaRecorder: null,
            audioPlayer: null,
            chats: [],
        }
    },
    methods: {
        toggleChatOpacity() {
            this.opacity = !this.opacity;
        },
        chatOpacity(myChat) {
            let classx = this.opacity ? 'show' : 'hide';
            if (myChat) {
                return 'my-chat-' + classx;
            } else {
                return 'other-chat-' + classx;
            }
        },
        formatMessageTime(time) {
            const options = {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const formattedTime = new Date(time).toLocaleDateString('en-US', options);
            return formattedTime;
        },
        sendMessage() {
            const token = localStorage.getItem('token');
            axiosInstance.post('chats',
                {
                    message: this.body,
                    ledger_sid: this.dataset.sid,
                }, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                console.log(res.data)
                this.body = ''
            });
        },

        
        async openCamera() {
            try {
                // Always prompt for camera permission
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                // Get the video element reference
                const videoElement = this.$refs.cameraVideo;

                // Check if the browser supports the srcObject property
                if ('srcObject' in videoElement) {
                    // Stop the current stream before assigning the new stream
                    if (videoElement.srcObject) {
                        const tracks = videoElement.srcObject.getTracks();
                        tracks.forEach((track) => track.stop());
                    }

                    videoElement.srcObject = stream;
                } else {
                    // For older browsers, use the URL.createObjectURL method
                    videoElement.src = window.URL.createObjectURL(stream);
                }
                // Play the video
                videoElement.play();
            } catch (error) {
                console.error('Error accessing camera:', error);

                this.error = 'Error accessing camera. Please check your camera permissions.';
            }
        },

        triggerFileUpload(fileType) {
            this.fileType = fileType;
            const fileInput = this.$refs.fileInput;

            if (fileInput) {
                fileInput.accept = fileType === 'image' ? 'image/*' : 'application/pdf';
                fileInput.click();
            } else {
                console.error('File input element is undefined.');
            }
        },

        captureImage() {
            const videoElement = this.$refs.cameraVideo;
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            this.previewUrl = canvas.toDataURL('image/png');
            this.fileType = 'image';
            this.stopCamera();
        },

        stopCamera() {
            const videoElement = this.$refs.cameraVideo;
            if ('srcObject' in videoElement) {
                const stream = videoElement.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                videoElement.srcObject = null;
            }
        },

        previewFile(event) {
            this.error = '';
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
                this.error = 'File must be an image or a PDF.';
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                this.error = 'File size should not exceed 5MB.';
                return;
            }
            this.isImage = file.type.startsWith('image/');
            this.fileType = this.isImage ? 'image' : 'pdf';
            this.previewUrl = URL.createObjectURL(file);
        },


        async loadAllChats() {
            await axios.get('http://192.168.1.133:8001/api/chats?ledger_sid=DG-L-0001', {
                headers: {
                    'Accept': 'application/json',
                }
            })
                .then((response) => {
                    this.chats = response.data.data
                });
        },
        toggleRecording() {
            if (this.isRecording) {
                this.stopRecording();
            } else {
                this.startRecording();
            }
        },
        startRecording() {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.audioChunks = [];

                    this.mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            this.audioChunks.push(event.data);
                        }
                    };

                    this.mediaRecorder.onstop = async () => {
                        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const formData = new FormData();
                        formData.append('audio', audioBlob, 'recording.mp3');
                        formData.append('message', 'chat audio');
                        formData.append('ledger_sid', 'DG-L-0001');

                        try {
                            const response = await axios.post('http://192.168.1.133:8001/api/chats', formData, {
                                headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' }
                            });
                            this.chats.push(response.data.data);
                            const newChatIndex = this.chats.length - 1;
                            const newAudioPlayerRef = `audioPlayer-${newChatIndex}`;
                            this.$nextTick(() => {
                                if (this.$refs[newAudioPlayerRef] && this.$refs[newAudioPlayerRef][0]) {
                                    this.$refs[newAudioPlayerRef][0].src = audioUrl;
                                }
                            });
                            this.$forceUpdate();
                            console.log('Server response:', response.data);
                        } catch (error) {
                            console.error('Error uploading file:', error);
                        }

                        this.isRecording = false;
                    };

                    this.mediaRecorder.start();
                    this.isRecording = true;
                })
                .catch((error) => {
                    console.error('Error accessing microphone:', error);
                });
        },
        stopRecording() {
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
            }
        },
    },
}
</script>

<style>
.my-chat-show {
    background-color: #83d1ba;
}

.other-chat-show {
    background-color: #ffffff;
}

.my-chat-hide {
    background-color: #20c99710;
}

.other-chat-hide {
    background-color: #dddddd10;
}

.reversed-list {
    display: flex;
    flex-direction: column-reverse;
}
</style>