<script>
    export let localStream
    export let remoteStreams
    import MediaVideo from './MediaVideo.svelte'
    import { showControls } from '../stores'

    let timeout
    let screenHeight
    let screenWidth
    let dishSize = {
        width: 0,
        height: 0
    }
    let dishArea
    let usersQty

    $: usersQty = remoteStreams.length + 1

    let calculatedWidth
    let calculatedHeight

    const margin = 10
    const aspectRatio = 9/16

    function areaF(increment) {
        let i = 0;
        let w = 0;
        let h = increment * aspectRatio + (margin * 2);
        while (i < usersQty) {
            if ((w + increment) > dishSize.width) {
                w = 0;
                h = h + (increment * aspectRatio) + (margin * 2);
            }
            w = w + increment + (margin * 2);
            i++;
        }
        if (h > dishSize.height || increment > dishSize.width) return false;
        else return increment;
    }

    function resize(){
        let max = 0
        let i = 1
        while (i < 5000) {
            let area = areaF(i, dishSize);
            if (area === false) {
                max = i - 1;
                break;
            }
            i++;
        }
        // remove margins
        max = max - (margin* 2);
        return max
    }


    $: {
        dishSize = {
            width: Math.floor(screenWidth*0.98),
            height: Math.floor(screenHeight*0.87)
        }
        dishArea = dishSize.width * dishSize.height 

        calculatedWidth = resize()
        calculatedHeight = calculatedWidth * aspectRatio
    }

    const handleMouseMove = () =>{
        showControls.update(()=>true)
        clearTimeout(timeout)
        timeout = setTimeout(function(){showControls.update(()=>false)}, 4000);
    }

</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />

<section class="dish" on:mousemove={handleMouseMove} >
    {#if localStream !== undefined}
        <div class="webcam" style="width: {calculatedWidth}px; height: {calculatedHeight}px">
            <MediaVideo streamData={localStream} id={'me'}/>
        </div>
    {/if}
    {#each remoteStreams as remote}
        <div class="webcam" style="width: {calculatedWidth}px;">
            <MediaVideo streamData={remote.stream} id={remote.id}/>
        </div>
    {/each}
</section>

<style>
    .webcam {
        margin: 10px;
    }
    .dish{
        height: 87svh;
        width: 98svw;
        margin: 2rem auto 0 auto;

        display: flex;
        
        align-content: center;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        flex: 1;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.3);
    }
</style>