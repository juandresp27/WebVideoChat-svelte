<script>
    export let usersConnected
</script>

<section class="conn-users">
    <h4>Users connected</h4>
    <ul>
        {#each usersConnected as user}
            <li>
                <p>{user.User} ({user.Socket})</p>
            </li>
        {/each}
    </ul>
</section>


<style>
    .conn-users {
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

    .conn-users p{
        font-size: small;
    }
</style>