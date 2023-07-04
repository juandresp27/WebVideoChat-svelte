<script>
	import { onDestroy, onMount } from 'svelte'
    import { socketConnection, devicesSelected } from '../../stores'
    import { goto } from '$app/navigation'
    
    import IncorrectJoinCard from '../../components/IncorrectJoinCard.svelte'
    import IncorrectRoomCard from '../../components/IncorrectRoomCard.svelte'
    import StreamsZone from '../../components/StreamsZone.svelte'
    import ControlsAcces from '../../components/ControlsAcces.svelte'
    import SettingsCard from '../../components/SettingsCard.svelte';


    /** @type {import('./$types').PageData} */
    export let data

    let usersConnected = []
    
    let socket
    let socketId

    let localStream

    let connections = []
    let remoteStreams = []
    
    let incorretJoin = false
    let incorretRoom = false

    let showSettings = true   

    let devicesSelect 
    

    const peerConnectionConfig = {
        'iceServers': [
            {'urls': 'stun:stun.services.mozilla.com'},
            {'urls': 'stun:stun.l.google.com:19302'},
        ]
    }


    const unsubscribe = socketConnection.subscribe(value => {
        socket = value
    })

    const unsubscribeDevicesSel = devicesSelected.subscribe(value => {
        devicesSelect = value
    })

    const handleLeave = () => {
        socket.emit('room:leave', data.roomId)
        goto('/')
        devicesSelected.update(()=>{
            return({
                microphoneId: '',
                videoId: '',
                speakerId: ''
            })
        })
    }

    const handleUserLeft = (socketID) => {
        remoteStreams = remoteStreams.filter(stream => stream.id !== socketID)
    }

    const handleResponse = (users) => {
        usersConnected = users
    }

    const getMyStream = async () => {
        const constraints = {
            video: {
                deviceId: {
                exact:  devicesSelect.videoId,
                },
            },
            audio: {
                deviceId: {
                exact:  devicesSelect.microphoneId,
                },
            }
        }
        try {
            if(navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(constraints)
                    localStream = stream 
                    return stream
                } catch (err) {
                    console.log(err)
                }
            }
    
        } catch (e) {
            console.log(e)
        }
        
    }


    const gotMessageFromServer = (fromId, message) => {
        
        //Parse the incoming signal
        const signal = JSON.parse(message)
        
        //Make sure it's not coming from yourself
        if(fromId !== socketId) {
            
            if(signal.sdp){            
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function() {                
                    if(signal.sdp.type == 'offer') {
                        connections[fromId].createAnswer().then(function(description){
                            connections[fromId].setLocalDescription(description).then(function() {
                                socket.emit('signal', fromId, JSON.stringify({'sdp': connections[fromId].localDescription}));
                            }).catch(e => console.log(e));        
                        }).catch(e => console.log(e));
                    }
                }).catch(e => console.log(e));
            }

            if(signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
            }                
        }
    }

    const gotRemoteStream = (event, id) => {
        remoteStreams = [...remoteStreams, {id, stream: event.stream}]
    }

    const handleUserConnected = (id, count, clients)=>{
        clients.forEach(function(socketListId) {
            if(!connections[socketListId]){
                connections[socketListId] = new RTCPeerConnection(peerConnectionConfig)

                //Add the local video stream
                connections[socketListId].addStream(localStream)  

                //Wait for their ice candidate       
                connections[socketListId].onicecandidate = function(event){
                    if(event.candidate != null) {
                        console.log('SENDING ICE')
                        socket.emit('signal', socketListId, JSON.stringify({'ice': event.candidate}))
                    }
                }                                             

                //Wait for their video stream
                connections[socketListId].onaddstream = function(event){
                    gotRemoteStream(event, socketListId)
                }    
            }
        })
        
        if(count >= 2){
            connections[id].createOffer().then(function(description){
                connections[id].setLocalDescription(description).then(function() {
                    // console.log(connections);
                    socket.emit('signal', id, JSON.stringify({'sdp': connections[id].localDescription}));
                }).catch(e => console.log(e));        
            });
        }
    }

    const handleIncorrectJoin = () => {
        incorretJoin = true
    }
    const handleIncorrectRoom = () => {
        incorretRoom = true
    }

    socketId = socket.id
    
    onMount(async() => {
        socket.emit('users:request', data.roomId)
        socket.on('join:incorrect', handleIncorrectJoin)
        socket.on('room:incorrect', handleIncorrectRoom)
        socket.on('users:response', handleResponse)
    })

    
    $: {
        if(!incorretJoin) {
            //handleSettings()
                if(devicesSelect.microphoneId !== '' && devicesSelect.videoId !== '' && devicesSelect.speakerId !== ''){
                    showSettings = false
                    getMyStream()
                        .then(stream => {
                            //localSource.srcObject = stream
                            //localSource.play()
                        })
                        .then(()=>{
                            socket.on('user:connected', handleUserConnected)
                            socket.on('signal', gotMessageFromServer)
                            socket.on('user:left', handleUserLeft)
                            
                            socket.emit('page:ready', data.roomId)
                        })
                }
            
        }
    }
    
    
    onDestroy(()=>{
        unsubscribe()
        unsubscribeDevicesSel()
        socket.off('join:incorrect',handleIncorrectJoin)
        socket.off('room:incorrect', handleIncorrectRoom)
        socket.off('users:response', handleResponse)
        socket.off('signal', gotMessageFromServer)
        socket.off('user:connected', handleUserConnected)
        socket.off('user:left', handleUserLeft)
    })

</script>


<div class="Page">

    {#if incorretRoom}
        <IncorrectRoomCard />
    {:else if incorretJoin}
        <IncorrectJoinCard />
    {:else}
        {#if showSettings}
            <SettingsCard/>
        {:else}
            <header>
                <ControlsAcces 
                    roomID={data.roomId} 
                    usersConnected={usersConnected}
                    leaveFunc={handleLeave}
                />
            </header>
            
            <main>
                <StreamsZone 
                    localStream = {localStream}
                    remoteStreams = {remoteStreams}
                />
            </main>
        {/if}
 

    {/if}

</div>




<style>
    
    header {
        position: fixed;
        top: 0;
        width: 100svw;
        background: #3c3c3c;
        padding: 0.5rem 0;
        z-index: 1;
    }


    .Page {
        max-width: 100svw;
        max-height: 100svh;
        width: 100svw;
        height: 100svh;
    }

    main {
        display: inline;
        max-height: 100svh;
        max-width: 100svw;
        padding: 0 1rem;

    }

</style>