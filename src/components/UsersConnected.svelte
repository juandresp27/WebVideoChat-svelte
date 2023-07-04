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
        
        color: whitesmoke;
        width: 100%;
        padding: 0.01rem 1rem;
        
    }

    .conn-users p{
        font-size: small;
    }
</style>