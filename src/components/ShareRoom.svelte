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
        z-index: 1;
        position: absolute;
        background: rgb(27,11,45);
        width: 30%;
        color: white;
        border-radius: 0.5rem;
        padding: 0 1rem;
        right: 0;
        margin: 3rem 0.5rem 0 0;
    }

    .room-card p{
        font-size: small;
        flex-grow: 1;
    }

    button{
        width: 3rem;
        height: 1.5rem;
        border: none;
        border-radius: 0.3rem;
        background: #f6e4f6;
        justify-content: center;
        align-items: center;
        color: #4e328a;
    }
    button:hover{
        background: #c642c6;
        color: white;
        cursor: pointer;
    }
</style>