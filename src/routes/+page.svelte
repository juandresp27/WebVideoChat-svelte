<script>
	import { onMount, onDestroy } from 'svelte';
    import {socketConnection, userName} from '../stores'
    import { goto } from '$app/navigation'

    let socket
    let meUser
    
    let roomNoValid = null
    let roomT = ''
    let setUser = false

    const unsubscribe = socketConnection.subscribe(value => {
        socket = value
    })

    const unsubscribeUser = userName.subscribe(value => {
        meUser = value
    })

    const handleRoomValid = (data)=>{
        goto(`/${data}`)
        roomT = ''
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
            console.log('Change username')
        }
    }

</script>

<h1>Welcome to SvelteKit</h1>

<section>
    <label for="username">Username</label>
    <input value={meUser} type="text" name="username" id="username" disabled={setUser} on:input={({target: t}) =>{userName.update(()=>t.value)}}>
    <button on:click={()=>{setUser = !setUser}}>Set</button>
</section>

<section>
    <button on:click={createRoom}>Crear sala</button>
</section>

<h4>O</h4>

<form on:submit|preventDefault={handleSubmit}>
    <label for="texto">Unirse a sala</label>
    <input value={roomT} type="text" name="texto" id="texto" on:input={({target: t}) =>{roomT = t.value}}>
    <button>Entrar</button>
</form>

