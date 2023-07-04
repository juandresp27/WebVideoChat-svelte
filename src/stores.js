import { writable } from 'svelte/store';
//import io from 'socket.io-client'

//const socket = io()
export const socketConnection = writable();
export const userName = writable('');
export const showControls = writable(false)
export const showSettings = writable(false)
export const devicesSelected = writable({
    microphoneId: '',
    videoId: '',
    speakerId: ''
})
