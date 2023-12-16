import Pusher from 'pusher-js'
const pusherApi = {

    methods: {
        connect(callApi) { 
            const pusher = new Pusher('376226d34fa363ee0c8d', {
                cluster: 'ap2',
                debug:true
            });
            const channel = pusher.subscribe('fpaipl-channel');
            channel.bind('fpaipl-event', () => { 
                this.$store.dispatch(callApi);
                console.log('connected')
            });
        }
    }
}
export default pusherApi