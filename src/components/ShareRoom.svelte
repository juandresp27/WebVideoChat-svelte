<script>
    export let RoomID
</script>


<div class='room-card'>
    <p>{RoomID}</p>
    <button on:click={()=>navigator.clipboard.writeText(RoomID)}>Copy</button>
</div>


<style>
    .room-card {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        color: whitesmoke;
        margin-top: 0.5rem;
    }

    .room-card p{
        font-size: 1rem;
        flex-grow: 1;
    }

    button{
        padding: 6px;
        border: none;
        border-radius: 0.3rem;
        background: #6c6b67;
        color: whitesmoke;
        justify-content: center;
        align-items: center;
        
    }
    button:hover{
        background: #ffffbc;
        cursor: pointer;
        color: black;
    }
</style>