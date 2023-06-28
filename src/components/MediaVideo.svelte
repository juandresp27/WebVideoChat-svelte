<script>
	import { onMount } from "svelte"
    import Controls from '../components/Controls.svelte'

    export let streamData
    export let id
    
    let video_source
    
    onMount(()=>{
        video_source.srcObject = streamData;
        video_source.play()
    })
    
    
</script>

<div class="video-container">
    {#if streamData}
        <video bind:this={video_source} autoplay id={id}>
            <track kind="captions"/>
        </video>
    {/if}
</div>

<style>
    .video-container {
        margin: 0;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        background-color: black;
        position: relative;
        border-radius: 0.5rem;
        overflow: hidden;
        animation: show 0.4s ease;
    }

    video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    @keyframes show {
    0% {
        opacity: 0;
        transform: scale(0.4) translateY(20px);
    }

    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}
</style>