<script>
    export let roomID
    export let usersConnected
    export let leaveFunc

    import People from '../assets/People.svelte'
    import PeopleFill from '../assets/PeopleFill.svelte'
    import Share from '../assets/Share.svelte'
    import ShareFill from '../assets/ShareFill.svelte'

    import UsersConnected from './UsersConnected.svelte'
    import ShareRoom from './ShareRoom.svelte'

    let toggleCard = 0
    let showUsers = false
    let showRoomID = false

    const ToggleCard = (choose) => {
        let choice = 0
        if(choose === 1){
            showRoomID ? choice = 0 : choice = 1
            showRoomID = !showRoomID
            showUsers = false
        } else if(choose === 2){
            showUsers? choice = 0: choice = 2
            showUsers = !showUsers
            showRoomID = false
        }
        return choice
    } 

</script>


<section class="accesibility">
    <section class="leave-control">
        <button on:click={leaveFunc}>Leave</button>
    </section>
    <button on:click={() => toggleCard = ToggleCard(1)} class='show'>
        {#if !showRoomID}
            <Share />
        {:else}
            <ShareFill />
        {/if}
    </button>
    
    <button on:click={() => toggleCard = ToggleCard(2)} class='show'>
        {#if !showUsers}
            <People />
        {:else}
            <PeopleFill />
        {/if}
    </button>
</section>

<section class="cards">
    {#if toggleCard === 2}
        <UsersConnected usersConnected={usersConnected} />    
    {/if}
    
    {#if toggleCard === 1}
        <ShareRoom RoomID={roomID} />
    {/if}
</section>


<style>

    .leave-control{
        flex-grow: 1;
        margin-left: 5px;
        align-items: center;
    }
    .leave-control button{
        height: 100%;
        background: #cc4b41;
        border: none;
        border-radius: 10px;
        padding: 0.5rem 1rem;
        color: white;
    }
    .cards{
        justify-content: center;
        margin: 0 1rem;
    }
    
    .accesibility{
        display: flex;
        gap: 1rem;
        justify-content: end;
        margin-right: 0.5rem;
    }

    .show{
        border: none;
        border-radius: 0.5rem;
        background: #EBD18D;
        color: #333;
        padding: 0.4rem 0.6rem;
        justify-content: center;
        align-items: center;
        
    }

    .show:hover{
        background: #f6e4b6;
        cursor: pointer;
    }
    
</style>