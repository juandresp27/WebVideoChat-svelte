<script>
    import "@fontsource/roboto"
	import { onMount, onDestroy } from 'svelte';
    import {socketConnection, userName} from '../stores'
    import { goto } from '$app/navigation'
	import { io } from "socket.io-client";

    let socket
    let meUser

    let userInvalid = false
    
    let roomNoValid = null
    let roomT = ''
    let setUser = false

    socketConnection.update(()=>io())
    
    const unsubscribe = socketConnection.subscribe(value => {
        socket = value
    })

    const unsubscribeUser = userName.subscribe(value => {
        meUser = value
    })

    const handleRoomValid = (data)=>{
        goto(`/${data}`)
        roomT = ''
        console.log('is valid route')
    }

    const handelRoomNoValid = () => {
        roomNoValid = true
        console.log('No valid route')
    }

    onMount(()=>{
        socket.on('room:valid', handleRoomValid)
        socket.on('room:novalid', handelRoomNoValid)
    })



    onDestroy(()=>{
        unsubscribe()
        unsubscribeUser()
        socket.off('room:valid', handleRoomValid)
        socket.off('room:novalid', handelRoomNoValid)
    })


    const handleSubmit = () => {
        if (roomT.length>0){
            socket.emit('room:join', {roomT, meUser})
        }
    }

    const createRoom = () => {
        if(meUser.length >= 3){
            const tokenRoom = crypto.randomUUID()
            socket.emit('room:create', {tokenRoom, meUser})
            goto(`/${tokenRoom}`)
        }else{
            userInvalid = true
            console.log('Change username')
        }
    }

</script>

<svelte:head>
    <title>Video Conference</title>
</svelte:head>

<header>
    <h1>Video app<span>Conference</span></h1>
</header>

<main>
    <section class="username-sec">
        <label for="username">Username</label>
        <input value={meUser} type="text" name="username" id="username" style={userInvalid ? `border: 2px solid red;`: 'border: none;'} disabled={setUser} on:input={({target: t}) =>{userName.update(()=>t.value)}}>
        <button on:click={()=>{setUser = !setUser}}>Set</button>
    </section>
    
    <section class="create-sec">
        <button on:click={createRoom}>Crear sala</button>
    </section>
    
    <section>
        <h4>O</h4>
        <form on:submit|preventDefault={handleSubmit} class="unirse-sec">
            <label for="texto">Unirse a sala</label>
            <input value={roomT} type="text" name="texto" id="texto" on:input={({target: t}) =>{roomT = t.value}}>
            <button>Entrar</button>
        </form>
    </section>    
</main>

<style>
    :global(body) {
        font-family: 'Roboto', sans-serif;
        font-size: 0.95rem;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background: #212121;
    }
    main,header{
        color: whitesmoke;
    }
    header h1{
        text-align: center;
        text-transform: uppercase;
        font-size: 3rem;
        line-height: 3rem;
    }
    header h1 span{
        display: block;
        font-size: 2.37rem;
        line-height: 2rem;
    }

    main{
        width: max-content;
        height: fit-content;
        display: flex;
        flex-direction: column;
        margin: auto;
        gap: 2rem;
    }

    .username-sec{
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .username-sec button{
        width: 30%;
    }

    .create-sec button{
        width: 100%;
    }

    .unirse-sec{
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input{
        padding:  10px;
        border-radius: 10px;
        font-size: 1rem;
    }
    input:focus{
        border: none;
        outline: none;
        font-family: 'Roboto', sans-serif;
    }
    button{
        border-radius: 10px;
        border-style: none;
        padding: 0.5rem 1rem;
        background: #EBD18D;
        cursor: pointer;
        color: black;
    }
    button:hover{
        background: #f3ead2;
    }

    h4{
        justify-content: center;
        text-align: center;
    }
    
</style>
