import { writable } from 'svelte/store';
import io from 'socket.io-client'

const socket = io()
export const socketConnection = writable(socket);
export const userName = writable('');
export const  showControls = writable(false)
