<script>
	import { onDestroy, onMount } from 'svelte'
    import { socketConnection, showControls } from '../../stores'
    import { goto } from '$app/navigation'
    
    import IncorrectJoinCard from '../../components/IncorrectJoinCard.svelte'
    import IncorrectRoomCard from '../../components/IncorrectRoomCard.svelte'
    import UsersConnected from '../../components/UsersConnected.svelte'
    import ShareRoom from '../../components/ShareRoom.svelte'
    import StreamsZone from '../../components/StreamsZone.svelte'
    import Controls from '../../components/Controls.svelte'

    import People from '../../assets/People.svelte'
    import PeopleFill from '../../assets/PeopleFill.svelte'
    import Share from '../../assets/Share.svelte'
    import ShareFill from '../../assets/ShareFill.svelte'
    

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

    $: console.log(connections)

    $: console.log(remoteStreams)

    let showUsers = false
    let showRoomID = false
    let controlsToggler

    const peerConnectionConfig = {
        'iceServers': [
            {'urls': 'stun:stun.services.mozilla.com'},
            {'urls': 'stun:stun.l.google.com:19302'},
        ]
    }
    const constraints = {
        video: true,
        audio: true,
    }

    const unsubscribe = socketConnection.subscribe(value => {
        socket = value
    })

    const unsubscribeControls = showControls.subscribe(value => {
        controlsToggler = value
    })

    const handleLeave = () => {
        socket.emit('room:leave', data.roomId)
        goto('/')
    }

    const handleUserLeft = (socketID) => {
        remoteStreams = remoteStreams.filter(stream => stream.id !== socketID)
    }

    const handleResponse = (users) => {
        usersConnected = users
    }

 
    const getMyStream = async () => {
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
            alert('Navegador no soportado')
        } catch (e) {
            console.log(e)
        }
        
    }

    const gotMessageFromServer = (fromId, message) => {
        
        //Parse the incoming signal
        const signal = JSON.parse(message)
        
        //Make sure it's not coming from yourself
        if(fromId !== socketId) {
            console.log(signal)
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
    
    onMount(() => {
        socket.emit('users:request', data.roomId)
        socket.on('join:incorrect', handleIncorrectJoin)
        socket.on('room:incorrect', handleIncorrectRoom)
        socket.on('users:response', handleResponse)
    })

    if(!incorretJoin) {
        getMyStream()
        .then(stream => {
            //localSource.srcObject = stream
            //localSource.play()
        })
        .then(()=>{
            socket.on('user:connected', handleUserConnected)
            socket.on('signal', gotMessageFromServer)
            socket.on('user:left', handleUserLeft)
            console.log('page ready')
            socket.emit('page:ready', data.roomId)
        })
    }
    
    onDestroy(()=>{
        unsubscribe()
        unsubscribeControls()
        socket.off('join:incorrect',handleIncorrectJoin)
        socket.off('room:incorrect', handleIncorrectRoom)
        socket.off('users:response', handleResponse)
        socket.off('signal', gotMessageFromServer)
        socket.off('user:connected', handleUserConnected)
        socket.off('user:left', handleUserLeft)
    })

    /*<button on:click={handleLeave}>Leave</button>
            
            */
</script>


<div class="Page">

    {#if incorretRoom}
        <IncorrectRoomCard />
    {:else if incorretJoin}
        <IncorrectJoinCard />
    {:else}
    
    <main>
        <button on:click={() => showRoomID = !showRoomID} class='show' id="share">
            {#if !showRoomID}
                <Share />
            {:else}
                <ShareFill />
            {/if}
        </button>

        <button on:click={() => showUsers = !showUsers} class='show' id="users">
            {#if !showUsers}
                <People />
            {:else}
                <PeopleFill />
            {/if}
        </button>

        {#if showUsers}
            <UsersConnected usersConnected={usersConnected} />    
        {/if}

        {#if showRoomID}
            <ShareRoom RoomID={data.roomId} />
        {/if}

        <StreamsZone 
            localStream = {localStream}
            remoteStreams = {remoteStreams}
        />

        <Controls showState={controlsToggler}/>

    </main>

    {/if}

</div>




<style>

    :global(body) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .Page {
        background: #0c0910;
        background: linear-gradient(37deg, rgba(27,11,45,1) 0%, rgba(57,10,56,1) 100%);
        max-width: 100svw;
        max-height: 100svh;
        width: 100svw;
        height: 100svh;
    }

    .show{
        z-index: 1;
        position: absolute;
        right: 0;
        border: none;
        border-radius: 0.3rem;
        background: #a61ba4;
        padding: 0.4rem 0.6rem;
        justify-content: center;
        align-items: center;
        color: #ece4ff;
    }

    .show:hover{
        background: #c44ac2;
        cursor: pointer;
    }
    
    #users{
        margin: 0.5rem 0.5rem 0; 
    }
    #share{
        margin: 0.5rem 3.5rem 0; 
    }


    main {
        display: inline;
        max-height: 100svh;
        max-width: 100svw;
        padding: 0 1rem;

    }

</style>